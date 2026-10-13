<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { mountSphere } from '../visuals/mountSphere'
const host = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
let dispose: (() => void) | undefined
function start() {
  dispose?.()
  dispose = undefined
  if (host.value && canvas.value) dispose = mountSphere(host.value, canvas.value, start)
}
onMounted(start)
onBeforeUnmount(() => dispose?.())
</script>
<template>
  <div ref="host" class="hero-sphere" aria-hidden="true">
    <div class="hero-sphere__fallback"><i class="hero-sphere__orbit hero-sphere__orbit--one"></i><i class="hero-sphere__orbit hero-sphere__orbit--two"></i><i class="hero-sphere__orbit hero-sphere__orbit--three"></i><div class="hero-sphere__surface"></div></div>
    <canvas ref="canvas" class="hero-sphere__canvas"></canvas>
  </div>
</template>
