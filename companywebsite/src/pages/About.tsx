
import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Award, Heart, Code2, Lightbulb, Shield } from 'lucide-react'

const About = () => {
    const values = [
        {
            icon: <Lightbulb className="h-8 w-8" />,
            title: '創新思維',
            description: '持續探索最新技術，為客戶提供前瞻性的解決方案'
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: '用戶至上',
            description: '以用戶體驗為核心，設計直觀易用的軟體產品'
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: '品質保證',
            description: '嚴格的品質控制流程，確保每個項目都達到最高標準'
        }
    ]

    const team = [
        {
            name: '陳建志',
            position: '技術總監',
            image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: '擁有15年軟體開發經驗，專精於系統架構設計'
        },
        {
            name: '林美華',
            position: 'UI/UX 設計師',
            image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: '專注於用戶體驗設計，創造直觀美觀的介面'
        },
        {
            name: '王志明',
            position: '全端開發工程師',
            image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
            description: '精通前後端開發，具備豐富的專案整合經驗'
        }
    ]

    //const stats = [
    //    { number: '50+', label: '成功專案' },
    //    { number: '30+', label: '滿意客戶' },
    //    { number: '5年+', label: '服務經驗' },
    //    { number: '24/7', label: '技術支援' }
    //]

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
                            關於
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                純邁
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            我們是一支充滿熱忱的專業團隊，致力於為客戶打造最優質的軟體解決方案
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Company Story */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                我們的故事
                            </h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                我們想打造能真正解決問題的產品——讓科技回歸簡單、讓使用變得自然。
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                從第一個原型到如今的完整平台，
                                    每一步都來自我們對「更好使用體驗」的執著。                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 flex items-center justify-center">
                                <Code2 className="h-32 w-32 text-blue-400" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            {/*<section className="py-20 bg-slate-800/50">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">*/}
            {/*            {stats.map((stat, index) => (*/}
            {/*                <motion.div*/}
            {/*                    key={index}*/}
            {/*                    initial={{ opacity: 0, y: 50 }}*/}
            {/*                    whileInView={{ opacity: 1, y: 0 }}*/}
            {/*                    transition={{ duration: 0.6, delay: index * 0.1 }}*/}
            {/*                    viewport={{ once: true }}*/}
            {/*                    className="text-center"*/}
            {/*                >*/}
            {/*                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">*/}
            {/*                        {stat.number}*/}
            {/*                    </div>*/}
            {/*                    <div className="text-gray-300">{stat.label}</div>*/}
            {/*                </motion.div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* Values */}
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
                            我們的核心價值
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            這些價值觀指導著我們的每一個決策和行動
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="text-center p-8 bg-slate-800/50 rounded-2xl hover:bg-slate-700/50 transition-colors"
                            >
                                <div className="text-blue-400 mb-4 flex justify-center">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-300">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
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
                            專業團隊
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            我們的團隊由經驗豐富的專業人士組成
                        </p>
                    </motion.div>

                    {/*<div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
                    {/*    {team.map((member, index) => (*/}
                    {/*        <motion.div*/}
                    {/*            key={index}*/}
                    {/*            initial={{ opacity: 0, y: 50 }}*/}
                    {/*            whileInView={{ opacity: 1, y: 0 }}*/}
                    {/*            transition={{ duration: 0.6, delay: index * 0.2 }}*/}
                    {/*            viewport={{ once: true }}*/}
                    {/*            className="text-center bg-slate-700/50 rounded-2xl p-8 hover:bg-slate-700 transition-colors"*/}
                    {/*        >*/}
                    {/*            <img*/}
                    {/*                src={member.image}*/}
                    {/*                alt={member.name}*/}
                    {/*                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"*/}
                    {/*            />*/}
                    {/*            <h3 className="text-xl font-semibold text-white mb-2">*/}
                    {/*                {member.name}*/}
                    {/*            </h3>*/}
                    {/*            <p className="text-blue-400 mb-4">{member.position}</p>*/}
                    {/*            <p className="text-gray-300 text-sm">{member.description}</p>*/}
                    {/*        </motion.div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
            </section>
        </div>
    )
}

export default About
