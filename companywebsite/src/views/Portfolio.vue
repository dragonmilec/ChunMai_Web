<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { motion, AnimatePresence } from 'motion-v'
import { products, categories } from '../data/site'
import { useReveal } from '../composables/useReveal'
import PageIntro from '../components/PageIntro.vue'
import ProductCard from '../components/ProductCard.vue'
import ContactCTA from '../components/ContactCTA.vue'
const root = ref<HTMLElement | null>(null)
const { reduced } = useReveal(root)
const route = useRoute(), router = useRouter()
const active = computed(() => categories.some(c => c.id === route.query.category) ? String(route.query.category) : 'all')
const filtered = computed(() => products.filter(p => active.value === 'all' || p.category === active.value))
const filter = (id: string) => router.replace({ query: id === 'all' ? {} : { category: id } })
</script>
<template><div ref="root">
  <PageIntro label="OUR PRODUCTS" title="我們的產品" description="探索我們為客戶打造的創新軟體解決方案。" number="03" />
  <section class="section portfolio-section"><div class="shell"><div class="filter-bar"><div class="filter-buttons" aria-label="依產品類別篩選"><button v-for="category in categories" :key="category.id" :class="{ selected: active === category.id }" :aria-pressed="active === category.id" @click="filter(category.id)">{{ category.label }}<span>{{ category.id === 'all' ? products.length : products.filter(p => p.category === category.id).length }}</span></button></div><span class="mono filter-result" aria-live="polite">{{ String(filtered.length).padStart(2, '0') }} PRODUCTS</span></div><AnimatePresence mode="wait"><motion.div :key="active" class="product-grid portfolio-grid" :initial="reduced === 'reduce' ? false : { opacity: 0, y: 12 }" :animate="{ opacity: 1, y: 0 }" :exit="{ opacity: 0 }" :transition="{ duration: reduced === 'reduce' ? 0 : .25 }"><ProductCard v-for="product in filtered" :key="product.id" :product="product" /></motion.div></AnimatePresence></div></section>
  <ContactCTA />
</div></template>
