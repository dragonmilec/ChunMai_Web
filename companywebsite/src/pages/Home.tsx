
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, Rocket, Users, Code, Sparkles, Star, TrendingUp, Award } from 'lucide-react'

const Home = () => {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    // 產品展示數據
    const showcaseProjects = [
        {
            title: '物聯網醫美',
            image: 'images/z07.png',
            description: '超音速霧化直達真皮層，雲端精準控制與QRCODE授權啟用的物聯網藥劑注射平台。',
            color: 'from-orange-500 to-red-500'
        },
        {
            title: '語言互動治療軟體',
            image: 'images/c02.png',
            description: '適用語言遲緩、自閉症',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: '智慧口腔暨吞嚥賦能照護雲管家',
            image: 'images/t05.png',
            description: '提供全方位的口腔資料管理及分析功能',
            color: 'from-green-500 to-emerald-500'
        },
        {
            title: '舌頭訓練體感互動遊戲',
            image: 'images/z08.png',
            description: '高效業務流程',
            color: 'from-purple-500 to-pink-500'
        }
      
    ]

    const [currentProject, setCurrentProject] = useState(0)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        if (isHovering) return // 滑鼠懸停時不自動翻頁

        const interval = setInterval(() => {
            setCurrentProject((prev) => (prev + 1) % showcaseProjects.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [isHovering, currentProject])

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
        <div className="pt-16">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900"></div>

                    {/* 動態粒子背景 */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                            style={
                                {
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }
                            }
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}

                    {/* 光暈效果 */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                    />

                    {/* 浮動產品圖片 */}
                    <motion.div
                        className="absolute top-20 right-10 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
                        style={{ y, opacity }}
                        initial={{ opacity: 0, x: 100, rotate: -10 }}
                        animate={{ opacity: 0.8, x: 0, rotate: -5 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}images/z07.png`}
                            alt="Product"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-20 left-10 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
                        style={{ y, opacity }}
                        initial={{ opacity: 0, x: -100, rotate: 10 }}
                        animate={{ opacity: 0.8, x: 0, rotate: 5 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}images/t04.png`}
                            alt="Development"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
                    </motion.div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Logo 動畫 */}
                        <div className="flex justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="relative"
                            >
                                {/* 主圖片 */}
                                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-8">
                                    <img
                                        src={`${import.meta.env.BASE_URL}icons/square-terminal_w.png`}
                                        alt="Animated Image"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* 光暈動畫背景 */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl blur-xl"></div>

                                <motion.div
                                    className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl blur-xl"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.8, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* 標題動畫 */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">










                                創新軟體
                            </span>
                            <br />
                            <span className="text-white">創造價值</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">




                            從網站到企業系統，我們專注於打造實用、可靠的軟體，
                            <br className="hidden md:block" />
                            幫助您提升業務效能，實現數位轉型目標。
                        </p>
                        {/* 數據展示 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                            className="flex flex-wrap justify-center gap-8 text-center"
                        >
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link
                                to="/contact"
                                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                                onClick={handleRelatedProjectClick}
                            >
                                <span>開始合作</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/portfolio"
                                className="px-8 py-4 border border-gray-600 hover:border-gray-400 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/5"
                                onClick={handleRelatedProjectClick}
                            >
                                查看產品
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </motion.div>
            </section>

            {/* 產品展示區塊 */}
            <section className="py-20 bg-slate-900/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
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

                    <div className="relative">
                        {/* 產品輪播 */}
                        <div
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {/* 左側：產品圖片 */}
                            <motion.div
                                key={currentProject}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                    <img
                                        src={`${import.meta.env.BASE_URL}${showcaseProjects[currentProject].image}`}
                                        alt={showcaseProjects[currentProject].title}
                                        className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${showcaseProjects[currentProject].color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {showcaseProjects[currentProject].title}
                                        </h3>
                                        <p className="text-gray-200">
                                            {showcaseProjects[currentProject].description}
                                        </p>
                                    </div>
                                </div>

                                {/* 裝飾元素 */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                            </motion.div>

                            {/* 右側：項目列表 */}
                            <div className="space-y-4">
                                {showcaseProjects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        onClick={() => {
                                            setCurrentProject(index)
                                            // 點擊時重置計時器
                                            setIsHovering(false)
                                        }}
                                        className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${currentProject === index
                                                ? 'bg-gradient-to-r ' + project.color + ' shadow-lg'
                                                : 'bg-slate-800/50 hover:bg-slate-800'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className={`text-xl font-bold mb-2 ${currentProject === index ? 'text-white' : 'text-gray-200'
                                                    }`}>
                                                    {project.title}
                                                </h4>
                                                <p className={currentProject === index ? 'text-white/90' : 'text-gray-400'}>
                                                    {project.description}
                                                </p>
                                            </div>
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentProject === index ? 'bg-white/20' : 'bg-blue-500/10'
                                                }`}>
                                                <TrendingUp className={`h-6 w-6 ${currentProject === index ? 'text-white' : 'text-blue-400'
                                                    }`} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 導航點 */}
                        <div className="flex justify-center space-x-2 mt-8">
                            {showcaseProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentProject(index)
                                        // 點擊時重置計時器
                                        setIsHovering(false)
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentProject === index
                                            ? 'bg-blue-500 w-8'
                                            : 'bg-gray-600 hover:bg-gray-500'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

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
        </div>
    )
}

export default Home
