<script setup lang="ts">
import { ArrowUpRight, ArrowUp } from 'lucide-vue-next'
import { navigation, contact } from '../data/site'
const logoUrl = `${import.meta.env.BASE_URL}icons/square-terminal_w.png`
const top = () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
</script>
<template>
  <footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand"><RouterLink to="/" class="brand" aria-label="醇邁，回首頁"><img :src="logoUrl" class="brand-logo" alt="" width="80" height="38" /><span class="brand-name">醇邁<span>DRAGON MILE</span></span></RouterLink><p>專業的軟體開發團隊，致力於為客戶提供創新、高品質的軟體解決方案。從網站開發到企業系統，我們都能為您量身打造。</p></div>
      <div><p class="eyebrow">EXPLORE / 快速連結</p><nav aria-label="頁尾導覽"><RouterLink v-for="item in navigation" :key="item.path" :to="item.path">{{ item.label }}</RouterLink></nav></div>
      <div class="footer-contact"><p class="eyebrow">GET IN TOUCH / 聯絡資訊</p><a :href="`mailto:${contact.email}`">{{ contact.email }}<ArrowUpRight :size="15" /></a><a :href="contact.phoneHref">{{ contact.phone }}</a><a :href="contact.mapUrl" target="_blank" rel="noopener noreferrer">{{ contact.address }}</a><span>{{ contact.hours }}</span></div>
    </div>
    <div class="shell footer-bottom"><span>© {{ new Date().getFullYear() }} 醇邁有限公司．保留所有權利</span><span class="footer-note">讓科技回歸簡單，讓使用變得自然。</span><button @click="top" aria-label="回到頁面頂端">BACK TO TOP <ArrowUp :size="14" /></button></div>
  </footer>
</template>
