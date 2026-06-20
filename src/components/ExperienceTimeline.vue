<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '../data/cv'

gsap.registerPlugin(ScrollTrigger)

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !root.value) return

  ctx = gsap.context((self) => {
    // Progress line draws from top to bottom across the whole timeline.
    const line = self.selector?.('.tl-progress')
    if (line && line[0]) {
      gsap.fromTo(
        line[0],
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.tl-list',
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        },
      )
    }

    // Each role card eases in as it enters; node pops when reached.
    self.selector?.('.tl-item').forEach((item: Element) => {
      gsap.from(item.querySelector('.tl-card'), {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 82%' },
      })
      gsap.fromTo(
        item.querySelector('.tl-node'),
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        },
      )
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="experience" ref="root" class="section experience">
    <div class="shell">
      <div class="exp-head">
        <p class="eyebrow">Experience</p>
        <h2 class="section-title">Where I have shipped</h2>
        <p class="lead exp-lead">
          Six companies, fully remote with international teams since 2017. From Brazilian
          platforms at national scale to US and European SaaS products.
        </p>
      </div>

      <ol class="tl-list">
        <span class="tl-rail" aria-hidden="true"><span class="tl-progress"></span></span>

        <li v-for="(role, i) in experience" :key="i" class="tl-item">
          <span class="tl-node" aria-hidden="true"></span>

          <article class="tl-card">
            <header class="tl-top">
              <div>
                <h3 class="tl-company">{{ role.company }}</h3>
                <p class="tl-title">{{ role.title }}</p>
              </div>
              <div class="tl-meta">
                <span class="tl-period mono">{{ role.period }}</span>
                <span class="tl-context">{{ role.context }}</span>
              </div>
            </header>

            <ul class="tl-bullets">
              <li v-for="(b, bi) in role.bullets" :key="bi">{{ b }}</li>
            </ul>

            <ul class="tl-stack">
              <li v-for="s in role.stack" :key="s" class="tl-chip mono">{{ s }}</li>
            </ul>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.experience {
  background: linear-gradient(180deg, transparent, var(--elev) 50%, transparent);
}
.exp-head {
  max-width: 680px;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}
.exp-lead {
  margin-top: 1.2rem;
}

.tl-list {
  position: relative;
  list-style: none;
  padding-left: clamp(1.6rem, 4vw, 3rem);
}
.tl-rail {
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--line);
  border-radius: 2px;
  overflow: hidden;
}
.tl-progress {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--accent), transparent);
  transform-origin: top;
  transform: scaleY(1);
}
.tl-item {
  position: relative;
  padding-bottom: clamp(2.4rem, 5vw, 3.6rem);
}
.tl-item:last-child {
  padding-bottom: 0;
}
.tl-node {
  position: absolute;
  left: calc(clamp(1.6rem, 4vw, 3rem) * -1 - 1px);
  top: 8px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 5px var(--accent-soft);
  transform: translateX(0);
}
.tl-card {
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 70%, var(--surface));
  border-radius: var(--radius-md);
  padding: clamp(1.3rem, 3vw, 2rem);
  transition: border-color 0.3s var(--ease), transform 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
}
.tl-card:hover {
  border-color: var(--line-strong);
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
}
.tl-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.6rem 1.5rem;
  align-items: baseline;
  margin-bottom: 1.2rem;
}
.tl-company {
  font-size: clamp(1.25rem, 2.6vw, 1.6rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}
.tl-title {
  color: var(--accent);
  font-size: 0.95rem;
  margin-top: 0.15rem;
}
.tl-meta {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.tl-period {
  font-size: 0.82rem;
  color: var(--fg);
}
.tl-context {
  font-size: 0.78rem;
  color: var(--faint);
}
.tl-bullets {
  list-style: none;
  display: grid;
  gap: 0.7rem;
}
.tl-bullets li {
  position: relative;
  padding-left: 1.3rem;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
}
.tl-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.6;
}
.tl-stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.4rem;
  padding-top: 1.3rem;
  border-top: 1px solid var(--line);
}
.tl-chip {
  font-size: 0.74rem;
  padding: 0.28rem 0.65rem;
  border-radius: 6px;
  background: var(--surface);
  color: var(--muted);
  border: 1px solid var(--line);
}

@media (max-width: 620px) {
  .tl-meta {
    text-align: left;
  }
}
</style>
