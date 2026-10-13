<script setup lang="ts">
import { ref } from 'vue'
import { Lightbulb, Heart, ShieldCheck, ArrowUpRight } from 'lucide-vue-next'
import { values, teamImage } from '../data/site'
import { useReveal } from '../composables/useReveal'
import PageIntro from '../components/PageIntro.vue'
import ContactCTA from '../components/ContactCTA.vue'
const root = ref<HTMLElement | null>(null)
useReveal(root)
const icons = [Lightbulb, Heart, ShieldCheck]
</script>
<template><div ref="root">
  <PageIntro label="ABOUT DRAGON MILE" title="關於醇邁" description="我們是一支充滿熱忱的專業團隊，致力於為客戶打造最優質的軟體解決方案。" />
  <section class="section"><div class="shell story-layout"><div data-reveal><p class="eyebrow">OUR STORY / 我們的故事</p><h2>讓科技回歸簡單，<br />讓使用變得自然<span class="title-dot">.</span></h2><p>我們想打造能真正解決問題的產品——讓科技回歸簡單、讓使用變得自然。</p><p>從第一個原型到如今的完整平台，每一步都來自我們對「更好使用體驗」的執著。</p><RouterLink to="/services" class="text-link">了解我們的服務<ArrowUpRight :size="18" /></RouterLink></div><figure class="story-image" data-reveal><img :src="teamImage" alt="軟體開發與團隊協作情境照片" width="1000" height="800" /><figcaption class="mono">FROM IDEAS TO MEANINGFUL EXPERIENCES.</figcaption></figure></div></section>
  <section class="section tinted"><div class="shell"><div class="section-heading" data-reveal><div><p class="eyebrow">OUR VALUES</p><h2>我們的核心價值<span class="title-dot">.</span></h2></div><p>這些價值觀指導著我們的<br />每一個決策和行動。</p></div><div class="value-grid"><article v-for="(value, i) in values" :key="value.title" data-reveal><div class="flex justify-between"><component :is="icons[i]" :size="29" :stroke-width="1.3" /><span class="mono muted">0{{ i + 1 }}</span></div><h3>{{ value.title }}</h3><p>{{ value.description }}</p></article></div></div></section>
  <section class="section"><div class="shell team-note" data-reveal><p class="eyebrow">OUR TEAM</p><h2>專業團隊</h2><p>我們的團隊由經驗豐富的專業人士組成。</p></div></section>
  <ContactCTA />
</div></template>
