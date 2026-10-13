<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

const reduced = usePreferredReducedMotion()
const route = useRoute()
let lenis: Lenis | undefined
const tick = (time: number) => lenis?.raf(time * 1000)
function setupScroll() {
  lenis?.destroy()
  lenis = undefined
  gsap.ticker.remove(tick)
  if (reduced.value === 'reduce') return
  lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -100 } })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
}
onMounted(setupScroll)
watch(reduced, setupScroll)
watch(() => route.path, () => { lenis?.scrollTo(0, { immediate: true }) })
onBeforeUnmount(() => { gsap.ticker.remove(tick); lenis?.destroy() })
</script>
<template>
  <a href="#main-content" class="skip-link">跳至主要內容</a>
  <SiteHeader />
  <main id="main-content" tabindex="-1"><RouterView v-slot="{ Component }"><component :is="Component" :key="$route.path" /></RouterView></main>
  <SiteFooter />
</template>
