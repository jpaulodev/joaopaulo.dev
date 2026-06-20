<script setup lang="ts">
import { stackGroups, techLogos } from '../data/cv'
import { vReveal } from '../composables/useReveal'

// Simple Icons CDN renders any brand mark in our accent-neutral foreground.
function logoUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`
}
// Duplicate the logo list so the marquee loops seamlessly.
const marquee = [...techLogos, ...techLogos]
</script>

<template>
  <section id="stack" class="section stack">
    <div class="shell">
      <div class="stack-head">
        <p v-reveal class="eyebrow">Stack</p>
        <h2 v-reveal:80 class="section-title">Tools I reach for</h2>
        <p v-reveal:140 class="lead stack-lead">
          A pragmatic toolbox built over six companies and dozens of production systems. Deep
          where it counts, broad where it helps.
        </p>
      </div>

      <div class="stack-groups">
        <div
          v-for="(g, i) in stackGroups"
          :key="g.label"
          v-reveal="i * 70"
          class="stack-group"
        >
          <h3 class="group-label mono">{{ g.label }}</h3>
          <ul class="chips">
            <li v-for="item in g.items" :key="item" class="chip">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Single marquee on the page: a glance-able breadth of brands. -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <div v-for="(t, i) in marquee" :key="i" class="logo" :title="t.name">
          <img :src="logoUrl(t.slug)" :alt="t.name" loading="lazy" width="30" height="30" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stack-head {
  max-width: 720px;
}
.stack-lead {
  margin-top: 1.2rem;
}
.stack-groups {
  margin-top: clamp(2.6rem, 5vw, 4rem);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.stack-group {
  background: var(--bg);
  padding: clamp(1.4rem, 3vw, 2.1rem);
  transition: background 0.3s var(--ease);
}
.stack-group:hover {
  background: var(--elev);
}
/* 7 groups in a 2-col grid would leave one empty cell; the last spans full width. */
.stack-group:last-child {
  grid-column: 1 / -1;
}
.stack-group:last-child .chips {
  max-width: none;
}
.group-label {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.1rem;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  list-style: none;
}
.chip {
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--line);
  border-radius: 99px;
  font-size: 0.86rem;
  color: var(--muted);
  transition: color 0.2s, border-color 0.2s, transform 0.2s var(--ease), background 0.2s;
}
.chip:hover {
  color: var(--fg);
  border-color: var(--accent);
  background: var(--accent-soft);
  transform: translateY(-2px);
}

.marquee {
  margin-top: clamp(3rem, 6vw, 5rem);
  position: relative;
  overflow: hidden;
  padding-block: 1.6rem;
  border-block: 1px solid var(--line);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.marquee-track {
  display: flex;
  gap: clamp(2.4rem, 5vw, 4rem);
  width: max-content;
  animation: scroll-x 44s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
.logo {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}
.logo img {
  height: 30px;
  width: auto;
  opacity: 0.5;
  filter: grayscale(1);
  transition: opacity 0.3s var(--ease), filter 0.3s var(--ease), transform 0.3s var(--ease);
}
.logo:hover img {
  opacity: 1;
  filter: none;
  transform: scale(1.12);
}

@keyframes scroll-x {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    gap: 1.8rem;
  }
}

@media (max-width: 700px) {
  .stack-groups {
    grid-template-columns: 1fr;
  }
}
</style>
