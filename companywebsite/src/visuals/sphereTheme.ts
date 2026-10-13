// Preserve the original motion, density and offset layers, with a muted palette
// for the light theme. The original RGB shader remains in sphereShaders.ts.
import { particleVertexShader as originalParticleVertexShader, densityCompositeFragmentShader as originalDensityCompositeFragmentShader, ORBIT_SETTINGS as originalOrbitSettings } from './sphereShaders'
export { PARTICLE_SETTINGS, WORLEY_SETTINGS, vertexShader, fragmentShader, particleFragmentShader, densityParticleFragmentShader } from './sphereShaders'

// Linear RGB values, from deepest slate to the softest highlight.
export const SPHERE_PALETTE = {
  shadow: [0.25, 0.34, 0.40],
  highlight: [0.54, 0.66, 0.70],
  slate: [0.36, 0.45, 0.53],
  teal: [0.43, 0.59, 0.60],
  steel: [0.53, 0.63, 0.72],
  glow: [0.68, 0.76, 0.79],
} as const
const rgb = (color: readonly number[]) => `vec3(${color.map(value => value.toFixed(3)).join(', ')})`

export const ORBIT_SETTINGS = { ...originalOrbitSettings, color: [0.28, 0.47, 0.59] as const }
export const particleVertexShader = originalParticleVertexShader.replace(
  'mix(vec3(0.40, 0.48, 0.62), vec3(0.91, 0.95, 1.0), front * 0.5 + rim * 0.5)',
  `mix(${rgb(SPHERE_PALETTE.shadow)}, ${rgb(SPHERE_PALETTE.highlight)}, front * 0.5 + rim * 0.5)`,
)

export const densityCompositeFragmentShader = originalDensityCompositeFragmentShader.replace(
  /    vec3 redLayer[\s\S]*?(?=    float alpha)/,
  `    // Keep the three offset density layers, but blend within one soft palette.
    // Normalizing the weights prevents overlapping layers from clipping to white.
    float layerWeight = mL * 0.90 + mC * 0.95 + mR * 0.90;
    vec3 color = (
        ${rgb(SPHERE_PALETTE.slate)} * mL * 0.90 +
        ${rgb(SPHERE_PALETTE.teal)} * mC * 0.95 +
        ${rgb(SPHERE_PALETTE.steel)} * mR * 0.90
    ) / max(layerWeight, 0.001);
    float glow = max(max(gL, gC), gR);
    color = mix(color, ${rgb(SPHERE_PALETTE.glow)}, glow * 0.12);

`,
)
