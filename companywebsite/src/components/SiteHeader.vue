<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener, useScroll, useScrollLock, useMediaQuery } from '@vueuse/core'
import { Menu, X, ArrowUpRight } from 'lucide-vue-next'
import { navigation } from '../data/site'

const route = useRoute()
const logoUrl = `${import.meta.env.BASE_URL}icons/square-terminal_w.png`
const open = ref(false)
const menu = ref<HTMLElement | null>(null)
const toggle = ref<HTMLButtonElement | null>(null)
const { y } = useScroll(window)
const scrolled = computed(() => y.value > 24)
const locked = useScrollLock(document.body)
const desktop = useMediaQuery('(min-width: 961px)')
watch(desktop, value => { if (value) open.value = false })
// Keep focus within the mobile navigation without adding another dependency.
useEventListener('keydown', (event: KeyboardEvent) => {
  if (!open.value) return
  if (event.key === 'Escape') { open.value = false; toggle.value?.focus() }
  if (event.key === 'Tab') {
    const items = [toggle.value, ...Array.from(menu.value?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[]
    const first = items[0], last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }
})
watch(open, async value => { locked.value = value; if (value) { await nextTick(); menu.value?.querySelector('a')?.focus() } })
watch(() => route.fullPath, () => { open.value = false })
const active = (path: string) => path === '/' ? route.path === '/' : route.path.startsWith(path)
</script>

<template>
  <header class="site-header" :class="{ scrolled, 'menu-open': open }">
    <div class="shell header-inner">
      <RouterLink to="/" class="brand" aria-label="醇邁，回首頁">
        <img :src="logoUrl" class="brand-logo" alt="" width="80" height="38" />
        <span class="brand-name">醇邁<span>CHUN MILE</span></span>
      </RouterLink>
      <nav class="desktop-nav" aria-label="主要導覽">
        <RouterLink v-for="item in navigation.slice(0, 4)" :key="item.path" :to="item.path" :class="{ active: active(item.path) }" :aria-current="active(item.path) ? 'page' : undefined">{{ item.label }}</RouterLink>
      </nav>
      <RouterLink to="/contact" class="header-cta">聯絡我們 <ArrowUpRight :size="16" /></RouterLink>
      <button ref="toggle" class="mobile-toggle" :aria-expanded="open" aria-controls="mobile-menu" :aria-label="open ? '關閉選單' : '開啟選單'" @click="open = !open"><X v-if="open" /><Menu v-else /></button>
    </div>
    <Transition name="menu">
      <nav v-if="open" id="mobile-menu" ref="menu" class="mobile-nav" aria-label="行動版導覽" data-lenis-prevent>
        <RouterLink v-for="(item, i) in navigation" :key="item.path" :to="item.path" :aria-current="active(item.path) ? 'page' : undefined"><span class="mono">0{{ i + 1 }}</span>{{ item.label }}<ArrowUpRight :size="24" /></RouterLink>
        <p class="eyebrow">CHUN MILE · 專業軟體解決方案</p>
      </nav>
    </Transition>
  </header>
</template>
