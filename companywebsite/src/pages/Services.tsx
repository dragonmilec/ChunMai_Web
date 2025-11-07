
import * as React from "react";
import { motion } from 'framer-motion'
import { Code, Smartphone, Database, Cloud, Palette, Shield, Zap, Users } from 'lucide-react'

const Services = () => {
    const services = [
        {
            icon: <Code className="h-12 w-12" />,
            title: '網站開發',
            description: '響應式網站、電商平台、企業官網等客製化網站開發服務',
            features: ['響應式設計', 'SEO 優化', '高效能架構', '安全防護'],
            price: '起價 NT$ 50,000'
        },
        {
            icon: <Smartphone className="h-12 w-12" />,
            title: '行動應用開發',
            description: 'iOS 和 Android 原生應用，以及跨平台應用開發',
            features: ['原生開發', '跨平台方案', 'UI/UX 設計', 'App Store 上架'],
            price: '起價 NT$ 80,000'
        },
        {
            icon: <Database className="h-12 w-12" />,
            title: '企業系統開發',
            description: 'ERP、CRM、庫存管理等企業級系統解決方案',
            features: ['客製化功能', '數據整合', '權限管理', '報表分析'],
            price: '起價 NT$ 150,000'
        },
        {
            icon: <Cloud className="h-12 w-12" />,
            title: '雲端服務',
            description: '雲端架構設計、遷移服務、DevOps 自動化部署',
            features: ['AWS/Azure', '自動化部署', '監控告警', '備份恢復'],
            price: '起價 NT$ 30,000'
        },
        {
            icon: <Palette className="h-12 w-12" />,
            title: 'UI/UX 設計',
            description: '使用者介面設計、用戶體驗優化、品牌視覺設計',
            features: ['原型設計', '使用者測試', '視覺設計', '互動設計'],
            price: '起價 NT$ 25,000'
        },
        {
            icon: <Shield className="h-12 w-12" />,
            title: '系統維護',
            description: '持續的技術支援、系統更新、安全性維護服務',
            features: ['24/7 支援', '定期更新', '安全檢測', '效能優化'],
            price: '月費 NT$ 8,000'
        }
    ]

    const process = [
        {
            step: '01',
            title: '需求分析',
            description: '深入了解您的業務需求和目標，制定最適合的解決方案'
        },
        {
            step: '02',
            title: '方案設計',
            description: '設計系統架構和用戶介面，確保符合您的期望'
        },
        {
            step: '03',
            title: '開發實作',
            description: '採用敏捷開發方式，定期交付可運行的軟體版本'
        },
        {
            step: '04',
            title: '測試部署',
            description: '全面測試確保品質，協助部署到生產環境'
        },
        {
            step: '05',
            title: '維護支援',
            description: '提供持續的技術支援和系統維護服務'
        }
    ]

    const benefits = [
        {
            icon: <Zap className="h-8 w-8" />,
            title: '快速交付',
            description: '採用敏捷開發流程，快速響應需求變更'
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: '專業團隊',
            description: '經驗豐富的開發團隊，提供專業技術諮詢'
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: '品質保證',
            description: '嚴格的品質控制流程，確保交付高品質產品'
        }
    ]
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
                                服務項目
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            提供全方位的軟體開發服務，從概念到實現，我們都能為您提供專業支援
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 bg-slate-800/50 rounded-2xl hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105"
                            >
                                <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {service.title}
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-gray-400">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            {/*    <div className="text-blue-400 font-semibold text-lg">*/}
                            {/*        {service.price}*/}
                            {/*    </div>*/}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            開發流程
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            我們採用標準化的開發流程，確保專案順利進行
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {process.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center relative"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold text-lg">{step.step}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    {step.description}
                                </p>
                                {index < process.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-1/2"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            為什麼選擇我們
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center p-8"
                            >
                                <div className="text-blue-400 mb-4 flex justify-center">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-300">
                                    {benefit.description}
                                </p>
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
                            準備開始您的專案了嗎？
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            聯絡我們獲得免費的專案評估和報價
                        </p>
                        <a
                            href={`${import.meta.env.BASE_URL}contact`}
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors transform hover:scale-105"
                            onClick={handleRelatedProjectClick}
                        >
                            <span>立即聯絡</span>
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Services
