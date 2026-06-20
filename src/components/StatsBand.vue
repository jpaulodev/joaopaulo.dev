<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { quickFacts } from '../data/cv'
import { useCountUp } from '../composables/useCountUp'

// Build a count-up per numeric fact.
const counters = quickFacts.map((f) => {
  const numeric = Number(f.value)
  return { fact: f, ...useCountUp(Number.isFinite(numeric) ? numeric : 0) }
})

const band = ref<HTMLElement | null>(null)

onMounted(() => {
  const el = band.value
  if (!el) return
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        counters.forEach((c) => c.start())
        io.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  io.observe(el)
})
</script>

<template>
  <section ref="band" class="stats" aria-label="Career highlights">
    <div class="shell stats-grid">
      <div v-for="(c, i) in counters" :key="i" class="stat">
        <div class="stat-value mono">
          {{ c.display.value }}<span class="stat-suffix">{{ c.fact.suffix }}</span>
        </div>
        <div class="stat-label">{{ c.fact.label }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  border-block: 1px solid var(--line);
  background: linear-gradient(180deg, var(--elev), transparent);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-block: clamp(2.4rem, 5vw, 3.6rem);
}
.stat {
  padding: 0.5rem clamp(0.8rem, 2vw, 1.6rem);
  position: relative;
}
.stat + .stat::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12%;
  height: 76%;
  width: 1px;
  background: var(--line);
}
.stat-value {
  font-size: clamp(2.2rem, 5.5vw, 3.6rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--fg);
}
.stat-suffix {
  color: var(--accent);
}
.stat-label {
  margin-top: 0.7rem;
  font-size: 0.84rem;
  color: var(--muted);
  line-height: 1.4;
  max-width: 18ch;
}

@media (max-width: 720px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem 0;
  }
  .stat:nth-child(odd)::before {
    display: none;
  }
}
</style>
