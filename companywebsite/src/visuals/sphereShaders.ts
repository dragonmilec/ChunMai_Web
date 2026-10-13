// 球面 Worley 分布參數：size 越大細胞越小，contrast 越大明暗越分明。
// softness 使用 0–1 的直覺範圍；0 最銳利，1 最柔和。
export const WORLEY_SETTINGS = {
    size: 0.8,
    contrast: 2,
    softness: 0,
    // 0–2；越大，高密度粒子區域越寬、聚集效果越明顯。1 為原始覆蓋率。
    coverage: 1,
    // 0–1；把空白區粒子沿球面補進最近的高密度區域。
    redistribution: 0.82,
    // 每秒沿 Worley 空間移動的距離；負數會反向移動，0 會停止該軸。
    speedX: 0.04,
    speedY: 0.02,
    // 大於 1 會拉長該軸，小於 1 會壓縮該軸。
    stretchX: 10,
    stretchY: 1,
} as const

export const PARTICLE_SETTINGS = {
    // 1 為基準大小；例如 1.35 會把所有粒子放大 35%。
    pointSize: 1,
} as const

// Orbit ring appearance. RGB values use the WebGL 0–1 range.
export const ORBIT_SETTINGS = {
    color: [0.63, 0.72, 0.83] as const,
    opacity: 1,
} as const

const common = `
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uPress;
uniform vec4 uOrbits[10];
uniform float uOrbitDepth[10];
float hash(vec3 p) {
    p = fract(p * 0.1031 + vec3(0.11, 0.27, 0.53));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
}
float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
mat2 rotate(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}
vec2 touchDirection() {
    return length(uPointer) > 0.001 ? normalize(uPointer) : vec2(0.0, 1.0);
}
float fractureField(vec3 surface) {
    float broad = noise(surface * 4.2);
    float fine = noise(surface * 13.0 + 2.3);
    return broad * 0.74 + fine * 0.26;
}
float touchInfluence(vec3 normal) {
    return smoothstep(-0.18, 0.94, dot(normal, normalize(vec3(uPointer, 0.65))));
}
`

export const vertexShader = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`

// This pass draws neutral orbit lines only. No contour, fracture outline or
// full-screen colored halo: all prismatic light belongs to the broken particles.
export const fragmentShader = `
precision highp float;
${common}
uniform vec3 uOrbitColor;
uniform float uOrbitOpacity;
void main() {
    float shortSide = min(uResolution.x, uResolution.y);
    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / shortSide * 3.35;
    float pixel = 3.35 / shortSide;
   float sphereRadius = 0.6;
float disk = 1.0 - smoothstep(
    sphereRadius - 0.015,
    sphereRadius + 0.015,
    length(p)
);
    vec3 color = vec3(0.0);
    float alpha = 0.0;
    for (int i = 0; i < 5; i++) {
        vec4 orbit = uOrbits[i];
        vec2 r = vec2(orbit.x * p.x + orbit.y * p.y, -orbit.y * p.x + orbit.x * p.y);
        vec2 ellipse = vec2(r.x, r.y / orbit.z);
        float len = max(length(ellipse), 0.001);
        float gradient = max(length(vec2(ellipse.x, ellipse.y / orbit.z)) / len, 1.0);
        float distanceToLine = abs(len - orbit.w) / gradient;
        float line = 1.0 - smoothstep(pixel * 0.3, pixel * 1.3, distanceToLine);
        float phase = atan(ellipse.y, ellipse.x);
        float travelling = pow(0.5 + 0.5 * cos(phase - uTime * (0.38 + float(i) * 0.08) + float(i)), 18.0);
        float strength = (0.10 + travelling * 0.38) * (1.0 - step(r.y, 0.0) * disk * 0.7) * uOrbitOpacity;
        color += uOrbitColor * line * strength;
        alpha += line * strength;
    }
    alpha = clamp(alpha, 0.0, 1.0);
    gl_FragColor = vec4(min(color, vec3(alpha)), alpha);
}
`

export const particleVertexShader = `
precision highp float;
${common}
attribute vec3 aPosition;
attribute vec2 aSeed;
uniform float uPointScale;
uniform float uMaxPointSize;
uniform float uWorleySize;
uniform float uWorleyContrast;
uniform float uWorleySoftness;
uniform float uWorleyCoverage;
uniform float uWorleyRedistribution;
uniform vec2 uWorleySpeed;
uniform vec2 uWorleyStretch;
varying vec3 vColor;
varying float vAlpha;
varying float vGlow;
varying float vCoreRadius;

vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
}

// Seamless 3D Worley field evaluated from the sphere normal, so the pattern
// follows the globe instead of being projected as a flat texture.
vec2 worleyDistances(vec3 p, out vec3 nearestOffset) {
    vec3 cell = floor(p);
    vec3 local = fract(p);
    float nearest = 8.0;
    float secondNearest = 8.0;
    nearestOffset = vec3(0.0);

    for (int z = -1; z <= 1; z++) {
        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec3 offset = vec3(float(x), float(y), float(z));
                vec3 feature = hash33(cell + offset);
                vec3 delta = offset + feature - local;
                float distanceSquared = dot(delta, delta);
                if (distanceSquared < nearest) {
                    secondNearest = nearest;
                    nearest = distanceSquared;
                    nearestOffset = delta;
                } else {
                    secondNearest = min(secondNearest, distanceSquared);
                }
            }
        }
    }

    return sqrt(vec2(nearest, secondNearest));
}

float worleyDensity(vec3 surface, out vec3 clusterTangent) {
    vec2 safeStretch = max(vec2(0.05), uWorleyStretch);
    float frequency = max(0.05, uWorleySize) * 4.0;
    vec3 samplePosition = vec3(
        surface.x / safeStretch.x,
        surface.y / safeStretch.y,
        surface.z
    ) * frequency;
    samplePosition.xy += uTime * uWorleySpeed;
    vec3 nearestOffset;
    vec2 distances = worleyDistances(samplePosition, nearestOffset);
    vec3 surfaceOffset = vec3(
        nearestOffset.x * safeStretch.x,
        nearestOffset.y * safeStretch.y,
        nearestOffset.z
    ) / frequency;
    clusterTangent = surfaceOffset - surface * dot(surfaceOffset, surface);
    float tangentLength = length(clusterTangent);
    if (tangentLength > 0.001) {
        clusterTangent *= min(tangentLength, 0.34) / tangentLength;
    }
    float cellInterior = clamp((distances.y - distances.x) * 1.85, 0.0, 1.0);
    float contrasted = clamp(
        (cellInterior - 0.5) * max(0.01, uWorleyContrast) + 0.5,
        0.0,
        1.0
    );
    float softness = clamp(uWorleySoftness, 0.0, 1.0);
    float edgeWidth = mix(0.018, 0.24, softness * softness);
    float coverage = clamp(uWorleyCoverage, 0.0, 2.0);
    float threshold = mix(0.68, 0.34, coverage * 0.5);
    float mask = smoothstep(threshold - edgeWidth, threshold + edgeWidth, contrasted);
    return mix(0.035, 1.0, mask);
}

// Distance is measured to the real 3D circles, not their screen projections.
// A current and a delayed field form a bounded, reversible displacement. The
// tangential and normal waves carry dust around the ring instead of on a line.
vec3 magneticDisplacement(vec3 home, out float grip) {
    vec3 displacement = vec3(0.0);
    float weight = 0.0;
    float mobility = smoothstep(0.38, 0.95, aSeed.y);

    for (int i = 0; i < 10; i++) {
        vec4 orbit = uOrbits[i];
        float depth = uOrbitDepth[i];
        vec3 local = vec3(orbit.x * home.x + orbit.y * home.y,
                         -orbit.y * home.x + orbit.x * home.y, home.z);
        vec2 projected = vec2(local.x, local.y * orbit.z + local.z * depth);
        vec2 radial = projected / max(length(projected), 0.001);
        vec3 closestLocal = vec3(radial.x, radial.y * orbit.z, radial.y * depth) * orbit.w;
        vec3 closest = vec3(orbit.x * closestLocal.x - orbit.y * closestLocal.y,
                            orbit.y * closestLocal.x + orbit.x * closestLocal.y, closestLocal.z);
        vec3 delta = closest - home;
        float distanceToRing = length(delta);

        float orbitIndex = mod(float(i), 5.0);
        float cycle = sin(uTime * 0.8 + orbitIndex * 1.37) * 0.5 + 0.5;
        float attractionRange = mix(0.30, 1.25, cycle);
        float attraction = 1.0 - smoothstep(0.10, attractionRange, distanceToRing);
        // A steeper falloff keeps distant rings from pulling the whole shell.
        attraction *= attraction;
        float history = i < 5 ? 0.68 : 0.32;
        float w = attraction * history;

        vec3 tangentLocal = vec3(-radial.y, radial.x * orbit.z, radial.x * depth);
        vec3 tangent = vec3(orbit.x * tangentLocal.x - orbit.y * tangentLocal.y,
                            orbit.y * tangentLocal.x + orbit.x * tangentLocal.y, tangentLocal.z);
        vec3 planeNormal = vec3(orbit.y * depth, -orbit.x * depth, orbit.z);

        float force = pow(clamp(attraction, 0.0, 1.0), 1.35);
        float waveSpeed = mix(0.8, 3.5, force);
        float waveFrequency = mix(8.0, 20.0, force);
        float waveAmplitude = mix(0.08, 0.55, force);
        float phase = dot(home, vec3(6.0, 4.0, 5.0))
            - uTime * waveSpeed
            + orbitIndex * 1.7;
        float wave = sin(phase + distanceToRing * waveFrequency);
        float ripple = sin(
            phase * mix(1.3, 2.4, force)
            - uTime * mix(0.4, 1.3, force)
            + aSeed.x * 6.28318
        );

        displacement += w * mobility * (
            delta * (1.0 + wave * waveAmplitude)
            + tangent * (
                wave * mix(0.05, 0.22, force)
                + ripple * mix(0.02, 0.09, force)
            )
            + planeNormal * ripple * mix(0.02, 0.10, force)
            + home * sin(phase * 0.8 + aSeed.x * 4.0) * mix(0.01, 0.05, force)
        );

        weight += w;
    }

    grip = clamp(weight, 0.0, 1.0) * mobility;
    return displacement / max(1.0, weight);
}
void main() {
    vec3 surface = normalize(aPosition);

    vec3 clusterTangent;
    float density = worleyDensity(surface, clusterTangent);
    float redistribution = clamp(uWorleyRedistribution, 0.0, 1.0)
        * (1.0 - smoothstep(0.08, 0.72, density));
    surface = normalize(surface + clusterTangent * redistribution * 2.15);
    density = mix(density, 1.0, redistribution * 0.86);

    // 中央粒子球半徑
    float sphereRadius = 0.8;
    vec3 home = surface * sphereRadius;

    home.yz = rotate(-0.25) * home.yz;
    home.xz = rotate(-uTime * 0.10) * home.xz;

    float grip;
    vec3 position = home + magneticDisplacement(home, grip);  
    float field = fractureField(surface);
    float influence = touchInfluence(home);
    float cut = uPress * influence * 0.72;
    // Wide, seeded breakup: individual dust grains, never a shared hard edge.
    float scatter = (aSeed.x - 0.5) * 0.13;
    float intact = smoothstep(cut - 0.09, cut + 0.09, field + scatter);
    float detached = (1.0 - intact) * uPress;
    float breakup = (1.0 - smoothstep(0.035, 0.20, abs(field - cut))) * influence * uPress;
    breakup *= 0.45 + 0.55 * noise(surface * 12.0 + uTime * 0.09);
    vec2 direction = touchDirection();
    vec2 sideways = vec2(-direction.y, direction.x);
    float flowPhase = uTime * 0.72 + dot(surface, vec3(7.0, 4.0, 3.0));
    float wave = sin(flowPhase + aSeed.x * 3.0);
    vec2 destination = mix(direction * 1.28, uPointer, 0.75);
    position.xy += (destination - position.xy) * detached * (0.62 + wave * 0.15);
    position.xy += sideways * detached * (sin(flowPhase * 1.6 + aSeed.y * 5.0) * 0.12);
    position.z += detached * cos(flowPhase * 1.1) * 0.10;

    float front = smoothstep(-0.75, 0.8, home.z);
    float rim = pow(1.0 - abs(home.z), 2.0);
    float dust = clamp(grip * 2.5 + detached, 0.0, 1.0);
    vAlpha = (0.30 + front * 0.50 + rim * 0.28) * mix(0.50, 1.0, aSeed.y) * density;
    vAlpha *= mix(1.0, 0.80, dust) * mix(1.0, 0.35, detached);
    vColor = mix(vec3(0.40, 0.48, 0.62), vec3(0.91, 0.95, 1.0), front * 0.5 + rim * 0.5);

    // 單顆粒子不再分配 RGB；breakup 只決定它對密度與發光區域的貢獻。
    float flareSeed = smoothstep(0.90, 0.995, aSeed.y);
    vGlow = breakup * mix(0.45, 1.0, flareSeed);
   
    float pressScale = 0.6 + uPress * influence * 0.8;
    float coreSize =    (0.40 + aSeed.y * 0.8 + front * 1.15 + rim * 0.35)    * mix(1.0, 0.8, dust)    * uPointScale    * pressScale;
    
    // 粒子保持小尺寸；厚區塊由 density buffer 疊加形成。
    float spriteSize = min(uMaxPointSize, max(coreSize, coreSize * mix(1.0, 1.8, vGlow)));
    vCoreRadius = 0.5 * coreSize / max(spriteSize, 1.0);
    gl_PointSize = max(1.0, spriteSize);
    float shortSide = min(uResolution.x, uResolution.y);
    gl_Position = vec4(position.xy * (2.0 / 3.35) * shortSide / uResolution, 0.0, 1.0);
}
`

export const particleFragmentShader = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
varying float vGlow;
varying float vCoreRadius;

void main() {
    vec2 p = gl_PointCoord - 0.5;
    float radius = length(p);

    // 主畫面仍繪製清晰的小粒子，不把粒子本體模糊化。
    float core = (1.0 - smoothstep(vCoreRadius * 0.78, vCoreRadius, radius)) * vAlpha;
    if (core <= 0.002) discard;

    gl_FragColor = vec4(vColor * core, core);
}
`

// 離屏 density pass：只負責累積區域密度，不直接顯示。
export const densityParticleFragmentShader = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
varying float vGlow;
varying float vCoreRadius;

void main() {
    vec2 p = gl_PointCoord - 0.5;
    float radius = length(p);

    // 用比可見粒子稍寬的 footprint 累積密度，但不影響主畫面清晰度。
    float core = 1.0 - smoothstep(0.18, 0.32, radius);
    float density = core * (vAlpha * 0.34 + vGlow * 0.18);

    if (density <= 0.002) discard;
    gl_FragColor = vec4(vec3(density), density);
}
`

export const densityCompositeFragmentShader = `
precision mediump float;

uniform sampler2D uDensity;
uniform vec2 uResolution;

float densityAt(vec2 uv) {
    return texture2D(uDensity, uv).r;
}

// 不看單一 pixel，而是累積附近一小塊區域的粒子密度。
float regionDensity(vec2 uv) {
    vec2 px = 1.0 / uResolution;

    float d = 0.0;

    d += densityAt(uv) * 1.00;

    d += densityAt(uv + vec2( 2.0,  0.0) * px) * 0.85;
    d += densityAt(uv + vec2(-2.0,  0.0) * px) * 0.85;
    d += densityAt(uv + vec2( 0.0,  2.0) * px) * 0.85;
    d += densityAt(uv + vec2( 0.0, -2.0) * px) * 0.85;

    d += densityAt(uv + vec2( 4.0,  0.0) * px) * 0.60;
    d += densityAt(uv + vec2(-4.0,  0.0) * px) * 0.60;
    d += densityAt(uv + vec2( 0.0,  4.0) * px) * 0.60;
    d += densityAt(uv + vec2( 0.0, -4.0) * px) * 0.60;

    d += densityAt(uv + vec2( 3.0,  3.0) * px) * 0.45;
    d += densityAt(uv + vec2(-3.0,  3.0) * px) * 0.45;
    d += densityAt(uv + vec2( 3.0, -3.0) * px) * 0.45;
    d += densityAt(uv + vec2(-3.0, -3.0) * px) * 0.45;

    return d;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    // 三層 X 軸疊影距離。
    float offsetPx = 6.0;
    vec2 dx = vec2(offsetPx / uResolution.x, 0.0);

    // RGB 三層看的是「區域密度」，不是單一粒子。
    float dL = regionDensity(uv - dx);
    float dC = regionDensity(uv);
    float dR = regionDensity(uv + dx);

    // 厚區塊門檻。
    // 這版刻意壓低門檻，先確保效果肉眼可見。
float mL = smoothstep(0.60, 1.05, dL);
float mC = smoothstep(0.60, 1.05, dC);
float mR = smoothstep(0.60, 1.05, dR);

float gL = smoothstep(0.4, 0.60, dL);
float gC = smoothstep(0.4, 0.60, dC);
float gR = smoothstep(0.4, 0.60, dR);
// 三層是整個密集區塊的 RGB 錯位，不是單顆粒子分色。
    vec3 redLayer   = vec3(1.00, 0.02, 0.06) * mL;
    vec3 greenLayer = vec3(0.02, 1.00, 0.08) * mC;
    vec3 blueLayer  = vec3(0.04, 0.12, 1.00) * mR;

    vec3 color =
        redLayer * 0.90 +
        greenLayer * 0.95 +
        blueLayer * 0.90;

    // 整塊區域一起發光。
    color += vec3(1.00, 0.05, 0.08) * gL * 0.24;
    color += vec3(0.05, 1.00, 0.10) * gC * 0.22;
    color += vec3(0.08, 0.16, 1.00) * gR * 0.24;

    float alpha = clamp(
        max(max(mL, mC), mR) * 0.88 +
        max(max(gL, gC), gR) * 0.32,
        0.0,
        0.95
    );

    if (alpha <= 0.005) discard;

    // premultiplied alpha，配合 ONE / ONE_MINUS_SRC_ALPHA。
    gl_FragColor = vec4(color * alpha, alpha);
}
`
