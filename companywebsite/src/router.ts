import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home, meta: { title: '專業軟體解決方案' } },
    { path: '/about', component: () => import('./views/About.vue'), meta: { title: '關於我們' } },
    { path: '/services', component: () => import('./views/Services.vue'), meta: { title: '服務項目' } },
    { path: '/portfolio', component: () => import('./views/Portfolio.vue'), meta: { title: '產品目錄' } },
    { path: '/portfolio/:id', component: () => import('./views/ProjectDetail.vue'), meta: { title: '產品介紹' } },
    { path: '/contact', component: () => import('./views/Contact.vue'), meta: { title: '聯絡我們' } },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFound.vue'), meta: { title: '找不到頁面' } },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 100 }
    return { top: 0, behavior: 'instant' }
  },
})
router.afterEach(to => {
  document.title = `${to.meta.title}｜醇邁`
})
