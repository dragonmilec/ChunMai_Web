<script setup lang="ts">
import { ref } from 'vue'
import { Code2, Smartphone, Database, Cloud, PenTool, ShieldCheck, Stethoscope, ArrowUpRight, Zap, Users } from 'lucide-vue-next'
import { services, processSteps } from '../data/site'
import { useReveal } from '../composables/useReveal'
import PageIntro from '../components/PageIntro.vue'
import ContactCTA from '../components/ContactCTA.vue'
const root = ref<HTMLElement | null>(null)
useReveal(root)
const icons = [Code2, Smartphone, Database, Cloud, PenTool, ShieldCheck, Stethoscope]
const benefits = [
  { icon: Zap, title: '快速交付', description: '採用敏捷開發流程，快速響應需求變更' },
  { icon: Users, title: '專業團隊', description: '經驗豐富的開發團隊，提供專業技術諮詢' },
  { icon: ShieldCheck, title: '品質保證', description: '嚴格的品質控制流程，確保交付高品質產品' },
]
</script>
<template><div ref="root">
  <PageIntro label="OUR SERVICES" title="我們的服務項目" description="提供全方位的軟體開發服務，從概念到實現，我們都能為您提供專業支援。" number="02" />
  <section class="section"><div class="shell service-details"><article v-for="(service, i) in services" :id="`service-${i}`" :key="service.title" class="service-detail" data-reveal><div class="service-detail-label"><span class="mono">0{{ i + 1 }}</span><component :is="icons[i]" :size="30" :stroke-width="1.3" /></div><div><h2>{{ service.title }}</h2><p>{{ service.description }}</p></div><ul><li v-for="feature in service.features" :key="feature"><span class="list-dot"></span>{{ feature }}</li></ul><RouterLink :to="{ path: '/contact', query: { service: service.title } }" class="circle-link" :aria-label="`諮詢${service.title}`"><ArrowUpRight :size="22" /></RouterLink></article></div></section>
  <section class="section tinted"><div class="shell"><div class="section-heading" data-reveal><div><p class="eyebrow">OUR PROCESS</p><h2>每一步，都有清楚的方向<span class="title-dot">.</span></h2></div><p>我們採用標準化的開發流程，<br />確保專案順利進行。</p></div><div class="process-grid"><article v-for="(step, i) in processSteps" :key="step.title" data-reveal><span class="process-number mono">0{{ i + 1 }}<ArrowUpRight :size="18" /></span><h3>{{ step.title }}</h3><p>{{ step.description }}</p></article></div></div></section>
  <section class="section"><div class="shell"><p class="eyebrow">WHY DRAGON MILE</p><h2 class="mb-12">為什麼選擇我們<span class="title-dot">.</span></h2><div class="value-grid"><article v-for="benefit in benefits" :key="benefit.title" data-reveal><component :is="benefit.icon" :size="28" :stroke-width="1.4" /><h3>{{ benefit.title }}</h3><p>{{ benefit.description }}</p></article></div></div></section>
  <ContactCTA />
</div></template>
