import { useEffect, useRef } from 'react'
import './DotWaveBackground.css'

// 點狀波浪設定：四個 Hero 共用，直接修改數值即可。
const DOT_WAVE_SETTINGS = {
    xGap: 8,             // X 軸點距（px），數值越大越稀疏
    yGap: 8,             // Y 軸點距（px），數值越大越稀疏
    dotSize: 0.8,        // 粒子半徑（px）
    wavePeakMin: 6,       // 遠方的最小波峰高度（px）
    wavePeakMax: 120,      // 前方的最大波峰高度（px）
    waveStart: 85,        // 地平線位置（Hero 高度百分比）
    horizonWidth: 0.4,   // 地平線寬度；越小，透視角度越強
    frontWidth: 1.5,      // 前景寬度；越大，兩側向外張開越多
    depthCurve: 1.85,     // 縱深壓縮；越大，遠方的點越壅擠
    waveCycles: 1.6,     // 畫面內的波浪數量
    speed: 0.32,          // 流動速度；設為 0 可完全靜止
    fps: 24,              // 更新率，降低可再節省效能
}

const TWO_PI = Math.PI * 2

const DotWaveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d', { alpha: true })
        if (!context) return

        let width = 0
        let height = 0
        let frameId = 0
        let isVisible = true
        let lastFrame = 0
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

        const resize = () => {
            const bounds = canvas.getBoundingClientRect()
            width = Math.max(1, bounds.width)
            height = Math.max(1, bounds.height)

            // 限制像素密度，避免高 DPI 螢幕產生不必要的繪圖負擔。
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25)
            canvas.width = Math.round(width * pixelRatio)
            canvas.height = Math.round(height * pixelRatio)
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        }

        const draw = (timestamp: number) => {
            frameId = 0
            const animationEnabled = DOT_WAVE_SETTINGS.speed > 0 && !reduceMotion.matches
            const frameInterval = 1000 / Math.max(1, DOT_WAVE_SETTINGS.fps)
            if (!isVisible || document.hidden) return
            if (animationEnabled && timestamp - lastFrame < frameInterval) {
                scheduleFrame()
                return
            }

            lastFrame = timestamp
            context.clearRect(0, 0, width, height)

            const xGap = Math.max(8, DOT_WAVE_SETTINGS.xGap)
            const yGap = Math.max(8, DOT_WAVE_SETTINGS.yGap)
            const radius = Math.max(0.4, DOT_WAVE_SETTINGS.dotSize)
            const horizonY = height * (DOT_WAVE_SETTINGS.waveStart / 100)
            const planeHeight = height - horizonY + yGap * 2
            const rowCount = Math.max(4, Math.ceil(planeHeight / yGap) + 1)
            const columnCount = Math.max(8, Math.ceil(width / xGap) + 4)
            const halfColumns = (columnCount - 1) / 2
            const elapsed = animationEnabled ? timestamp / 1000 : 0

            for (let row = 0; row < rowCount; row += 1) {
                const depth = rowCount <= 1 ? 0 : row / (rowCount - 1)
                const projectedDepth = Math.pow(depth, Math.max(1, DOT_WAVE_SETTINGS.depthCurve))
                const rowY = horizonY + projectedDepth * planeHeight
                const perspectiveWidth = DOT_WAVE_SETTINGS.horizonWidth
                    + (DOT_WAVE_SETTINGS.frontWidth - DOT_WAVE_SETTINGS.horizonWidth) * depth
                const amplitude = DOT_WAVE_SETTINGS.wavePeakMin
                    + (DOT_WAVE_SETTINGS.wavePeakMax - DOT_WAVE_SETTINGS.wavePeakMin) * depth
                const opacity = 0.22 + depth * 0.8
                const radiusAtDepth = radius * (0.6 + depth * 0.55)

                context.beginPath()
                context.fillStyle = `rgba(134, 187, 198, ${opacity})`

                for (let column = 0; column < columnCount; column += 1) {
                    const columnOffset = column - halfColumns
                    const progress = columnCount <= 1 ? 0 : column / (columnCount - 1)
                    const x = width / 2 + columnOffset * xGap * perspectiveWidth
                    const phase = progress * TWO_PI * DOT_WAVE_SETTINGS.waveCycles
                        + depth * 1.15
                        - elapsed * DOT_WAVE_SETTINGS.speed
                    const waveOffset = Math.sin(phase) * amplitude
                    const y = rowY + waveOffset * (0.2 + projectedDepth * 0.8)

                    context.moveTo(x + radiusAtDepth, y)
                    context.arc(x, y, radiusAtDepth, 0, TWO_PI)
                }

                context.fill()
            }

            if (animationEnabled) scheduleFrame()
        }

        const scheduleFrame = () => {
            if (frameId === 0 && isVisible && !document.hidden) {
                frameId = window.requestAnimationFrame(draw)
            }
        }

        const stopFrame = () => {
            if (frameId !== 0) {
                window.cancelAnimationFrame(frameId)
                frameId = 0
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            resize()
            lastFrame = 0
            scheduleFrame()
        })
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting
            if (isVisible) {
                lastFrame = 0
                scheduleFrame()
            } else {
                stopFrame()
            }
        })
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopFrame()
            } else if (isVisible) {
                lastFrame = 0
                scheduleFrame()
            }
        }
        const handleMotionChange = () => {
            stopFrame()
            lastFrame = 0
            scheduleFrame()
        }

        resizeObserver.observe(canvas)
        visibilityObserver.observe(canvas)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        reduceMotion.addEventListener('change', handleMotionChange)
        resize()
        scheduleFrame()

        return () => {
            stopFrame()
            resizeObserver.disconnect()
            visibilityObserver.disconnect()
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            reduceMotion.removeEventListener('change', handleMotionChange)
        }
    }, [])

    return <canvas ref={canvasRef} className="dot-wave-background" aria-hidden="true" />
}

export default DotWaveBackground
