<script setup lang="ts">
import { computed, ref, watch, watchEffect, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X, Expand, Check } from 'lucide-vue-next'
import { useEventListener, useScrollLock } from '@vueuse/core'
import { products, categoryName } from '../data/site'
import { useReveal } from '../composables/useReveal'
import ProductCard from '../components/ProductCard.vue'
import ContactCTA from '../components/ContactCTA.vue'
const route = useRoute()
const root = ref<HTMLElement | null>(null)
useReveal(root)
const product = computed(() => products.find(p => String(p.id) === route.params.id))
const selected = ref(0)
const zoom = ref(false)
const dialog = ref<HTMLDialogElement | null>(null)
const locked = useScrollLock(document.body)
const gallery = computed(() => product.value?.images ?? [])
const related = computed(() => products.filter(p => p.id !== product.value?.id).slice(0, 2))
const change = (dir: number) => { selected.value = (selected.value + dir + gallery.value.length) % gallery.value.length }
watchEffect(() => { if (product.value) document.title = `${product.value.title}｜醇邁` })
const openZoom = () => { zoom.value = true; locked.value = true; dialog.value?.showModal() }
const closeZoom = () => { zoom.value = false; locked.value = false; dialog.value?.close() }
watch(() => product.value?.id, () => { selected.value = 0; closeZoom() })
onBeforeUnmount(() => { locked.value = false; dialog.value?.close() })
useEventListener('keydown', (e: KeyboardEvent) => { if (!zoom.value) return; if (e.key === 'ArrowLeft') change(-1); if (e.key === 'ArrowRight') change(1) })
</script>
<template><div ref="root">
  <template v-if="product">
    <section class="project-intro shell"><RouterLink to="/portfolio" class="text-link"><ArrowLeft :size="17" />返回產品目錄</RouterLink><div class="intro-top"><p class="eyebrow">{{ categoryName(product.category) }} / PRODUCT</p><span class="mono">0{{ product.id }}</span></div><h1>{{ product.title }}<span class="title-dot">.</span></h1><p>{{ product.description }}</p></section>
    <section class="shell project-gallery"><div class="main-project-image"><img :src="`/${gallery[selected]}`" :alt="`${product.title} — 畫面 ${selected + 1}`" width="1200" height="800" /><button @click="openZoom" class="expand-button" aria-label="放大產品圖片"><Expand :size="20" /></button><div class="gallery-arrows"><button @click="change(-1)" aria-label="上一張產品圖片"><ChevronLeft :size="20" /></button><span class="mono">{{ String(selected + 1).padStart(2, '0') }} / {{ String(gallery.length).padStart(2, '0') }}</span><button @click="change(1)" aria-label="下一張產品圖片"><ChevronRight :size="20" /></button></div></div><div class="gallery-thumbnails"><button v-for="(image, i) in gallery" :key="image" :class="{ selected: i === selected }" :aria-label="`顯示第 ${i + 1} 張圖片`" :aria-pressed="i === selected" @click="selected = i"><img :src="`/${image}`" alt="" loading="lazy" width="160" height="100" /></button></div></section>
    <section class="section"><div class="shell project-overview"><aside><p class="eyebrow">PROJECT OVERVIEW</p><h2>產品概述</h2><dl><dt>核心功能</dt><dd>{{ product.coreFunc }}</dd><dt>應用場景</dt><dd>{{ product.sceneAlert }}</dd></dl><RouterLink :to="{ path: '/contact', query: { service: product.title } }" class="text-link">洽詢產品<ArrowUpRight :size="18" /></RouterLink></aside><div><p class="project-description">{{ product.fullDescription }}</p><h3>核心特色</h3><ul class="core-features"><li v-for="feature in product.coreFeatures" :key="feature"><Check :size="18" />{{ feature }}</li></ul><div class="detail-blocks"><template v-for="block in product.sections" :key="block.text"><div v-if="block.tag === 'gallery'" class="detail-image-grid"><img v-for="image in block.images" :key="image" :src="'/' + image" :alt="product.title + ' — 產品畫面'" loading="lazy" /></div><figure v-else-if="block.tag === 'figure' || block.tag === 'portrait'" class="detail-product-figure" :class="{ portrait: block.tag === 'portrait' }"><button v-for="image in block.images" :key="image" :aria-label="`放大圖片：${block.text}`" @click="selected = gallery.indexOf(image); openZoom()"><img :src="'/' + image" :alt="block.text" loading="lazy" /></button><figcaption>{{ block.text }}</figcaption></figure><component v-else :is="block.tag" :class="{ 'detail-section-title': block.tag === 'h2' }">{{ block.text }}</component></template></div></div></div></section>
    <section class="section tinted"><div class="shell"><div class="section-heading"><div><p class="eyebrow">EXPLORE MORE</p><h2>更多產品<span class="title-dot">.</span></h2></div><RouterLink to="/portfolio" class="text-link">所有產品<ArrowUpRight :size="18" /></RouterLink></div><div class="product-grid"><ProductCard v-for="item in related" :key="item.id" :product="item" /></div></div></section>
    <ContactCTA />
    <dialog ref="dialog" class="lightbox" @cancel.prevent="closeZoom" @click="($event.target === dialog) && closeZoom()"><button class="lightbox-close" @click="closeZoom" aria-label="關閉圖片"><X /></button><button class="lightbox-prev" @click="change(-1)" aria-label="上一張"><ChevronLeft /></button><img :src="`/${gallery[selected]}`" :alt="product.title" /><button class="lightbox-next" @click="change(1)" aria-label="下一張"><ChevronRight /></button></dialog>
  </template>
  <section v-else class="shell not-found"><p class="eyebrow">PRODUCT NOT FOUND</p><h1>專案未找到<span class="title-dot">.</span></h1><RouterLink to="/portfolio" class="button button-primary">返回產品目錄<ArrowLeft :size="18" /></RouterLink></section>
</div></template>

<style scoped>
.gallery-thumbnails { overflow-x: auto; padding-bottom: 8px; }
.gallery-thumbnails button { flex-shrink: 0; }
.project-overview > div { min-width: 0; }
.detail-product-figure { margin: 25px 0 35px; }
.detail-product-figure button { display: block; width: 100%; padding: 16px; border: 1px solid var(--line); background: #edf1eb; cursor: zoom-in; }
.detail-product-figure img { display: block; width: 100%; height: auto; }
.detail-product-figure.portrait img { height: 440px; object-fit: contain; }
.detail-product-figure figcaption { margin-top: 12px; font-size: 18px; line-height: 1.8; color: var(--muted); }
@media (max-width: 700px) {
  .detail-product-figure button { padding: 12px; }
  .detail-product-figure.portrait img { height: 400px; }
}
</style>
