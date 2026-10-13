import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(root: Ref<HTMLElement | null>) {
  const reduced = usePreferredReducedMotion()
  let context: gsap.Context | undefined
  onMounted(() => {
    if (reduced.value === 'reduce' || !root.value) return
    context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, {
          y: 24, opacity: 0, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 94%', once: true },
        })
      })
    }, root.value)
    ScrollTrigger.refresh()
  })
  onBeforeUnmount(() => context?.revert())
  return { reduced }
}
