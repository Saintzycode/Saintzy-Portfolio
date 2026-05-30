import { onMounted, ref } from 'vue'

export function useScrollReveal(threshold = 0.15) {
  const revealed = ref(false)
  const elementRef = ref<HTMLElement | null>(null)

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          revealed.value = true
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  return { revealed, elementRef }
}