
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, Rocket, Users, Code, X } from 'lucide-react'

import InteractiveSphere from '../components/InteractiveSphere'

const Home = () => {
    const reduceMotion = useReducedMotion()

    // 產品展示數據
    const showcaseProjects = [
        {
            id: 4,
            title: '物聯網醫美',
            image: 'images/z07.png',
            description: '超音速霧化直達真皮層，雲端精準控制與QRCODE授權啟用的物聯網藥劑注射平台。',
            color: 'from-white to-slate-900'
        },
        {
            id: 2,
            title: '語言互動治療軟體',
            image: 'images/c02.png',
            description: '適用語言遲緩、自閉症',
            color: 'from-white to-slate-900'
        },
        {
            id: 1,
            title: '智慧口腔暨吞嚥賦能照護雲管家',
            image: 'images/t05.png',
            description: '提供全方位的口腔資料管理及分析功能',
            color: 'from-white to-slate-900'
        },
        {
            id: 3,
            title: '吞嚥賦能體感訓練遊戲',
            image: 'images/z08.png',
            description: '高效業務流程',
            color: 'from-white to-slate-900'
        }
      
    ]

    const [currentProject, setCurrentProject] = useState(0)
    const [carouselPaused, setCarouselPaused] = useState(false)
    const [carouselWidth, setCarouselWidth] = useState(0)
    const [selectedProject, setSelectedProject] = useState<(typeof showcaseProjects)[number] | null>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const suppressCardClickRef = useRef(false)

    const moveProject = (direction: number) => {
        setCurrentProject(current => (current + direction + showcaseProjects.length) % showcaseProjects.length)
    }

    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return
        const updateWidth = () => setCarouselWidth(carousel.clientWidth)
        const observer = new ResizeObserver(updateWidth)
        observer.observe(carousel)
        updateWidth()
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (carouselPaused || selectedProject || reduceMotion) return
        const interval = window.setInterval(() => {
            setCurrentProject(current => (current + 1) % showcaseProjects.length)
        }, 5000)
        return () => window.clearInterval(interval)
    }, [carouselPaused, selectedProject, reduceMotion, showcaseProjects.length])

    useEffect(() => {
        if (!selectedProject) return
        const previousOverflow = document.body.style.overflow
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelectedProject(null)
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', closeOnEscape)
        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', closeOnEscape)
        }
    }, [selectedProject])

    const slideWidth = Math.max(1, carouselWidth - 64)
    const slidePosition = (index: number) => {
        let position = index - currentProject
        const half = showcaseProjects.length / 2
        if (position > half) position -= showcaseProjects.length
        if (position < -half) position += showcaseProjects.length
        return position
    }

    const features = [
        {
            icon: <Code className="h-8 w-8" />,
            title: '客製化開發',
            description: '根據您的需求量身打造專屬軟體解決方案'
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: '高效能',
            description: '採用最新技術架構，確保系統運行快速穩定'
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: '安全可靠',
            description: '嚴格的安全標準，保護您的數據和隱私'
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: '專業團隊',
            description: '經驗豐富的開發團隊，提供全方位技術支援'
        }
    ]

    // 處理相關專案點擊，滾動到頁面頂部
    const handleRelatedProjectClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="pt-20">
            <div className="home-sphere-flow">
                {/* Hero Section */}
                <section className="sphere-hero" aria-label="創新軟體，創造價值">
                <div className="sphere-hero__layout">
                        {/* 左側：文字內容 */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="sphere-hero__copy space-y-8"
                        >
                            {/* 公司標誌 */}

                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="text-white">打造</span>
                                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> 卓越數位體驗</span>
                                <br />
                                <span className="text-white">驅動企業成長</span>
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                從網站到企業系統，我們專注於打造實用、可靠的軟體，
                                幫助您提升業務效能，實現數位轉型目標。
                            </motion.p>


                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="sphere-hero__actions flex flex-col sm:flex-row gap-4"
                            >
                                <Link
                                    to="/contact"
                                    onClick={handleRelatedProjectClick}
                                    className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <span>立即諮詢</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/portfolio"
                                    onClick={handleRelatedProjectClick}
                                    className="px-8 py-4 border-2 border-gray-600 hover:border-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-blue-500/10 flex items-center justify-center"
                                >
                                    查看案例
                                </Link>
                            </motion.div>
                        </motion.div>
                    <div className="sphere-hero__visual">
                        <InteractiveSphere />
                    </div>
                </div>
                <div className="sphere-hero__scroll" aria-hidden="true">
                    <div className="w-5 h-8 border border-gray-600 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* 產品展示區塊 */}
            <section className="home-content-two py-20" data-sphere-content="2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  

                    <div
                        className="product-showcase-panel relative"
                        onMouseEnter={() => setCarouselPaused(true)}
                        onMouseLeave={() => setCarouselPaused(false)}
                        onFocusCapture={() => setCarouselPaused(true)}
                        onBlurCapture={() => setCarouselPaused(false)}
                        >  <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    精選產品展示
                                </h2>
                                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                    探索我們為客戶打造的創新解決方案
                                </p>
                            </motion.div>
                        <div
                            ref={carouselRef}
                            className="product-showcase-viewport relative overflow-hidden rounded-[18px] outline-none"
                            style={{ height: 'clamp(460px, 48vw, 620px)' }}
                            role="region"
                            aria-roledescription="carousel"
                            aria-label="產品展示"
                            tabIndex={0}
                            onKeyDown={event => {
                                if (event.key === 'ArrowLeft') moveProject(-1)
                                if (event.key === 'ArrowRight') moveProject(1)
                            }}
                        >
                            <motion.div
                                className="product-showcase-stage absolute inset-0 cursor-grab select-none active:cursor-grabbing"
                                style={{ touchAction: 'pan-y' }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.65}
                                dragMomentum={false}
                                dragSnapToOrigin
                                onDragStart={() => {
                                    suppressCardClickRef.current = true
                                    setCarouselPaused(true)
                                }}
                                onDragEnd={(_, info) => {
                                    const shouldMove = Math.abs(info.offset.x) > 48 || Math.abs(info.velocity.x) > 400
                                    if (shouldMove) moveProject(info.offset.x < 0 ? 1 : -1)
                                    setCarouselPaused(false)
                                    window.setTimeout(() => {
                                        suppressCardClickRef.current = false
                                    }, 0)
                                }}
                            >
                                {showcaseProjects.map((project, index) => {
                                    const position = slidePosition(index)
                                    const active = position === 0
                                    const slideGap = 24;
                                    const visible = Math.abs(position) <= 1
                                    return (
                                        <motion.article
                                            key={project.title}
                                            className="product-showcase-card group grid cursor-pointer overflow-hidden rounded-[18px] border border-slate-400/15 bg-slate-900/70 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                bottom: 0,
                                                width: slideWidth,
                                                gridTemplateRows: 'minmax(0, 66%) minmax(0, 34%)',
                                                transformOrigin: 'center',
                                            }}
                                            animate={{
                                                x: 32 + position * (slideWidth + slideGap),
                                                scale: 1,
                                                opacity: visible ? 1 : 0,
                                                zIndex: active ? 2 : 1,
                                            }}
                                            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
                                            aria-hidden={!active}
                                            role="button"
                                            tabIndex={active ? 0 : -1}
                                            aria-label={`查看 ${project.title} 簡介`}
                                            onClick={() => {
                                                if (active && !suppressCardClickRef.current) setSelectedProject(project)
                                            }}
                                            onKeyDown={event => {
                                                if (active && (event.key === 'Enter' || event.key === ' ')) {
                                                    event.preventDefault()
                                                    setSelectedProject(project)
                                                }
                                            }}
                                        >
                                            <div className="product-showcase-media relative min-h-0 overflow-hidden">
                                                <img
                                                    src={`${import.meta.env.BASE_URL}${project.image}`}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading={index === 0 ? 'eager' : 'lazy'}
                                                    draggable={false}
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 transition-opacity group-hover:opacity-30`} />
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
                                            </div>
                                            <div className="product-showcase-copy min-h-0 overflow-hidden p-[clamp(18px,2.5vw,30px)]">
                                                <div className="mb-3 flex items-center justify-between gap-4">
                                                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                                    <span className="shrink-0 text-sm font-semibold tracking-widest text-blue-300">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed">{project.description}</p>
                                            </div>
                                        </motion.article>
                                    )
                                })}
                            </motion.div>
                            <button type="button" className="product-showcase-control product-showcase-control--previous absolute left-2 top-1/2 z-[5] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-blue-200/35 bg-slate-950/80 text-white shadow-xl" aria-label="上一個產品" onClick={() => moveProject(-1)}>
                                <ChevronLeft aria-hidden="true" />
                            </button>
                            <button type="button" className="product-showcase-control product-showcase-control--next absolute right-2 top-1/2 z-[5] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-blue-200/35 bg-slate-950/80 text-white shadow-xl" aria-label="下一個產品" onClick={() => moveProject(1)}>
                                <ChevronRight aria-hidden="true" />
                            </button>
                        </div>
                        <div className="product-showcase-dots flex justify-center gap-2 pt-4" aria-label="選擇產品">
                            {showcaseProjects.map((project, index) => (
                                <button
                                    type="button"
                                    key={project.title}
                                    aria-label={`顯示第 ${index + 1} 個產品`}
                                    className={currentProject === index ? 'h-2 w-7 rounded-full bg-blue-400' : 'h-2 w-2 rounded-full bg-slate-400/50'}
                                    aria-current={currentProject === index ? 'true' : undefined}
                                    onClick={() => setCurrentProject(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            </div>

            {/* Features Section */}
            <section className="py-20 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            為什麼選擇我們
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            我們結合創新思維與專業技術，為每位客戶量身打造最佳的軟體解決方案
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-6 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all duration-300 hover:transform hover:scale-105 border border-transparent hover:border-blue-500/30"
                                whileHover={{ y: -5 }}
                            >
                                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative p-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl text-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10">
                            <Rocket className="h-16 w-16 text-white mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                準備啟動您的項目了嗎？
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                讓我們的專業團隊幫助您將想法轉化為現實，創造出色的軟體產品
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors transform hover:scale-105"
                                onClick={handleRelatedProjectClick}
                            >
                                <span>立即聯絡我們</span>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.article
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="showcase-dialog-title"
                            className="relative grid max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-600/60 bg-slate-900 shadow-2xl md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
                            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
                            transition={{ duration: 0.22 }}
                            onClick={event => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-slate-950/75 text-white transition-colors hover:bg-slate-800"
                                aria-label="關閉產品介紹"
                                onClick={() => setSelectedProject(null)}
                            >
                                <X aria-hidden="true" />
                            </button>
                            <div className="min-h-64 overflow-hidden bg-slate-950 md:min-h-full">
                                <img
                                    src={`${import.meta.env.BASE_URL}${selectedProject.image}`}
                                    alt={selectedProject.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center p-7 sm:p-9">
                                <span className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">產品介紹</span>
                                <h2 id="showcase-dialog-title" className="pr-10 text-3xl font-bold text-white">
                                    {selectedProject.title}
                                </h2>
                                <p className="mt-5 leading-8 text-slate-300">
                                    {selectedProject.description}
                                </p>
                                <Link
                                    to={`/portfolio/${selectedProject.id}`}
                                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    <span>了解詳情</span>
                                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                                </Link>
                            </div>
                        </motion.article>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Home
