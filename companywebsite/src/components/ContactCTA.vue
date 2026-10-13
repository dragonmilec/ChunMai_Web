<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import DotWaveBackground from './DotWaveBackground.vue'
</script>
<template>
  <section class="contact-cta"><DotWaveBackground /><div class="shell cta-inner"><div><p class="eyebrow">LET’S TALK</p><h2>準備開始您的專案了嗎？</h2><p>讓我們一起討論您的需求，為您打造最適合的解決方案。</p></div><RouterLink to="/contact" class="cta-link">立即諮詢<span><ArrowUpRight :size="26" :stroke-width="1.5" /></span></RouterLink></div></section>
</template>
