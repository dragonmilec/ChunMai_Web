
import React from 'react'
import { Link } from 'react-router-dom'
import { Code2, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {

    // 處理相關專案點擊，滾動到頁面頂部
    const handleRelatedProjectClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleRelatedProjectClickHome = () => {
        window.scrollTo(0, 0)
    } 

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 relative">
                                <img
                                    src={`${import.meta.env.BASE_URL}icons/square-terminal_w.png`}
                                    alt="純邁 Logo"
                                    className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                                />
                            </div>

                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                純邁
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md">
                            專業的軟體開發團隊，致力於為客戶提供創新、高品質的軟體解決方案。
                            從網站開發到企業系統，我們都能為您量身打造。
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">快速連結</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors" onClick={handleRelatedProjectClickHome}>
                                    首頁
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition-colors" onClick={handleRelatedProjectClick}>
                                    關於我們
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-400 hover:text-white transition-colors" onClick={handleRelatedProjectClick}>
                                    服務項目
                                </Link>
                            </li>
                            <li>
                                <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors" onClick={handleRelatedProjectClick}>
                                    產品目錄
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors" onClick={handleRelatedProjectClick}>
                                    聯絡我們
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">聯絡資訊</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <span>Jeff.Tseng@dragon-mile.com</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <Phone className="h-4 w-4 text-blue-400" />
                                <span>+886 910921303</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <MapPin className="h-4 w-4 text-blue-400" />
                                <span>804高雄市鼓山區明華路251號10樓1010室</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2025 純邁有限公司. 保留所有權利.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
