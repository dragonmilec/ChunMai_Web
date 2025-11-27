
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircleDashed as MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        window.location.href = `mailto:anthony.liau@dragon-mile.com?subject=${formData.service}&body=${formData.message}`

    }

    const contactInfo = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: '電子郵件',
            content: 'anthony.liau@dragon-mile.com',
            description: '我們會盡快回覆'
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: '電話',
            content: '+07 552-3561',
            description: '週一至週五 9:00-18:00'
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: '地址',
            content: '804高雄市鼓山區明華路251號10樓1010室',
            description: '歡迎預約拜訪'
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: '營業時間',
            content: '週一至週五 9:00-18:00',
            description: '週末及國定假日休息'
        }
    ]

    const services = [
        '網站開發',
        '行動應用開發',
        '企業系統開發',
        'UI/UX 設計',
        '雲端服務',
        '系統維護',
        '其他'
    ]

    const budgetRanges = [
        '10萬以下',
        '10-30萬',
        '30-50萬',
        '50-100萬',
        '100萬以上',
        '待討論'
    ]

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
                            聯絡
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                我們
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            有任何問題或專案需求，歡迎與我們聯絡，我們將竭誠為您服務
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 bg-slate-800/50 rounded-2xl hover:bg-slate-700/50 transition-colors"
                            >
                                <div className="text-blue-400 mb-4 flex justify-center">
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {info.title}
                                </h3>
                                <p className="text-gray-300 mb-2">{info.content}</p>
                                <p className="text-gray-400 text-sm">{info.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-20 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-8">
                                發送訊息給我們
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-300 mb-2">姓名 *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                                            placeholder="請輸入您的姓名"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">電子郵件 *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                                            placeholder="請輸入您的電子郵件"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-300 mb-2">公司名稱</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                                            placeholder="請輸入公司名稱（選填）"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2">服務項目 *</label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                                        >
                                            <option value="">請選擇服務項目</option>
                                            {services.map((service, index) => (
                                                <option key={index} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">預算範圍</label>
                                    <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                                    >
                                        <option value="">請選擇預算範圍（選填）</option>
                                        {budgetRanges.map((range, index) => (
                                            <option key={index} value={range}>{range}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">專案描述 *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                                        placeholder="請詳細描述您的專案需求..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <Send className="h-5 w-5" />
                                    <span>發送訊息</span>
                                </button>
                            </form>
                        </motion.div>

                        {/* Map & Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8">
                                    我們的位置
                                </h2>
                                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                                    <iframe
                                        className="w-full h-full"
                                        loading="lazy"
                                        allowFullScreen
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d592.2076384361138!2d120.29877072431653!3d22.663176243098366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e0500944ea4d1%3A0x63cee582a8762dee!2zODA06auY6ZuE5biC6byT5bGx5Y2A5piO6I-v6LevMjUx6JmfMTAgMTAxMA!5e1!3m2!1szh-TW!2stw!4v1761708940281!5m2!1szh-TW!2stw">
                                    </iframe>
                                </div>
                            </div>



                            <div className="bg-slate-800/50 rounded-2xl p-8">
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <MessageCircle className="h-6 w-6 text-blue-400 mr-3" />
                                    常見問題
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-white mb-2">專案開發週期多長？</h4>
                                        <p className="text-gray-300 text-sm">依專案複雜度而定，一般網站 2-4 週，企業系統 2-6 個月。</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white mb-2">如何收費？</h4>
                                        <p className="text-gray-300 text-sm">我們提供透明的報價，依功能需求和開發時程計算。</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white mb-2">提供後續維護嗎？</h4>
                                        <p className="text-gray-300 text-sm">是的，我們提供完整的維護和技術支援服務。</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                        className="text-center bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            還有其他問題嗎？
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            歡迎直接致電或發送電子郵件給我們，我們會立即為您解答
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+886212345678"
                                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors transform hover:scale-105"
                            >
                                <Phone className="h-5 w-5" />
                                <span>立即致電</span>
                            </a>
                            <a
                                href="mailto:info@moderndev.com"
                                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors transform hover:scale-105"
                            >
                                <Mail className="h-5 w-5" />
                                <span>發送郵件</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Contact
