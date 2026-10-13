<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { categoryName, type products } from '../data/site'
defineProps<{ product: (typeof products)[number]; index?: number }>()
</script>
<template>
  <RouterLink :to="`/portfolio/${product.id}`" class="product-card">
    <div class="product-image" :class="`product-image-${product.id}`"><img :src="`/${product.image}`" :alt="product.title" loading="lazy" width="800" height="600" /><span class="image-index mono">0{{ index !== undefined ? index + 1 : product.id }} / PROJECT</span><span class="image-arrow"><ArrowUpRight :size="23" :stroke-width="1.5" /></span></div>
    <div class="product-meta"><span>{{ categoryName(product.category) }}</span><span class="mono">DRAGON MILE</span></div><h3>{{ product.title }}</h3><p>{{ product.description }}</p>
  </RouterLink>
</template>
