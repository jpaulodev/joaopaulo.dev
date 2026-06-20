import { ref, type Ref } from 'vue'

// Animates a numeric value from 0 to `target` once, when triggered.
// Falls back to the final value instantly under reduced motion.
export function useCountUp(target: number, duration = 1400) {
  const display: Ref<number> = ref(0)
  let started = false

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function start() {
    if (started) return
    started = true
    if (reduce || target === 0) {
      display.value = target
      return
    }
    const begin = performance.now()
    function frame(now: number) {
      const t = Math.min((now - begin) / duration, 1)
      // easeOutExpo for a confident settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      display.value = Math.round(eased * target)
      if (t < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  return { display, start }
}
