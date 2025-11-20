
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Binoculars, Code, Zap, Target, Brain, BarChart3, Globe2, Shield, TrendingUp, Award, Mic, BookOpen, Gamepad2, MessageCircleDashed as MessageCircle, Eye, Clock, RefreshCw, Camera, Database, Search, Settings, Lock, UserCheck } from 'lucide-react'

const ProjectDetail = () => {
    const { id } = useParams()

    const projects = [
        {
            id: 1,
            title: '智慧口腔暨吞嚥賦能照護雲管家',
            category: 'web',
            images: [
                'images/t05.png',
                'images/r01.png',
                'images/z05.png'
            ],
            description: '個人化健身計畫與進度追蹤的行動應用',
            fullDescription: '提供全方位的口腔資料管理及分析功能，幫助您更有效率地跟蹤病人的口腔健康狀況。',
            coreFeatures: ['AI 口腔資料分析與建議', '互動式吞嚥賦能訓練模組', '行動端進度追蹤與報表生成', '雲端資料同步與安全管理'],
            features: [
                '個人化訓練計畫',
                '運動數據記錄',
                '進度視覺化圖表',
                '營養攝取追蹤',
                '社群互動功能',
                '成就系統',
                '健身影片庫',
                '智能提醒通知'
            ],
            duration: ' - ',
            coreFunc: '病人健康數據管理與分析',
            demoUrl: '#',
            githubUrl: '#',
            sceneAlert: '牙科診所、醫療中心、護理機構',
            isOralHealthApp: true
        },
        {
            id: 2,
            title: '語言互動治療軟體',
            category: 'mobile',
            images: [
                'images/c02.png',
                'images/i01.png',
                'images/c01.png'
            ],
            description: '適用語言遲緩、自閉症',
            fullDescription: '現代化的線上教育平台，為教育機構和個人講師提供完整的教學解決方案。平台支援多媒體課程內容、即時互動功能，以及完善的學習成效評估系統。',
            coreFeatures: ['語音辨識與語言互動分析','即時互動回饋系統','多媒體課程整合與學習成效追蹤','AI 助教或智能提示功能'],
            features: [
                '影片課程播放',
                '互動式測驗系統',
                '學習進度追蹤',
                '討論區功能',
                '作業提交系統',
                '證書生成',
                '多語言支援',
                '行動裝置適配'
            ],
            duration: ' - ',
            coreFunc: '語言互動與口語能力訓練',
            demoUrl: '#',
            githubUrl: '#',
            sceneAlert: '教育機構與專業治療師的線上輔助課程',
            isLanguageTherapy: true // 標記這是語言治療平台
        }
        ,
        {
            id: 3,
            title: '吞嚥賦能體感訓練遊戲',
            category: 'mobile',
            images: [
                'images/z08.png',
                'images/o01.png',
                'images/o03.png'
            ],
            description: '這款 APP 透過 舌頭體感互動遊戲，幫助使用者提升舌頭靈活度與吞嚥能力，並提供 即時回饋與進度追蹤',
            fullDescription: '這款 APP 結合 影像辨識與健舌器互動遊戲，透過趣味體感訓練幫助使用者提升舌頭靈活度與吞嚥能力。提供 即時回饋、分數評估與進度追蹤，讓訓練安全、有趣，並可透過數據分析了解成效。',
            coreFeatures: ['影像辨識與舌頭動作分析','壓力感測健舌器互動','動作評分與即時文字回饋','後台數據分析與統計追蹤','WebSocket 實時資料同步'],
            features: [
                '舌頭體操互動遊戲（影像辨識）',
                '健舌器互動遊戲（壓力感測）',
                '動作評分與文字回饋系統',
                '後台數據分析',
                '前台進度追蹤與統計',
                '示範教學與提示系統',
                '腳本與遊戲風格管理',
                '設備串接與數據輸出'
            ],
            duration: ' - ',
            coreFunc: '前台進度追蹤與統計',
            demoUrl: '#',
            githubUrl: '#',
            sceneAlert: '家庭、復健中心或語言治療機構使用者',
            isTongueTrainerGame: true
        },
        {
            id: 4,
            title: '物聯網醫美',
            category: 'iot',
            images: [
                'images/z07.png',
                'images/za5.png',
                'images/za3.jpg'
            ],
            description: '超音速霧化直達真皮層，雲端精準控制與QRCODE授權啟用的物聯網藥劑注射平台。',
            fullDescription: '採用超音速霧化技術，將藥劑平均霧化至200nm微粒，無針直達真皮層，吸收更快、更安全。每瓶藥劑具備專屬雲端參數，可自動下載最佳噴射設定，精準控制噴氣時間與流速。裝置透過藍牙連線與雲端管理，使用者掃描一次性 QRCODE後啟用，每瓶預設可使用 200 次。           所有施打紀錄自動上傳伺服器，方便追蹤與分析使用狀況。',
            coreFeatures: ['超音速霧化技術（200nm 微粒）', '雲端控制噴射參數與藥劑管理', '藍牙連線與 IoT 裝置互動', 'QR Code 授權啟用與單瓶追蹤', '自動資料上傳與使用狀況分析'],
            features: [
                '即時聊天功能',
                '動態發布與分享',
                '圖片影片上傳',
                '社群群組功能',
                '內容推薦演算法',
                '隱私設定控制',
                '通知推送系統',
                '多平台同步'
            ],
            duration: ' - ',
            coreFunc: '無針直達真皮層藥劑注射',
            demoUrl: '#',
            githubUrl: '#',
            sceneAlert: '醫美診所、皮膚科與美容中心',
            isIoTJetInject: true
        },
    ]

    const project = projects.find(p => p.id === parseInt(id || ''))

    // 處理相關專案點擊，滾動到頁面頂部
    const handleRelatedProjectClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!project) {
        return (
            <div className="pt-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">專案未找到</h1>
                    <Link to="/portfolio" className="text-blue-400 hover:text-blue-300">
                        返回產品目錄
                    </Link>
                </div>
            </div>
        )
    }

    // 口腔健康管理應用的詳細內容組件
    const OralHealthAppDetails = () => (
        <>
            {/* 相機拍攝與上傳功能介紹 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Camera className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">相機拍攝與上傳功能</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            這一功能的實現將極大地提升口腔健康管理的便捷性，讓使用者更輕鬆地記錄和追蹤自己的口腔狀況。
                        </p>
                    </motion.div>

                    {/* 幻燈片展示 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            'images/z01.png',
                            'images/z02.png',
                            'images/z03.png',
                            'images/z04.png'
                        ].map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}${image}`} // ✅ 自動加上 base 路徑
                                    alt={`手機介面展示 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <Camera className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">即時拍攝</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                使用者可以直接在APP中啟動相機，方便快捷地拍攝所需的照片。無需切換到其他應用程式，省去繁瑣的操作步驟，提升用戶體驗。
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <TrendingUp className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">照片上傳</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                拍攝完成後，使用者可以輕鬆將照片上傳至系統。無論是牙齒圖像還是其他健康記錄，系統都會自動保存每張照片的上傳日期及相關資料，確保所有資訊的完整性和可追溯性。
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 口腔資料庫 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Database className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">口腔資料庫</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">完整的資料記錄</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    口腔資料庫會詳細記錄每位使用者的相關資料，包括日期、所屬單位、拍攝者名稱及被拍攝者等資訊，確保所有口腔檢測數據都有完整的追溯性。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">直觀的操作功能</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    每筆資料都附有「顯示明細」和「刪除」按鈕，操作簡單方便。用戶可輕鬆查看每筆資料的詳細內容或執行刪除操作，提升資料管理的效率。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">詳細的明細視窗</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    透過「顯示明細」按鈕，將開啟一個新視窗，顯示被拍攝者的牙齒圖片與牙菌斑分析圖，右側則顯示口腔健康紀錄，包括牙齒拍攝位置、牙菌斑覆蓋率等詳細資訊，幫助醫療人員更深入地了解病人的口腔狀況。
                                </p>
                            </motion.div>
                        </div>

                        <div>
                            <img
                                src={`${import.meta.env.BASE_URL}images/t02.png`}
                                alt="口腔資料庫介面"
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 牙菌斑精準分析 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Eye className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">牙菌斑精準分析</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            在「顯示明細」中，系統將自動生成牙菌斑分析圖，並提供詳細的口腔健康紀錄，讓您迅速了解牙菌斑覆蓋率及口腔健康趨勢，極大地提升醫療決策效率。
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/z05.png`}
                                alt="牙菌斑分析圖"
                                className="w-full h-48 object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">AI 智能識別</h3>
                                <p className="text-gray-300">自動識別牙菌斑位置與覆蓋範圍</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/z06.png`}
                                alt="分析結果展示"
                                className="w-full h-48 object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">精準量化</h3>
                                <p className="text-gray-300">提供精確的覆蓋率數據與健康評估</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/t03.png`} alt="醫療決策支援"
                                className="w-full h-48 object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">決策支援</h3>
                                <p className="text-gray-300">為醫療人員提供專業的診斷依據</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 每日健康趨勢圖表 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <BarChart3 className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">每日健康趨勢圖表</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <BarChart3 className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">牙菌斑覆蓋率圖表</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    系統會自動生成每日牙菌斑覆蓋率的趨勢圖，幫助醫療人員輕鬆掌握病人每天的口腔健康變化，提供直觀的數據支持。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <TrendingUp className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">數據可視化追蹤</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    將複雜的數據轉化為簡單易懂的圖表呈現，使醫療團隊能夠更有效地追蹤病人長期的口腔健康狀況，及早發現並應對問題。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <Search className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">多條件搜尋功能</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    透過強大的搜尋功能，使用者可以根據拍攝日期、使用者姓名、單位等多種條件進行篩選，快速找到所需的口腔健康數據。
                                </p>
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <img
                                src={`${import.meta.env.BASE_URL}images/t04.png`}
                                alt="健康趨勢圖表"
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                            />

                        </div>
                    </div>
                </div>
            </section>

            {/* 優勢介紹 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Award className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">優勢介紹</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Database className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">全面的CRUD操作</h3>
                            <p className="text-gray-300 leading-relaxed">
                                系統允許對單位和帳號資料進行<strong className="text-blue-400">新增、讀取、更新、刪除（CRUD）</strong>操作，確保管理者能夠靈活調整和管理系統中的所有單位及帳號資訊，方便及時維護。
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Settings className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">簡單直觀的操作介面</h3>
                            <p className="text-gray-300 leading-relaxed">
                                提供使用者友好的操作介面，無論是新增單位或帳號，還是更新現有資訊，都可以通過簡單的步驟完成，有效提升管理效率。
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">權限與安全控制</h3>
                            <p className="text-gray-300 leading-relaxed">
                                系統能夠針對每個帳號進行權限管理，確保不同角色只能存取相應的功能與資料，從而保障資料安全與系統的運行穩定。
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 靈活的單位與帳號管理 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <UserCheck className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">靈活的單位與帳號管理</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            無論是單位資料庫還是帳號資料庫，我們提供完整的CRUD操作，讓您輕鬆管理單位和帳號的基本資料，確保系統運作流暢無礙。
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/r02.png`}
                                alt="單位管理介面"
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">單位資料庫管理</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">新增、編輯、刪除單位資訊</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">批次管理多個單位</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">單位資料匯入匯出</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/r01.png`}
                                alt="帳號管理介面"
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">帳號資料庫管理</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">用戶帳號創建與維護</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">角色權限分配管理</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">帳號狀態監控與控制</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )

    // 舌頭訓練遊戲的詳細內容組件 (吞嚥)
    const TongueTrainerGameDetails = () => (
        <>
            {/* 產品主視覺 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <Target className="h-8 w-8 text-blue-400" />
                                <h2 className="text-3xl font-bold text-white">產品介紹</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                這款 APP 透過舌頭體感互動遊戲，幫助使用者提升<span className="text-blue-400 font-semibold">舌頭靈活度與吞嚥能力</span>，並提供即時回饋與進度追蹤。
                                結合影像辨識與壓力感測健舌器，讓訓練更安全、有趣、有效率。
                            </p>
                        </div>
                        <div>
                            <img
                                src={`${import.meta.env.BASE_URL}images/o10.png`}
                                alt="語言治療平台產品定位"
                                className="w-full h-80 object-cover rounded-2xl"
                                style={{ objectPosition: '50% 30%' }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 核心功能總覽 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Camera className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">核心功能總覽</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            結合影像辨識與壓力感測，打造完整的舌頭訓練體驗
                        </p>
                    </motion.div>

                    {/* 幻燈片展示 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[
                            'images/o01.png',
                            'images/o02.png',
                            'images/o03.png',
                            'images/o04.png'
                        ].map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}${image}`} // ✅ 自動加上 base 路徑
                                    alt={`手機介面展示 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        ))}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <Camera className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">舌頭體操互動訓練（影像辨識）</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                透過攝影機進行舌頭動作辨識，將訓練 gamify 化，使使用者在遊戲互動中完成舌頭靈活度訓練。系統即時判定動作完成度，並提供清晰的文字提示與得分基準。
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <TrendingUp className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">健舌器壓力感測訓練</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                結合健舌器的壓力感測功能，將舌壓訓練轉化為可量化的數值回饋。使用者可透過遊戲化操作提升舌肌力量，並即時看到壓力曲線、得分與完成度。
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 自動分析與後台系統 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <UserCheck className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">精準分析與後台整合</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            以資料為核心，協助追蹤訓練進展並優化決策
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/o05.png`}
                                alt="管理介面"
                                className="w-full h-96 object-cover rounded-2xl"
                                style={{ objectPosition: '50% 40%' }}
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">智能數據分析</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">動作辨識與分數評估</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">進度追蹤與趨勢圖</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">行為提示</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/o06.png`}
                                alt="圖表"
                                className="w-full h-96 object-cover rounded-2xl"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">後台管理</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">使用者資料管理</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">後台數據分析</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">前台進度追蹤與統計</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 教學與使用輔助 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Eye className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">教學與使用輔助</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            循序漸進的指導，隨時獲得操作幫助
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/o08.png`}
                                alt="示範教學"
                                className="w-full h-[390px] object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">示範教學</h3>
                                <p className="text-gray-300">提供完整的操作流程與示範，幫助使用者快速上手</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/o09.png`}
                                alt="互動提示"
                                className="w-full h-[390px] object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">互動提示</h3>
                                <p className="text-gray-300">在遊戲或訓練過程中，提供提示與建議，確保動作正確</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/o07.png`} alt="任務難易度調整"
                                className="w-full h-[390px] object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">任務難易度調整</h3>
                                <p className="text-gray-300">根據使用者能力，可調整訓練難度，讓訓練更有成效。</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )

    // 醫美互聯網無針注射技術核心介紹
    const IoTJetInjectDetails = () => (
        <>

            {/* 技術核心 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Globe2 className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">技術核心</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            超音速霧化直達真皮層
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* 左側圖片 */}
                        <div>
                            <img
                                src={`${import.meta.env.BASE_URL}images/za1.jpg`} alt="超音速霧化直達真皮層"
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* 右側文字面板 */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }} // 改成 x:30 往右進場
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <Globe2 className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">霧化技術</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    採用超音速氣流技術，將藥劑平均霧化至200 nm級微粒。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <MessageCircle className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">穿透真皮</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    微粒能無創穿透表皮，精準抵達真皮層，提升吸收效率與安全性。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <Target className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">無針安全</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    無針式注射，降低交叉感染風險。
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            { /*授權使用機制*/}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Brain className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">授權使用機制</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        <img
                            src={`${import.meta.env.BASE_URL}images/za4.jpg`}
                            alt="核心功能展示1"
                            className="w-full h-64 object-cover rounded-xl"
                        />
                        <img
                            src={`${import.meta.env.BASE_URL}images/za5.png`}
                            alt="核心功能展示2"
                            className="w-full h-64 object-cover rounded-xl"
                        />
                        <img
                            src={`${import.meta.env.BASE_URL}images/za6.jpg`}
                            alt="核心功能展示3"
                            className="w-full h-64 object-cover rounded-xl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <Mic className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">一次性 QRCODE 驗證</h3>
                            </div>
                            <p className="text-gray-300">每瓶藥劑皆附有一次性 QRCODE 驗證標籤。</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <Gamepad2 className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">裝置啟用次數</h3>
                            </div>
                            <p className="text-gray-300">掃描後可啟用裝置使用次數（預設 200 次）。</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <BookOpen className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">藥劑補充管理</h3>
                            </div>
                            <p className="text-gray-300">藥劑耗盡後，需重新購買並啟用新的藥劑瓶。</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <MessageCircle className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">使用安全保障</h3>
                            </div>
                            <p className="text-gray-300">防止未授權使用與偽造藥劑，保障品牌與使用安全。</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 雲端精準控制 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <UserCheck className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">雲端精準控制</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            每瓶藥劑專屬參數
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/za2.jpg`}
                                alt="智慧雲端校正介面"
                                className="w-full h-64 object-cover rounded-2xl"
                            />

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/za3.jpg`}
                                alt="精準施打"
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                        </motion.div>

                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6 mt-[40px]" // ← 這裡加上間距
                    >
                        <div className="bg-slate-800/50 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-4">智慧雲端校正</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                    <span className="text-gray-300">每種藥劑擁有不同的噴氣時間與流速曲線。</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                    <span className="text-gray-300">透過雲端下載對應參數，自動校正設備設定，確保最佳施打效果。</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                    <span className="text-gray-300">使用者無需人工調整，即插即用。</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 雲端整合功能 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Brain className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">雲端整合功能</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <TrendingUp className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">藍牙連線</h3>
                            <p className="text-gray-300">裝置即時同步資料至雲端。</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <Award className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">施打數據回傳</h3>
                            <p className="text-gray-300">提供施打量、次數與參數紀錄。</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <Users className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4"> 雲端參數下載</h3>
                            <p className="text-gray-300">自動更新每批藥劑的最佳噴射設定。</p>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* 使用者帳號管理系統 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <Target className="h-8 w-8 text-blue-400" />
                                <h2 className="text-3xl font-bold text-white">使用者帳號管理系統</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                每位使用者需透過<span className="text-blue-400 font-semibold">一次性 QRCODE</span>啟用藥劑，確保皆使用<span className="text-blue-400 font-semibold">正品藥劑</span>。
                                施打紀錄會即時上傳<span className="text-blue-400 font-semibold">雲端</span>，醫療單位可監控使用情況，並可透過<span className="text-blue-400 font-semibold">後端數據分析</span>進行使用趨勢統計與設備維護預測，確保安全與管理效率。
                            </p>
                        </div>
                        <div>
                            <img
                                src={`${import.meta.env.BASE_URL}images/za7.jpg`}
                                alt="語言治療平台產品定位"
                                className="w-full h-80 object-cover rounded-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )

    // 語言治療平台的詳細內容組件
    const LanguageTherapyDetails = () => (
        <>
            {/* 產品定位 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <Target className="h-8 w-8 text-blue-400" />
                                <h2 className="text-3xl font-bold text-white">產品定位</h2>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                一款結合<span className="text-blue-400 font-semibold">語言治療專業</span>與<span className="text-blue-400 font-semibold">遊戲化學習</span>的智能互動平台，專為語言發展緩慢的兒童打造，透過 AI 即時引導、遊戲互動與個別化追蹤，讓治療變得自然、有趣、有效。
                            </p>
                        </div>
                        <div>
                            <img
                                src={`${import.meta.env.BASE_URL}images/a01.jpg`}
                                alt="語言治療平台產品定位"
                                className="w-full h-80 object-cover rounded-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 核心模組功能 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Brain className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">核心模組功能</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        <img
                            src={`${import.meta.env.BASE_URL}images/b01.png`}
                            alt="核心功能展示1"
                            className="w-full h-64 object-cover rounded-xl"
                        />
                        <img
                            src={`${import.meta.env.BASE_URL}images/b02.png`}
                            alt="核心功能展示2"
                            className="w-full h-64 object-cover rounded-xl"
                        />
                        <img
                            src={`${import.meta.env.BASE_URL}images/b03.png`}
                            alt="核心功能展示3"
                            className="w-full h-64 object-cover rounded-xl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <Mic className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">訪說練習</h3>
                            </div>
                            <p className="text-gray-300">點選回答物件名稱，錯誤由 AI 引導，強化詞彙辨識與表達</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <Gamepad2 className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">圖卡拖曳</h3>
                            </div>
                            <p className="text-gray-300">拼句練習＋語音復述，像 KTV 導讀，結合 AI 發音評估與即時引導</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <BookOpen className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">繪本練習</h3>
                            </div>
                            <p className="text-gray-300">聽故事＋回答問題＋情境拖曳，培養語意理解與表達邏輯</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <MessageCircle className="h-6 w-6 text-blue-400" />
                                <h3 className="text-xl font-semibold text-white">對話練習</h3>
                            </div>
                            <p className="text-gray-300">與 NPC 透過麥克風對話，模擬真實社交情境，訓練語音交流能力</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* AI智能引導與獎勵機制 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Brain className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">AI智能引導與獎勵機制</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <TrendingUp className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">智能難度調整</h3>
                            <p className="text-gray-300">根據錯誤次數，自動啟用「加強模式」或提升為「嚴謹模式」</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <Award className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">遊戲化激勵</h3>
                            <p className="text-gray-300">表現良好可獲得金幣獎勵、解鎖物品與兌換功能</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <Users className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">家人陪伴角色</h3>
                            <p className="text-gray-300">提供語音鼓勵、互動提示，強化家庭參與</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 互動引導 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <MessageCircle className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">互動引導</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">即時回饋</h3>
                                <p className="text-gray-300">AI 能即時分析使用者的語音或操作，並給予肯定、修正或引導，提升學習效率。</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">理解與糾正</h3>
                                <p className="text-gray-300">針對使用者的語音回答進行辨識與分析，判斷是否清楚、正確，並透過語音或文字引導修正。</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-semibold text-white mb-4">自然語言互動</h3>
                                <p className="text-gray-300">使用者可以直接用語音與 AI 對話，讓學習過程更自然，貼近實際溝通情境。</p>
                            </motion.div>
                        </div>

                        <div className="space-y-4">
                            <img
                                src={`${import.meta.env.BASE_URL}images/d02.png`}
                                alt="互動引導介面"
                                className="w-full h-48 object-cover rounded-xl"
                            />
                            <img
                                src={`${import.meta.env.BASE_URL}images/d01.png`}
                                alt="語音互動功能"
                                className="w-full h-64 object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 沉浸式互動世界 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <Globe2 className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">沉浸式互動世界</h2>
                        </div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            結合 RPG 探索與語言訓練，強化真實語境中的語用能力
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* 左側圖片 */}
                        <div>
                            <img
                                src={`${import.meta.env.BASE_URL}images/c03.png`} alt="沉浸式互動世界"
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                            />
                        </div>

                        {/* 右側文字面板 */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }} // 改成 x:30 往右進場
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <Globe2 className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">自由探索</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    玩家可自由操控角色在地圖中探索、與 NPC 進行語音對話。透過角色扮演的方式，讓語言學習變得更加有趣和自然。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <MessageCircle className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">智能互動</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    NPC 會根據語音辨識結果回應，模擬真實語境（如點餐、購物、求助等）。每次對話都是個人化的學習體驗。
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="bg-slate-800/50 rounded-2xl p-8"
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <Target className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-xl font-semibold text-white">實境訓練</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    適合語言理解與口語表達訓練，提升臨場反應能力。透過遊戲化的情境模擬，讓孩子在玩樂中自然學習語言技能。
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 成長追蹤與語言能力分析 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <BarChart3 className="h-8 w-8 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">成長追蹤與語言能力分析</h2>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/h02.png`}
                                alt="語音與詞彙記錄"
                                className="w-full h-48 object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">語音與詞彙紀錄</h3>
                                <p className="text-gray-300">每筆練習都有記錄，AI 分析回答類型與準確度</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/h03.png`}
                                alt="成長曲線分析"
                                className="w-full h-48 object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">成長曲線</h3>
                                <p className="text-gray-300">可視化追蹤詞彙量、正確率與表現趨勢</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}images/h01.png`}
                                alt="線上複評系統"
                                className="w-full h-48 object-cover rounded-xl mb-6"
                            />
                            <div className="bg-slate-800/50 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">線上複評</h3>
                                <p className="text-gray-300">提供語言治療師後台審閱並調整課程建議</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* 學習保護與情緒維持 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <Shield className="h-8 w-8 text-blue-400" />
                                <h2 className="text-3xl font-bold text-white">學習保護與情緒維持</h2>
                            </div>

                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-800/50 rounded-xl p-6"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <Clock className="h-5 w-5 text-blue-400" />
                                        <h3 className="text-lg font-semibold text-white">學習節奏保護</h3>
                                    </div>
                                    <p className="text-gray-300">每半小時提醒休息，內建護眼提示</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-800/50 rounded-xl p-6"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <RefreshCw className="h-5 w-5 text-blue-400" />
                                        <h3 className="text-lg font-semibold text-white">智能切題機制</h3>
                                    </div>
                                    <p className="text-gray-300">同一題卡關過久會自動切換其他同難度題目，降低挫折</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-800/50 rounded-xl p-6"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <Eye className="h-5 w-5 text-blue-400" />
                                        <h3 className="text-lg font-semibold text-white">仁慈與嚴謹切換</h3>
                                    </div>
                                    <p className="text-gray-300">引導孩子從「鼓勵性成功」到「高標準練習」</p>
                                </motion.div>
                            </div>
                        </div>

                        <div>
                            <img
                                src={`${import.meta.env.BASE_URL}images/f01.png`}
                                alt="學習保護機制"
                                className="w-full h-96 object-cover rounded-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 一站式語言訓練解決方案 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">一站式語言訓練解決方案</h2>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            透過有趣的互動機制與個人化的語言治療流程，幫助孩子自然提升語言理解與表達能力。
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">家庭居家練習</h3>
                            <p className="text-gray-300">讓孩子在熟悉的環境中輕鬆學習，家長也能參與陪伴</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">教保老師輔助使用</h3>
                            <p className="text-gray-300">協助教育工作者提供更專業的語言發展支援</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Brain className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">語言治療師遠距複評</h3>
                            <p className="text-gray-300">專業治療師可遠距監控進度並調整治療計畫</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 效益分析 */}
            <section className="py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">效益分析</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">機構與師資</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">節省治療人力成本：由 AI 協助進行基礎練習與初步引導，減少專業師資一對一耗時</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">提升覆蓋率與訓練密度：孩子在家每天練習 60 分鐘，補強實體課程頻率不足問題</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">減輕教師負擔：自動記錄學習歷程與成效，老師/治療師無需重複人工整理紀錄</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">家長與孩子</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">治療過程更具參與感：家人可化身 AI 角色陪伴鼓勵，強化親子連結</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">學習動機提升：遊戲化機制讓孩子主動練習，避免抗拒感</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">即時補救薄弱項目：系統能即時偵測學習盲點，自動進入「加強模式」重複訓練</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">系統管理方</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">資料可量化：所有練習數據結構化儲存，可供後續評估、補助申報或研究使用</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-gray-300">可拓展性強：支援多場域、多角色（治療師／家長／孩子），也可連動後台審核與管理系統</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 臨床初步試驗 */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">臨床初步試驗</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8">試驗設計</h3>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">3-10y</div>
                                    <div className="text-gray-300">個案年齡</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">38人</div>
                                    <div className="text-gray-300">個案人數</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">8個</div>
                                    <div className="text-gray-300">醫療場域</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400 mb-2">18位</div>
                                    <div className="text-gray-300">語言治療師</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">介入時間</span>
                                    <span className="text-white">1個月</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">使用裝置</span>
                                    <span className="text-white">30台 iPad APP</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">練習頻率</span>
                                    <span className="text-white">1次/日 (30分)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">練習場域</span>
                                    <span className="text-white">居家、院所</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">訓練項目</span>
                                    <span className="text-white">仿說及圖卡</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">評量工具</span>
                                    <span className="text-white">語言能力評量表</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8">試驗結果</h3>

                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-500/20 rounded-full mb-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-400">64%</div>
                                        <div className="text-sm text-gray-300">進步比例</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-700/50 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-300">進步人數</span>
                                        <span className="text-2xl font-bold text-blue-400">20位</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '64%' }}></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                                        <span className="text-gray-300">口語表達能力提升</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-blue-400 rounded-full" />
                                        <span className="text-gray-300">語言理解能力增進</span>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed">
                                    經一個月初步可用性試驗，個案語言能力後測較前測進步共20位(約64%位)，在口語表達及語言理解皆有提升。
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )

    return (
        <div className="pt-16">
            {/* Header */}
            <section className="py-12 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>返回產品目錄</span>
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {project.title}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Project Images */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        <div className="space-y-6">
                            <img
                                src={`${import.meta.env.BASE_URL}${project.images[0]}`}
                                alt={`${project.title} - 主要圖片`}
                                className="w-full h-96 object-cover rounded-2xl"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {project.images.slice(1).map((image, index) => (
                                    <img
                                        key={index}
                                        src={`${import.meta.env.BASE_URL}${image}`}
                                        alt={`${project.title} - 圖片 ${index + 2}`}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Project Info */}
                        <div className="bg-slate-800/50 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">專案資訊</h2>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-blue-400" />
                                    <span className="text-gray-300">上市時間：{project.duration}</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Binoculars className="h-5 w-5 text-blue-400" />
                                    <span className="text-gray-300">核心功能：{project.coreFunc}</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Code className="h-5 w-5 text-blue-400" />
                                    <span className="text-gray-300">適用場景：{project.sceneAlert}</span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                                        <Zap className="h-5 w-5 text-blue-400" />
                                        <span>智能技術</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.coreFeatures.map((coreFeatures, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30"
                                            >
                                                {coreFeatures}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/*<div className="flex space-x-4 pt-4">*/}
                                {/*    <a*/}
                                {/*        href={project.demoUrl}*/}
                                {/*        className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"*/}
                                {/*    >*/}
                                {/*        <ExternalLink className="h-4 w-4" />*/}
                                {/*        <span>查看演示</span>*/}
                                {/*    </a>*/}
                                {/*    <a*/}
                                {/*        href={project.githubUrl}*/}
                                {/*        className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"*/}
                                {/*    >*/}
                                {/*        <Github className="h-4 w-4" />*/}
                                {/*        <span>查看程式碼</span>*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 根據專案類型顯示不同內容 */}
            {project.isOralHealthApp ?
                (<OralHealthAppDetails />)

                : project.isLanguageTherapy ?
                    (<LanguageTherapyDetails />)

                    : project.isTongueTrainerGame ?
                        (<TongueTrainerGameDetails />)

                        : project.isIoTJetInject ?
                            (<IoTJetInjectDetails />)

                            : (
                                <>
                                    {/* Project Description */}
                                    <section className="py-12 bg-slate-800/30">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8 }}
                                                viewport={{ once: true }}
                                                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                                            >
                                                <div>
                                                    <h2 className="text-3xl font-bold text-white mb-6">專案概述</h2>
                                                    <p className="text-gray-300 leading-relaxed text-lg">
                                                        {project.fullDescription}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h2 className="text-3xl font-bold text-white mb-6">主要功能</h2>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {project.features.map((feature, index) => (
                                                            <motion.div
                                                                key={index}
                                                                initial={{ opacity: 0, x: 20 }}
                                                                whileInView={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                                viewport={{ once: true }}
                                                                className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl"
                                                            >
                                                                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                                                                <span className="text-gray-300">{feature}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </section>
                                </>
                            )}

            {/* Related Projects */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">相關專案</h2>
                        <p className="text-gray-300">探索更多我們的優秀作品</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects
                            .filter(p => p.id !== project.id && p.category === project.category)
                            .slice(0, 3)
                            .map((relatedProject, index) => (
                                <motion.div
                                    key={relatedProject.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        to={`/portfolio/${relatedProject.id}`}
                                        onClick={handleRelatedProjectClick}
                                        className="group block bg-slate-800/50 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                                    >
                                        <img
                                            src={`${import.meta.env.BASE_URL}${relatedProject.images[0]}`}
                                            alt={relatedProject.title}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                                {relatedProject.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm">
                                                {relatedProject.description}
                                            </p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProjectDetail
