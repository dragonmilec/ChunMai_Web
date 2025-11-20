
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Filter } from 'lucide-react'

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState('all')

    const categories = [
        { id: 'all', name: '全部' },
        { id: 'web', name: '網站開發' },
        { id: 'mobile', name: '行動應用' },
        { id: 'iot', name: '物聯網' },
        //{ id: 'system', name: '企業系統' }
    ]

    const projects = [
        //{
        //    id: 1,
        //    title: 'E-Commerce 購物平台',
        //    category: 'web',
        //    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
        //    description: '完整的電商解決方案，包含商品管理、訂單處理、金流整合等功能',
        //    coreFeatures: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        //    demoUrl: '#',
        //    githubUrl: '#'
        //},
        //{
        //    id: 2,
        //    title: '企業資源管理系統',
        //    category: 'system',
        //    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=600',
        //    description: '整合人資、財務、庫存管理的企業級系統',
        //    coreFeatures: ['Vue.js', 'Spring Boot', 'PostgreSQL', 'Redis'],
        //    demoUrl: '#',
        //    githubUrl: '#'
        //},
        {
            id: 1,
            title: '智慧口腔暨吞嚥賦能照護雲管家',
            category: 'web',
            image: 'images/t05.png',
            description: '提供全方位的口腔資料管理及分析功能，幫助您更有效率地跟蹤病人的口腔健康狀況。',
            coreFeatures: ['AI 口腔資料分析與建議', '互動式吞嚥賦能訓練模組', '行動端進度追蹤與報表生成', '雲端資料同步與安全管理'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            id: 2,
            title: '語言互動治療軟體',
            category: 'mobile',
            image: 'images/za8.jpg',
            description: '適用語言遲緩、自閉症',
            coreFeatures: ['語音辨識與語言互動分析', '即時互動回饋系統', '多媒體課程整合與學習成效追蹤', 'AI 助教或智能提示功能'],
            demoUrl: '#',
            githubUrl: '#'
        }
        ,
        {
            id: 3,
            title: '吞嚥賦能體感訓練遊戲',
            category: 'mobile',
            image: 'images/z08.png',
            description: '這款 APP 透過 舌頭體感互動遊戲，幫助使用者提升舌頭靈活度與吞嚥能力，並提供 即時回饋與進度追蹤',
            coreFeatures: ['影像辨識與舌頭動作分析', '壓力感測健舌器互動', '動作評分與即時文字回饋', '後台數據分析與統計追蹤', 'WebSocket 實時資料同步'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            id: 4,
            title: '物聯網醫美',
            category: 'iot',
            image: 'images/z07.png',
            description: '超音速霧化直達真皮層，雲端精準控制與QRCODE授權啟用的物聯網藥劑注射平台。',
            coreFeatures: ['超音速霧化技術（200nm 微粒）', '雲端控制噴射參數與藥劑管理', '藍牙連線與 IoT 裝置互動', 'QR Code 授權啟用與單瓶追蹤', '自動資料上傳與使用狀況分析'],
            demoUrl: '#',
            githubUrl: '#'
        },
        //{
        //    id: 5,
        //    title: '企業資源管理系統',
        //    category: 'system',
        //    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=600',
        //    description: '整合人資、財務、庫存管理的企業級系統',
        //    coreFeatures: ['Vue.js', 'Spring Boot', 'PostgreSQL', 'Redis'],
        //    demoUrl: '#',
        //    githubUrl: '#'
        //}
    ]

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter)


    // 處理相關專案點擊，滾動到頁面頂部
    const handleRelatedProjectClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            我們的
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                產品
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            探索我們為客戶打造的創新軟體解決方案
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Buttons */}
            <section className="py-12 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveFilter(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === category.id
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-slate-800/50 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                            >
                                <Link onClick={handleRelatedProjectClick} to={`/portfolio/${project.id}`} className="block">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={`${import.meta.env.BASE_URL}${project.image}`}
                                            alt={project.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {/*    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">*/}
                                    {/*        */}{/*<div*/}
                                    {/*        */}{/*    onClick={(e) => {*/}
                                    {/*        */}{/*        e.preventDefault()*/}
                                    {/*        */}{/*        window.open(project.demoUrl, '_blank')*/}
                                    {/*        */}{/*    }}*/}
                                    {/*        */}{/*    className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors cursor-pointer"*/}
                                    {/*        */}{/*>*/}
                                    {/*        */}{/*    <ExternalLink className="h-4 w-4" />*/}
                                    {/*        */}{/*</div>*/}
                                    {/*        */}{/*<div*/}
                                    {/*        */}{/*    onClick={(e) => {*/}
                                    {/*        */}{/*        e.preventDefault()*/}
                                    {/*        */}{/*        window.open(project.githubUrl, '_blank')*/}
                                    {/*        */}{/*    }}*/}
                                    {/*        */}{/*    className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors cursor-pointer"*/}
                                    {/*        */}{/*>*/}
                                    {/*        */}{/*    <Github className="h-4 w-4" />*/}
                                    {/*        */}{/*</div>*/}
                                    {/*    </div>*/}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.coreFeatures.map((coreFeatures, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-slate-700 text-blue-400 rounded-full text-xs font-medium"
                                                >
                                                    {coreFeatures}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            有想法想要實現嗎？
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            讓我們協助您將創意轉化為現實，打造專屬的軟體解決方案
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors transform hover:scale-105"
                            onClick={handleRelatedProjectClick}
                        >
                            <span>開始您的專案</span>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Portfolio
