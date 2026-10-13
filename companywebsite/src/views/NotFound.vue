<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>
<template><section class="shell not-found"><p class="eyebrow">404 / PAGE NOT FOUND</p><h1>找不到這個頁面<span class="title-dot">.</span></h1><p>您可以返回首頁，繼續探索醇邁的服務與產品。</p><RouterLink to="/" class="button button-primary"><ArrowLeft :size="18" />返回首頁</RouterLink></section></template>
