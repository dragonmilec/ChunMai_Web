import { useEffect, useRef, useState } from 'react'
import {
    ORBIT_SETTINGS,
    PARTICLE_SETTINGS,
    WORLEY_SETTINGS,
    densityCompositeFragmentShader,
    densityParticleFragmentShader,
    fragmentShader,
    vertexShader,
    particleVertexShader,
    particleFragmentShader,
} from './sphereShaders'
import { ORBIT_COUNT, updateSphereOrbits } from './sphereOrbits'
import './InteractiveSphere.css'

export default function InteractiveSphere() {
    const hostRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [contextVersion, setContextVersion] = useState(0)

    useEffect(() => {
        const host = hostRef.current
        const canvas = canvasRef.current
        const hero = host?.closest('section')
        if (!host || !canvas || !hero) return
        const visual = host.parentElement
        const flow = host.closest<HTMLElement>('.home-sphere-flow')
        const contentTwo = flow?.querySelector<HTMLElement>('[data-sphere-content="2"]')
        const interactionRoot = flow ?? hero
        const orbitCss = ORBIT_SETTINGS.color.map(channel => Math.round(channel * 255)).join(', ')
        host.style.setProperty('--sphere-orbit-color', `rgba(${orbitCss}, ${ORBIT_SETTINGS.opacity})`)

        // 依使用者偏好、裝置尺寸與硬體能力決定動畫與渲染負載。
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
        const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)')
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
        const lowPower = (navigator.hardwareConcurrency || 8) <= 4 || (memory !== undefined && memory <= 4)
        const gl = canvas.getContext('webgl', {
            alpha: true, antialias: false, depth: false, stencil: false,
            premultipliedAlpha: true, powerPreference: 'low-power',
        })
        if (!gl) return // CSS sphere remains visible on devices without WebGL.
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number

        const shaders: WebGLShader[] = []
        let program: WebGLProgram | null = null
        let particleProgram: WebGLProgram | null = null
        let densityParticleProgram: WebGLProgram | null = null
        let densityCompositeProgram: WebGLProgram | null = null
        let buffer: WebGLBuffer | null = null
        let particleBuffer: WebGLBuffer | null = null
        let densityTexture: WebGLTexture | null = null
        let densityFramebuffer: WebGLFramebuffer | null = null
        // 粒子容量在初始化時固定；實際繪製數量仍會依畫質動態調整。
        const capacity = lowPower ? 26_000 : 186_000
        let resourcesInvalid = false

        // 集中釋放本次 WebGL context 建立的 GPU 資源。
        const disposeGpu = () => {
            // Restored contexts cannot delete handles from the previous context.
            if (resourcesInvalid) return
            if (buffer) gl.deleteBuffer(buffer)
            if (particleBuffer) gl.deleteBuffer(particleBuffer)
            if (densityFramebuffer) gl.deleteFramebuffer(densityFramebuffer)
            if (densityTexture) gl.deleteTexture(densityTexture)
            if (program) gl.deleteProgram(program)
            if (particleProgram) gl.deleteProgram(particleProgram)
            if (densityParticleProgram) gl.deleteProgram(densityParticleProgram)
            if (densityCompositeProgram) gl.deleteProgram(densityCompositeProgram)
            shaders.forEach(shader => gl.deleteShader(shader))
        }
        try {
            // 編譯 shader，失敗時交由外層 fallback 至 CSS 球體。
            const compile = (type: number, source: string) => {
                const shader = gl.createShader(type)
                if (!shader) throw new Error('Unable to allocate sphere shader')
                shaders.push(shader)
                gl.shaderSource(shader, source)
                gl.compileShader(shader)
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    throw new Error(gl.getShaderInfoLog(shader) || 'Sphere shader compilation failed')
                }
                return shader
            }
            // Fragment highp is optional in WebGL 1 (older mobile GPUs).
            const precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
            const fragment = precision?.precision ? fragmentShader : fragmentShader.replace('precision highp', 'precision mediump')
            program = gl.createProgram()
            if (!program) throw new Error('Unable to allocate sphere program')
            gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader))
            gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment))
            gl.bindAttribLocation(program, 0, 'aPosition')
            gl.linkProgram(program)
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(program) || 'Sphere shader linking failed')
            }
            buffer = gl.createBuffer()
            if (!buffer) throw new Error('Unable to allocate sphere buffer')
            gl.useProgram(program)
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
            const position = gl.getAttribLocation(program, 'aPosition')
            gl.enableVertexAttribArray(position)
            gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

            // 球體表面與粒子分別使用獨立的 WebGL program。
            particleProgram = gl.createProgram()
            if (!particleProgram) throw new Error('Unable to allocate particle program')
            gl.attachShader(particleProgram, compile(gl.VERTEX_SHADER, particleVertexShader))
            gl.attachShader(particleProgram, compile(gl.FRAGMENT_SHADER, particleFragmentShader))
            gl.bindAttribLocation(particleProgram, 0, 'aPosition')
            gl.bindAttribLocation(particleProgram, 1, 'aSeed')
            gl.linkProgram(particleProgram)
            if (!gl.getProgramParameter(particleProgram, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(particleProgram) || 'Particle shader linking failed')
            }

            // Density 使用相同 vertex shader，只有 fragment shader 不同。
            densityParticleProgram = gl.createProgram()
            if (!densityParticleProgram) throw new Error('Unable to allocate density particle program')
            gl.attachShader(densityParticleProgram, compile(gl.VERTEX_SHADER, particleVertexShader))
            gl.attachShader(densityParticleProgram, compile(gl.FRAGMENT_SHADER, densityParticleFragmentShader))
            gl.bindAttribLocation(densityParticleProgram, 0, 'aPosition')
            gl.bindAttribLocation(densityParticleProgram, 1, 'aSeed')
            gl.linkProgram(densityParticleProgram)
            if (!gl.getProgramParameter(densityParticleProgram, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(densityParticleProgram) || 'Density particle shader linking failed')
            }

            densityCompositeProgram = gl.createProgram()
            if (!densityCompositeProgram) throw new Error('Unable to allocate density composite program')
            gl.attachShader(densityCompositeProgram, compile(gl.VERTEX_SHADER, vertexShader))
            gl.attachShader(densityCompositeProgram, compile(gl.FRAGMENT_SHADER, densityCompositeFragmentShader))
            gl.bindAttribLocation(densityCompositeProgram, 0, 'aPosition')
            gl.linkProgram(densityCompositeProgram)
            if (!gl.getProgramParameter(densityCompositeProgram, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(densityCompositeProgram) || 'Density composite shader linking failed')
            }

            particleBuffer = gl.createBuffer()
            if (!particleBuffer) throw new Error('Unable to allocate particle buffer')
            // 只有一個單位半徑的表面，沒有內部粒子或第二層殼。
            const particles = new Float32Array(capacity * 5)

            // 固定 seed，讓每次初始化產生一致的粒子分布。
            let seed = 3721
            const random = () => {
                seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
                return seed / 4294967296
            }
            for (let i = 0; i < capacity; i++) {
                const z = random() * 2 - 1
                const angle = random() * Math.PI * 2
                const ring = Math.sqrt(1 - z * z)
                const offset = i * 5
                particles[offset] = Math.cos(angle) * ring
                particles[offset + 1] = Math.sin(angle) * ring
                particles[offset + 2] = z
                particles[offset + 3] = random()
                particles[offset + 4] = random()
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer)
            gl.bufferData(gl.ARRAY_BUFFER, particles, gl.STATIC_DRAW)
        } catch (error) {
            console.warn('Interactive sphere unavailable; using CSS fallback.', error)
            disposeGpu()
            return
        }

        const resolution = gl.getUniformLocation(program, 'uResolution')
        const time = gl.getUniformLocation(program, 'uTime')
        const pointer = gl.getUniformLocation(program, 'uPointer')
        const press = gl.getUniformLocation(program, 'uPress')
        const particleResolution = gl.getUniformLocation(particleProgram, 'uResolution')
        const particleTime = gl.getUniformLocation(particleProgram, 'uTime')
        const particlePointer = gl.getUniformLocation(particleProgram, 'uPointer')
        const particlePress = gl.getUniformLocation(particleProgram, 'uPress')
        const particleSize = gl.getUniformLocation(particleProgram, 'uPointScale')
        const particleMaxSize = gl.getUniformLocation(particleProgram, 'uMaxPointSize')
        const particleWorleySize = gl.getUniformLocation(particleProgram, 'uWorleySize')
        const particleWorleyContrast = gl.getUniformLocation(particleProgram, 'uWorleyContrast')
        const particleWorleySoftness = gl.getUniformLocation(particleProgram, 'uWorleySoftness')
        const particleWorleyCoverage = gl.getUniformLocation(particleProgram, 'uWorleyCoverage')
        const particleWorleyRedistribution = gl.getUniformLocation(particleProgram, 'uWorleyRedistribution')
        const particleWorleySpeed = gl.getUniformLocation(particleProgram, 'uWorleySpeed')
        const particleWorleyStretch = gl.getUniformLocation(particleProgram, 'uWorleyStretch')
        const maxPointSize = (gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array | null)?.[1] ?? 1
        const orbitUniform = gl.getUniformLocation(program, 'uOrbits[0]')
        const orbitColor = gl.getUniformLocation(program, 'uOrbitColor')
        const orbitOpacity = gl.getUniformLocation(program, 'uOrbitOpacity')
        const particleOrbitUniform = gl.getUniformLocation(particleProgram, 'uOrbits[0]')
        const particleOrbitDepth = gl.getUniformLocation(particleProgram, 'uOrbitDepth[0]')

        const densityParticleResolution = gl.getUniformLocation(densityParticleProgram, 'uResolution')
        const densityParticleTime = gl.getUniformLocation(densityParticleProgram, 'uTime')
        const densityParticlePointer = gl.getUniformLocation(densityParticleProgram, 'uPointer')
        const densityParticlePress = gl.getUniformLocation(densityParticleProgram, 'uPress')
        const densityParticleSize = gl.getUniformLocation(densityParticleProgram, 'uPointScale')
        const densityParticleMaxSize = gl.getUniformLocation(densityParticleProgram, 'uMaxPointSize')
        const densityParticleWorleySize = gl.getUniformLocation(densityParticleProgram, 'uWorleySize')
        const densityParticleWorleyContrast = gl.getUniformLocation(densityParticleProgram, 'uWorleyContrast')
        const densityParticleWorleySoftness = gl.getUniformLocation(densityParticleProgram, 'uWorleySoftness')
        const densityParticleWorleyCoverage = gl.getUniformLocation(densityParticleProgram, 'uWorleyCoverage')
        const densityParticleWorleyRedistribution = gl.getUniformLocation(densityParticleProgram, 'uWorleyRedistribution')
        const densityParticleWorleySpeed = gl.getUniformLocation(densityParticleProgram, 'uWorleySpeed')
        const densityParticleWorleyStretch = gl.getUniformLocation(densityParticleProgram, 'uWorleyStretch')
        const densityParticleOrbitUniform = gl.getUniformLocation(densityParticleProgram, 'uOrbits[0]')
        const densityParticleOrbitDepth = gl.getUniformLocation(densityParticleProgram, 'uOrbitDepth[0]')

        const densityResolution = gl.getUniformLocation(densityCompositeProgram, 'uResolution')
        const densitySampler = gl.getUniformLocation(densityCompositeProgram, 'uDensity')
        const orbitFrames = new Float32Array(ORBIT_COUNT * 2 * 4)
        const currentOrbits = orbitFrames.subarray(0, ORBIT_COUNT * 4)
        const orbitDepths = new Float32Array(ORBIT_COUNT * 2)
        let frame = 0
        let scrollFrame = 0
        let visible = false
        let lost = false
        let lastDraw = 0
        let lastFrame = 0
        let elapsed = 0
        let quality = 1
        let slowTime = 0
        let fps = compact.matches || lowPower ? 30 : 60
        let pointerId: number | null = null
        let mouseActive = false
        let interactionStrength = 0
        let amount = 0
        let targetX = 0
        let targetY = 0.5
        let currentX = targetX
        let currentY = targetY
        let width = 1
        let height = 1
        let pointScale = 1
        let sphereTransitionScale = 1
        let pointCount = capacity

        // 僅在元件可見、頁面位於前景且 WebGL context 有效時繪製。
        const canRender = () => visible && !document.hidden && !lost
        const requestFrame = () => {
            if (!frame && canRender()) frame = requestAnimationFrame(draw)
        }
        const resizeDensityTarget = () => {
            if (densityFramebuffer) gl.deleteFramebuffer(densityFramebuffer)
            if (densityTexture) gl.deleteTexture(densityTexture)
            densityTexture = gl.createTexture()
            densityFramebuffer = gl.createFramebuffer()
            if (!densityTexture || !densityFramebuffer) throw new Error('Unable to allocate density render target')

            gl.bindTexture(gl.TEXTURE_2D, densityTexture)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

            gl.bindFramebuffer(gl.FRAMEBUFFER, densityFramebuffer)
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, densityTexture, 0)
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
                throw new Error('Density framebuffer is incomplete')
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
            gl.bindTexture(gl.TEXTURE_2D, null)
        }

        // 限制 canvas 像素預算與 DPR，以控制渲染負載。
        const resize = () => {
            const bounds = host.getBoundingClientRect()
            width = Math.max(1, bounds.width)
            height = Math.max(1, bounds.height)
            // Large CSS spheres need enough backing pixels to keep individual
            // particles crisp instead of upscaling a one-megapixel canvas.
            const compactRenderer = compact.matches || lowPower
            const baseBudget = compactRenderer ? 360_000 : 2_000_000
            // The CSS surface grows with --sphere-content-2-size. Grow its
            // backing-pixel budget by the same area ratio so the browser does
            // not upscale a fixed-resolution canvas and enlarge every dot.
            const maximumBudget = compactRenderer ? 900_000 : 6_000_000
            const budget = Math.min(
                maximumBudget,
                baseBudget * sphereTransitionScale * sphereTransitionScale,
            )
            const dpr = Math.min(window.devicePixelRatio || 1, compactRenderer ? 1.25 : 1.5)
            const safeTextureScale = Math.min(maxTextureSize / width, maxTextureSize / height)
            const scale = Math.min(dpr, Math.sqrt(budget / (width * height)), safeTextureScale) * quality
            const nextWidth = Math.max(1, Math.round(width * scale))
            const nextHeight = Math.max(1, Math.round(height * scale))
            const widthChange = Math.abs(nextWidth - canvas.width) / Math.max(1, canvas.width)
            const heightChange = Math.abs(nextHeight - canvas.height) / Math.max(1, canvas.height)
            // Resizing a canvas reallocates the framebuffer. Quantizing these
            // allocations prevents mobile scrolling from rebuilding it each frame.
            if (!densityFramebuffer || widthChange > 0.12 || heightChange > 0.12) {
                canvas.width = nextWidth
                canvas.height = nextHeight
                gl.viewport(0, 0, canvas.width, canvas.height)
                resizeDensityTarget()
            }
            const baseCount = Math.min(capacity, compact.matches ? 36_000 : capacity)
            pointCount = Math.max(8_000, Math.floor(baseCount * quality))
            const backingScale = Math.min(canvas.width / width, canvas.height / height)
            pointScale = backingScale * 1.1 * PARTICLE_SETTINGS.pointSize / Math.sqrt(quality)
            requestFrame()
        }

        const cssNumber = (styles: CSSStyleDeclaration, name: string, fallback: number) => {
            const value = Number.parseFloat(styles.getPropertyValue(name))
            return Number.isFinite(value) ? value : fallback
        }
        const updateScrollTransition = () => {
            scrollFrame = 0
            if (!visual || !contentTwo) return

            const contentBounds = contentTwo.getBoundingClientRect()
            const start = window.innerHeight * 0.80
            const end = window.innerHeight * 0.22
            const progress = Math.min(1, Math.max(0, (start - contentBounds.top) / Math.max(1, start - end)))
            const eased = motion.matches ? (progress >= 0.5 ? 1 : 0) : progress * progress * (3 - 2 * progress)
            const styles = getComputedStyle(visual)
            const startX = cssNumber(styles, '--sphere-x', 50)
            const startY = cssNumber(styles, '--sphere-y', 50)
            const startSize = cssNumber(styles, '--sphere-size', 155)
            const endX = cssNumber(styles, '--sphere-content-2-x', startX)
            const endY = cssNumber(styles, '--sphere-content-2-y', startY)
            const endSize = cssNumber(styles, '--sphere-content-2-size', startSize)
            const interpolate = (from: number, to: number) => from + (to - from) * eased
            const currentSize = interpolate(startSize, endSize)

            host.style.left = `${interpolate(startX, endX)}%`
            host.style.top = `${interpolate(startY, endY)}%`
            host.style.width = `${currentSize}%`
            sphereTransitionScale = Math.max(0.25, currentSize / Math.max(1, startSize))
            host.dataset.scrollProgress = progress.toFixed(3)
            flow?.style.setProperty('--sphere-scroll-progress', eased.toFixed(3))
            requestFrame()
        }
        const queueScrollTransition = () => {
            if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollTransition)
        }

        // 主渲染迴圈：處理效能降級、互動平滑與兩個 WebGL pass。
        const draw = (now: number) => {
            frame = 0
            if (!canRender()) return
            const gap = lastFrame ? now - lastFrame : 16.7
            lastFrame = now
            // 持續的低 FPS 會降低畫質，直到降到桌面 FPS 上限。
            slowTime = gap > 27 && gap < 200 ? slowTime + gap : Math.max(0, slowTime - gap * 0.4)
            if (slowTime > 1800 && !motion.matches) {
                if (quality > 0.6) {
                    quality = Math.max(0.6, quality * 0.8)
                    resize()
                } else {
                    fps = 30
                }
                slowTime = 0
            }
            const interval = 1000 / fps
            if (!motion.matches && lastDraw && now - lastDraw < interval - 1) {
                requestFrame()
                return
            }
            const delta = lastDraw ? Math.min((now - lastDraw) / 1000, 0.08) : 1 / fps
            lastDraw = now
            // 使用時間相關插值，避免不同 FPS 下互動速度差異過大。
            const blend = motion.matches ? 1 : 1 - Math.exp(-delta * 8)
            const desiredAmount = pointerId !== null ? 1 : mouseActive ? interactionStrength : 0
            amount += (desiredAmount - amount) * blend
            if (amount < 0.001) amount = 0
            currentX += (targetX - currentX) * blend
            currentY += (targetY - currentY) * blend
            if (!motion.matches) elapsed += delta
            updateSphereOrbits(motion.matches ? 0 : elapsed, orbitFrames, orbitDepths)
            const renderedPointScale = pointScale
            // 第一個 pass：繪製球體表面。
            gl.disable(gl.BLEND)
            gl.useProgram(program)
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.disableVertexAttribArray(1)
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
            gl.uniform2f(resolution, canvas.width, canvas.height)
            gl.uniform2f(pointer, currentX, currentY)
            gl.uniform1f(time, motion.matches ? 0 : elapsed)
            gl.uniform1f(press, amount)
            gl.uniform4fv(orbitUniform, currentOrbits)
            gl.uniform3f(orbitColor, ORBIT_SETTINGS.color[0], ORBIT_SETTINGS.color[1], ORBIT_SETTINGS.color[2])
            gl.uniform1f(orbitOpacity, ORBIT_SETTINGS.opacity)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
            // 第二個 pass：只把粒子密度累積到離屏 texture。
            gl.bindFramebuffer(gl.FRAMEBUFFER, densityFramebuffer)
            gl.viewport(0, 0, canvas.width, canvas.height)
            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            gl.enable(gl.BLEND)
            gl.blendFunc(gl.ONE, gl.ONE)

            gl.useProgram(densityParticleProgram)
            gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer)
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0)
            gl.enableVertexAttribArray(1)
            gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12)
            gl.uniform2f(densityParticleResolution, canvas.width, canvas.height)
            gl.uniform2f(densityParticlePointer, currentX, currentY)
            gl.uniform1f(densityParticleTime, motion.matches ? 0 : elapsed)
            gl.uniform1f(densityParticlePress, amount)
            gl.uniform1f(densityParticleSize, renderedPointScale)
            gl.uniform1f(densityParticleMaxSize, maxPointSize)
            gl.uniform1f(densityParticleWorleySize, WORLEY_SETTINGS.size)
            gl.uniform1f(densityParticleWorleyContrast, WORLEY_SETTINGS.contrast)
            gl.uniform1f(densityParticleWorleySoftness, WORLEY_SETTINGS.softness)
            gl.uniform1f(densityParticleWorleyCoverage, WORLEY_SETTINGS.coverage)
            gl.uniform1f(densityParticleWorleyRedistribution, WORLEY_SETTINGS.redistribution)
            gl.uniform2f(densityParticleWorleySpeed, WORLEY_SETTINGS.speedX, WORLEY_SETTINGS.speedY)
            gl.uniform2f(densityParticleWorleyStretch, WORLEY_SETTINGS.stretchX, WORLEY_SETTINGS.stretchY)
            gl.uniform4fv(densityParticleOrbitUniform, orbitFrames)
            gl.uniform1fv(densityParticleOrbitDepth, orbitDepths)
            gl.drawArrays(gl.POINTS, 0, pointCount)

            // 第三個 pass：主畫面仍畫原本清晰粒子。
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
            gl.viewport(0, 0, canvas.width, canvas.height)
            gl.enable(gl.BLEND)
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

            gl.useProgram(particleProgram)
            gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer)
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0)
            gl.enableVertexAttribArray(1)
            gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12)
            gl.uniform2f(particleResolution, canvas.width, canvas.height)
            gl.uniform2f(particlePointer, currentX, currentY)
            gl.uniform1f(particleTime, motion.matches ? 0 : elapsed)
            gl.uniform1f(particlePress, amount)
            gl.uniform1f(particleSize, renderedPointScale)
            gl.uniform1f(particleMaxSize, maxPointSize)
            gl.uniform1f(particleWorleySize, WORLEY_SETTINGS.size)
            gl.uniform1f(particleWorleyContrast, WORLEY_SETTINGS.contrast)
            gl.uniform1f(particleWorleySoftness, WORLEY_SETTINGS.softness)
            gl.uniform1f(particleWorleyCoverage, WORLEY_SETTINGS.coverage)
            gl.uniform1f(particleWorleyRedistribution, WORLEY_SETTINGS.redistribution)
            gl.uniform2f(particleWorleySpeed, WORLEY_SETTINGS.speedX, WORLEY_SETTINGS.speedY)
            gl.uniform2f(particleWorleyStretch, WORLEY_SETTINGS.stretchX, WORLEY_SETTINGS.stretchY)
            gl.uniform4fv(particleOrbitUniform, orbitFrames)
            gl.uniform1fv(particleOrbitDepth, orbitDepths)
            gl.drawArrays(gl.POINTS, 0, pointCount)

            // 第四個 pass：只在密集區疊上 RGB 三層 X 錯位厚 mask。
            gl.useProgram(densityCompositeProgram)
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.disableVertexAttribArray(1)
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
            gl.activeTexture(gl.TEXTURE0)
            gl.bindTexture(gl.TEXTURE_2D, densityTexture)
            gl.uniform1i(densitySampler, 0)
            gl.uniform2f(densityResolution, canvas.width, canvas.height)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
            host.dataset.renderer = 'webgl'
            if (!motion.matches) requestFrame()
        }

        // 將指標位置轉為以球體中心為原點的互動座標。
        const updatePointer = (event: PointerEvent) => {
            const bounds = host.getBoundingClientRect()
            const scale = 3.35 / Math.max(1, Math.min(bounds.width, bounds.height))
            targetX = (event.clientX - bounds.left - bounds.width * 0.5) * scale
            targetY = (bounds.top + bounds.height * 0.5 - event.clientY) * scale
            // 在不改變方向的情況下，限制過遠的按壓。
            const distance = Math.hypot(targetX, targetY)
            if (event.pointerType === 'mouse') {
                // The sphere has a radius of one in shader coordinates. Fade the
                // pull smoothly once the cursor moves beyond its surface.
                const falloff = Math.min(1, Math.max(0, (distance - 1) / 1.45))
                interactionStrength = 1 - falloff * falloff * (3 - 2 * falloff)
            }
            if (distance > 2.6) {
                targetX *= 2.6 / distance
                targetY *= 2.6 / distance
            }
            requestFrame()
        }

        // 只接收主要滑鼠/觸控指標，並避開頁面上的可操作控制項。
        const down = (event: PointerEvent) => {
            if (!event.isPrimary || event.button !== 0 || pointerId !== null) return
            if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]')) return
            if (event.pointerType === 'mouse') {
                mouseActive = true
                updatePointer(event)
                return
            }
            pointerId = event.pointerId
            updatePointer(event)
        }
        const drag = (event: PointerEvent) => {
            if (event.pointerId === pointerId) updatePointer(event)
        }
        const hover = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') return
            mouseActive = true
            updatePointer(event)
        }
        const leave = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') return
            mouseActive = false
            interactionStrength = 0
            requestFrame()
        }
        const release = () => {
            pointerId = null
            mouseActive = false
            interactionStrength = 0
            requestFrame()
        }
        const up = (event: PointerEvent) => {
            if (event.pointerId === pointerId) release()
        }

        // 暫停渲染並重設互動狀態；不釋放 GPU 資源。
        const stop = () => {
            cancelAnimationFrame(frame)
            cancelAnimationFrame(scrollFrame)
            frame = 0
            scrollFrame = 0
            lastDraw = 0
            lastFrame = 0
            slowTime = 0
            pointerId = null
            mouseActive = false
            interactionStrength = 0
            amount = 0
        }
        const visibilityChange = () => {
            if (document.hidden) stop()
            else requestFrame()
        }
        const preferencesChange = () => {
            stop()
            fps = compact.matches || lowPower ? 30 : 60
            resize()
        }

        // Context lost 後舊資源 handle 不再可信，等待 restored 時重新初始化。
        const contextLost = (event: Event) => {
            event.preventDefault()
            resourcesInvalid = true
            lost = true
            stop()
            delete host.dataset.renderer
        }
        const contextRestored = () => setContextVersion(value => value + 1)

        // 離開可視區域即停止 requestAnimationFrame，降低背景耗能。
        const observer = new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting
            if (visible) requestFrame()
            else stop()
        }, { threshold: 0 })
        observer.observe(host)
        const sizeObserver = new ResizeObserver(resize)
        sizeObserver.observe(host)
        updateScrollTransition()
        resize()
        interactionRoot.addEventListener('pointerdown', down, { passive: true })
        interactionRoot.addEventListener('pointermove', hover, { passive: true })
        interactionRoot.addEventListener('pointerleave', leave, { passive: true })
        window.addEventListener('pointermove', drag, { passive: true })
        window.addEventListener('pointerup', up, { passive: true })
        window.addEventListener('pointercancel', up, { passive: true })
        window.addEventListener('blur', release)
        window.addEventListener('scroll', queueScrollTransition, { passive: true })
        window.addEventListener('resize', resize, { passive: true })
        window.addEventListener('resize', queueScrollTransition, { passive: true })
        document.addEventListener('visibilitychange', visibilityChange)
        motion.addEventListener('change', preferencesChange)
        compact.addEventListener('change', preferencesChange)
        canvas.addEventListener('webglcontextlost', contextLost)
        canvas.addEventListener('webglcontextrestored', contextRestored)

        // effect 清理：停止動畫、解除監聽並釋放仍有效的 GPU 資源。
        return () => {
            stop()
            observer.disconnect()
            sizeObserver.disconnect()
            interactionRoot.removeEventListener('pointerdown', down)
            interactionRoot.removeEventListener('pointermove', hover)
            interactionRoot.removeEventListener('pointerleave', leave)
            window.removeEventListener('pointermove', drag)
            window.removeEventListener('pointerup', up)
            window.removeEventListener('pointercancel', up)
            window.removeEventListener('blur', release)
            window.removeEventListener('scroll', queueScrollTransition)
            window.removeEventListener('resize', resize)
            window.removeEventListener('resize', queueScrollTransition)
            document.removeEventListener('visibilitychange', visibilityChange)
            motion.removeEventListener('change', preferencesChange)
            compact.removeEventListener('change', preferencesChange)
            canvas.removeEventListener('webglcontextlost', contextLost)
            canvas.removeEventListener('webglcontextrestored', contextRestored)
            delete host.dataset.renderer
            host.style.removeProperty('--sphere-orbit-color')
            flow?.style.removeProperty('--sphere-scroll-progress')
            disposeGpu()
        }
    }, [contextVersion])

    return (
        <div ref={hostRef} className="hero-sphere" aria-hidden="true">
            <div className="hero-sphere__fallback">
                <i className="hero-sphere__orbit hero-sphere__orbit--one" />
                <i className="hero-sphere__orbit hero-sphere__orbit--two" />
                <i className="hero-sphere__orbit hero-sphere__orbit--three" />
                <div className="hero-sphere__surface" />
            </div>
            <canvas ref={canvasRef} className="hero-sphere__canvas" />
        </div>
    )
}
