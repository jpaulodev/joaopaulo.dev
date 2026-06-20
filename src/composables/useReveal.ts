import type { Directive } from 'vue'

// A lightweight scroll-reveal directive backed by IntersectionObserver
// (no scroll listeners). Honors prefers-reduced-motion by revealing instantly.
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
  }
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.setAttribute('data-reveal', '')
    if (binding.value) {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }
    if (reduceMotion) {
      el.classList.add('is-visible')
      return
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
