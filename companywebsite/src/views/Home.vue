<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDocumentVisibility, useElementHover, useElementVisibility, useFocusWithin, useIntervalFn } from '@vueuse/core'
import { motion, AnimatePresence } from 'motion-v'
import { ArrowRight, ArrowUpRight, ArrowDown, ChevronLeft, ChevronRight, Code2, Zap, ShieldCheck, Users, Plus, Pause, Play } from 'lucide-vue-next'
import { services, products, features } from '../data/site'
import { useReveal } from '../composables/useReveal'
import ProductCard from '../components/ProductCard.vue'
import ContactCTA from '../components/ContactCTA.vue'
import InteractiveSphere from '../components/InteractiveSphere.vue'

const root = ref<HTMLElement | null>(null)
const { reduced } = useReveal(root)
const icons = [Code2, Zap, ShieldCheck, Users]
const current = ref(0)
const featuredSection = ref<HTMLElement | null>(null)
const playing = ref(true)
const hovering = useElementHover(featuredSection)
const { focused } = useFocusWithin(featuredSection)
const visible = useElementVisibility(featuredSection)
const documentVisibility = useDocumentVisibility()
const ordered = [products[3]!, products[1]!, products[0]!, products[2]!]
const featured = computed(() => [ordered[current.value]!, ordered[(current.value + 1) % ordered.length]!])
const autoplay = computed(() => playing.value && reduced.value !== 'reduce')
const advance = (direction: number) => { current.value = (current.value + direction + ordered.length) % ordered.length }
const { resume: resetTimer } = useIntervalFn(() => {
  if (autoplay.value && visible.value && documentVisibility.value === 'visible' && !hovering.value && !focused.value) advance(1)
}, 5000)
const move = (direction: number) => { advance(direction); resetTimer() }
const togglePlayback = () => { playing.value = !playing.value; resetTimer() }
const toServices = () => document.getElementById('services-preview')?.scrollIntoView({ behavior: reduced.value === 'reduce' ? 'instant' : 'smooth' })
</script>
<template>
  <div ref="root">
    <div class="home-sphere-flow">
    <section class="home-hero sphere-hero">
      <div class="shell hero-layout sphere-hero__layout">
        <div class="hero-copy">
          <motion.div class="eyebrow hero-eyebrow" :initial="reduced === 'reduce' ? false : { opacity: 0, y: 12 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .6 }"><span class="small-line"></span>專業軟體解決方案<span class="hero-edition mono">CHUN MILE</span></motion.div>
          <motion.h1 :initial="reduced === 'reduce' ? false : { opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .8, delay: .08 }">打造<span class="hero-line">卓越數位體驗<span class="title-dot">.</span></span><span class="hero-final">驅動企業成長</span></motion.h1>
          <motion.p class="hero-description" :initial="reduced === 'reduce' ? false : { opacity: 0, y: 16 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .7, delay: .2 }">從網站到企業系統，我們專注於打造實用、可靠的軟體，<br class="desktop-break" />幫助您提升業務效能，實現數位轉型目標。</motion.p>
          <div class="hero-actions"><RouterLink to="/contact" class="button button-primary">立即諮詢<ArrowUpRight :size="18" /></RouterLink><RouterLink to="/portfolio" class="text-link">查看案例<ArrowRight :size="18" /></RouterLink></div>
          <button class="hero-scroll" @click="toServices"><span class="scroll-circle"><ArrowDown :size="16" /></span><span>探索我們的服務<span class="mono">SCROLL TO EXPLORE</span></span></button>
        </div>
        <div class="sphere-hero__visual">
          <div class="sphere-stage-label"><span class="mono">INTERACTIVE EXPLORATION</span><Plus :size="16" :stroke-width="1" /></div>
          <InteractiveSphere />
          <span class="sphere-coordinate mono">CHUN MILE / PARTICLE FIELD</span>
        </div>
      </div>
    </section>
    <div class="sphere-readable-region">
      <div class="shell hero-baseline"><span>以技術實現想法，以設計連結使用者。</span><span class="mono">THOUGHTFUL SOLUTIONS. REAL IMPACT.</span><Plus :size="14" /></div>
    <section ref="featuredSection" class="section featured-section home-content-two" data-sphere-content="2">
      <div class="shell">
        <div class="section-heading" data-reveal><div><p class="eyebrow"><span class="section-number">01</span>SELECTED PRODUCTS</p><h2>讓想法，成為實際應用<span class="title-dot">.</span></h2></div><RouterLink to="/portfolio" class="text-link">瀏覽所有產品<ArrowUpRight :size="18" /></RouterLink></div>
        <div class="featured-controls"><span>探索我們為客戶打造的創新解決方案</span><div class="carousel-controls"><span class="mono">{{ String(current + 1).padStart(2, '0') }} <span class="muted">/ {{ String(ordered.length).padStart(2, '0') }}</span></span><button v-if="reduced !== 'reduce'" @click="togglePlayback" :aria-label="playing ? '暫停產品輪播' : '播放產品輪播'"><component :is="playing ? Pause : Play" :size="18" /></button><button @click="move(-1)" aria-label="上一組產品"><ChevronLeft :size="18" /></button><button @click="move(1)" aria-label="下一組產品"><ChevronRight :size="18" /></button></div></div>
        <div class="featured-products" aria-roledescription="carousel" aria-label="產品展示"><AnimatePresence mode="wait"><motion.div :key="current" class="product-grid" :initial="reduced === 'reduce' ? false : { opacity: 0, y: 12 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0 }" :transition="{ duration: reduced === 'reduce' ? 0 : .25 }"><ProductCard v-for="product in featured" :key="product.id" :product="product" /></motion.div></AnimatePresence></div>
        <span class="sr-only" :aria-live="autoplay && !hovering && !focused ? 'off' : 'polite'">顯示 {{ featured.map(p => p.title).join('、') }}</span>
      </div>
    </section>
    </div>
    </div>

    <section id="services-preview" class="section services-preview">
      <div class="shell services-layout">
        <div class="section-copy" data-reveal><p class="eyebrow"><span class="section-number">02</span>OUR SERVICES</p><h2>從需求出發，<br />打造適合您的解決方案<span class="title-dot">.</span></h2><p>提供全方位的軟體開發服務，從概念到實現，我們都能為您提供專業支援。</p><RouterLink to="/services" class="text-link">探索服務項目<ArrowUpRight :size="18" /></RouterLink><div class="service-line-art" aria-hidden="true"><span></span><span></span><span></span><Plus :size="20" :stroke-width="1" /></div></div>
        <div class="service-list" data-reveal><RouterLink v-for="(service, i) in services" :key="service.title" :to="`/services#service-${i}`" class="service-row"><span class="mono row-number">0{{ i + 1 }}</span><div><h3>{{ service.title }}</h3><p>{{ service.description }}</p></div><ArrowUpRight :size="21" :stroke-width="1.5" /></RouterLink></div>
      </div>
    </section>

    <section class="section about-preview"><div class="shell about-layout"><div data-reveal><p class="eyebrow"><span class="section-number">03</span>ABOUT CHUN MILE</p><h2>讓科技回歸簡單，<br />讓使用變得自然<span class="title-dot">.</span></h2><p>我們想打造能真正解決問題的產品。從第一個原型到如今的完整平台，每一步都來自我們對「更好使用體驗」的執著。</p><RouterLink to="/about" class="text-link">認識醇邁<ArrowUpRight :size="18" /></RouterLink></div><div class="feature-grid"><div v-for="(feature, i) in features" :key="feature.title" class="feature-item" data-reveal><component :is="icons[i]" :size="25" :stroke-width="1.4" /><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p></div></div></div></section>
    <ContactCTA />
  </div>
</template>
