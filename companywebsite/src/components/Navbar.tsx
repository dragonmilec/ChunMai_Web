
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2, Sparkles } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: '首頁', path: '/' },
        { name: '關於我們', path: '/about' },
        { name: '服務項目', path: '/services' },
        { name: '產品目錄', path: '/portfolio' },
        { name: '聯絡我們', path: '/contact' },
    ]

    // 處理相關專案點擊，滾動到頁面頂部
    const handleRelatedProjectClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const handleRelatedProjectClickHome = () => {
        window.scrollTo(0, 0)
    } 

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link onClick={handleRelatedProjectClickHome} to="/" className="flex items-center space-x-2 group">
                        {/* Logo 文字 */}
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            醇邁
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative group ${location.pathname === item.path
                                            ? 'text-blue-400'
                                            : 'text-gray-300 hover:text-white'
                                        }`}
                                    onClick={
                                        item.path === "/"
                                            ? handleRelatedProjectClickHome
                                            : handleRelatedProjectClick
                                    }
                                >
                                    {item.name}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform transition-transform duration-200 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-800/95 backdrop-blur-md"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 text-base font-medium transition-colors ${location.pathname === item.path
                                            ? 'text-blue-400 bg-slate-700'
                                            : 'text-gray-300 hover:text-white hover:bg-slate-700'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
