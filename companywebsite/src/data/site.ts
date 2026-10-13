import content from './content.json'

export const services = content.services
export const products = content.products
export const navigation = [
  { label: '首頁', path: '/' },
  { label: '關於我們', path: '/about' },
  { label: '服務項目', path: '/services' },
  { label: '產品目錄', path: '/portfolio' },
  { label: '聯絡我們', path: '/contact' },
]
export const categories = [
  { id: 'all', label: '全部產品' },
  { id: 'web', label: '網站開發' },
  { id: 'mobile', label: '行動應用' },
  { id: 'iot', label: '物聯網' },
]
export const categoryName = (id: string) => categories.find(c => c.id === id)?.label ?? id
export const contact = {
  email: 'anthony.liau@dragon-mile.com',
  phone: '+07 552-3561',
  phoneHref: 'tel:+88675523561',
  address: '804高雄市鼓山區明華路251號10樓1010室',
  hours: '週一至週五 9:00–18:00',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('高雄市鼓山區明華路251號'),
}
// Same editorial photograph used on the published homepage; not a company team photograph.
export const teamImage = '/images/team-collaboration.jpg'
export const values = [
  { title: '創新思維', description: '持續探索最新技術，為客戶提供前瞻性的解決方案' },
  { title: '用戶至上', description: '以用戶體驗為核心，設計直觀易用的軟體產品' },
  { title: '品質保證', description: '嚴格的品質控制流程，確保每個項目都達到最高標準' },
]
export const features = [
  { title: '客製化開發', description: '根據您的需求量身打造專屬軟體解決方案' },
  { title: '高效能', description: '採用最新技術架構，確保系統運行快速穩定' },
  { title: '安全可靠', description: '嚴格的安全標準，保護您的數據和隱私' },
  { title: '專業團隊', description: '經驗豐富的開發團隊，提供全方位技術支援' },
]
export const processSteps = [
  { title: '需求分析', description: '深入了解您的業務需求和目標，制定最適合的解決方案' },
  { title: '方案設計', description: '設計系統架構和用戶介面，確保符合您的期望' },
  { title: '開發實作', description: '採用敏捷開發方式，定期交付可運行的軟體版本' },
  { title: '測試部署', description: '全面測試確保品質，協助部署到生產環境' },
  { title: '維護支援', description: '提供持續的技術支援和系統維護服務' },
]
