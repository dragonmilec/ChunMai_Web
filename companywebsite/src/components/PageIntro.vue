<script setup lang="ts">
import DotWaveBackground from './DotWaveBackground.vue'
defineProps<{ label: string; title: string; description: string; number?: string }>()
</script>
<template><section class="page-intro"><DotWaveBackground /><div class="shell"><div class="intro-top"><p class="eyebrow">{{ label }}</p><span class="mono">CHUN MILE / {{ number || '01' }}</span></div><h1>{{ title }}<span class="title-dot">.</span></h1><p class="intro-description">{{ description }}</p></div></section></template>
