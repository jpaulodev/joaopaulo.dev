<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { profile } from '../data/cv'
import { useTheme } from '../composables/useTheme'

const { theme, toggle } = useTheme()
const scrolled = ref(false)
const open = ref(false)

const links = [
  { href: '#profile', label: 'Profile' },
  { href: '#stack', label: 'Stack' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 24
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function go() {
  open.value = false
}
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled }">
    <div class="shell nav-inner">
      <a href="#top" class="brand" aria-label="João Paulo da Silva, home">
        <span class="brand-mark mono">JP</span>
        <span class="brand-name">joaopaulo<span class="brand-dim">.dev</span></span>
      </a>

      <nav class="nav-links" :class="{ open }" aria-label="Primary">
        <a v-for="l in links" :key="l.href" :href="l.href" @click="go">{{ l.label }}</a>
      </nav>

      <div class="nav-actions">
        <button
          class="icon-btn"
          type="button"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggle"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" fill="none">
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.6" />
            <path
              d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path
              d="M20 14.2A8 8 0 1 1 9.8 4 6.4 6.4 0 0 0 20 14.2Z"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <a :href="`mailto:${profile.email}`" class="nav-cta">Get in touch</a>

        <button
          class="icon-btn burger"
          type="button"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <span :class="{ x: open }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: background 0.35s var(--ease), border-color 0.35s var(--ease),
    backdrop-filter 0.35s var(--ease);
  border-bottom: 1px solid transparent;
}
.nav.is-scrolled {
  background: color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border-bottom-color: var(--line);
}
.nav-inner {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--accent);
  color: var(--accent-contrast);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0;
}
.brand-name {
  font-size: 0.98rem;
}
.brand-dim {
  color: var(--faint);
}
.nav-links {
  display: flex;
  gap: 2rem;
  font-size: 0.92rem;
  color: var(--muted);
}
.nav-links a {
  position: relative;
  transition: color 0.2s var(--ease);
}
.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0;
  height: 1.5px;
  background: var(--accent);
  transition: width 0.3s var(--ease);
}
.nav-links a:hover {
  color: var(--fg);
}
.nav-links a:hover::after {
  width: 100%;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.icon-btn {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid var(--line);
  color: var(--muted);
  transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s var(--ease);
}
.icon-btn:hover {
  color: var(--fg);
  border-color: var(--line-strong);
  background: var(--surface);
}
.icon-btn:active {
  transform: scale(0.94);
}
.nav-cta {
  padding: 0.55rem 1.1rem;
  border-radius: 10px;
  background: var(--fg);
  color: var(--bg);
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.2s var(--ease), opacity 0.2s;
}
.nav-cta:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}
.nav-cta:active {
  transform: translateY(0) scale(0.98);
}
.burger {
  display: none;
}
.burger span,
.burger span::before,
.burger span::after {
  content: '';
  display: block;
  width: 16px;
  height: 1.6px;
  background: currentColor;
  transition: transform 0.3s var(--ease), opacity 0.2s;
}
.burger span::before {
  transform: translateY(-5px);
}
.burger span::after {
  transform: translateY(3.4px);
}
.burger span.x {
  background: transparent;
}
.burger span.x::before {
  transform: rotate(45deg);
}
.burger span.x::after {
  transform: rotate(-45deg) translateY(-1px);
}

@media (max-width: 760px) {
  .nav-links {
    position: fixed;
    inset: 68px 0 auto 0;
    flex-direction: column;
    gap: 0;
    padding: 0.5rem 1.25rem 1.25rem;
    background: color-mix(in srgb, var(--bg) 94%, transparent);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--line);
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
  }
  .nav-links.open {
    opacity: 1;
    transform: none;
    pointer-events: auto;
  }
  .nav-links a {
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--line);
    font-size: 1rem;
    color: var(--fg);
  }
  .nav-links a::after {
    display: none;
  }
  .burger {
    display: grid;
  }
  .nav-cta {
    display: none;
  }
}
</style>
