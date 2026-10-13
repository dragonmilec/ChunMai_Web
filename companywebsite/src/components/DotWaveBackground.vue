<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mountDotWave } from '../visuals/mountDotWave'
const canvas = ref<HTMLCanvasElement | null>(null)
let dispose: (() => void) | undefined
onMounted(() => { if (canvas.value) dispose = mountDotWave(canvas.value) })
onBeforeUnmount(() => dispose?.())
</script>
<template><canvas ref="canvas" class="dot-wave-background" aria-hidden="true"></canvas></template>
