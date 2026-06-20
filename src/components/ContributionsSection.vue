<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import raw from '../data/contributions.json'
import { vReveal } from '../composables/useReveal'

interface Day {
  date: string
  count: number
  level: number
}
interface Year {
  year: number
  total: number
  days: Day[]
}
const data = raw as { total: number; since: number | null; updated: string | null; years: Year[] }

const selectedYear = ref<number>(data.years[0]?.year ?? new Date().getFullYear())
const selected = computed<Year>(
  () => data.years.find((y) => y.year === selectedYear.value) ?? data.years[0],
)

// Group the selected year's days into Sunday-started week columns, padding the
// leading/trailing partial weeks with nulls (matching GitHub's layout).
const weeks = computed<(Day | null)[][]>(() => {
  const out: (Day | null)[][] = []
  let week: (Day | null)[] = new Array(7).fill(null)
  for (const d of selected.value.days) {
    const wd = new Date(d.date + 'T00:00:00').getDay()
    week[wd] = d
    if (wd === 6) {
      out.push(week)
      week = new Array(7).fill(null)
    }
  }
  if (week.some(Boolean)) out.push(week)
  return out
})

// Month labels positioned above the first week column of each month.
const monthLabels = computed(() => {
  const labels: { col: number; name: string }[] = []
  let lastMonth = -1
  weeks.value.forEach((w, col) => {
    const first = w.find(Boolean)
    if (!first) return
    const m = new Date(first.date + 'T00:00:00').getMonth()
    if (m !== lastMonth) {
      labels.push({
        col,
        name: new Date(first.date + 'T00:00:00').toLocaleString('en', { month: 'short' }),
      })
      lastMonth = m
    }
  })
  return labels
})

const stats = computed(() => {
  const days = selected.value.days
  let longest = 0
  let run = 0
  let best: Day = days[0] ?? { date: '', count: 0, level: 0 }
  for (const d of days) {
    if (d.count > 0) {
      run++
      if (run > longest) longest = run
    } else {
      run = 0
    }
    if (d.count > best.count) best = d
  }
  const active = days.filter((d) => d.count > 0).length
  return { longest, active, best, total: selected.value.total }
})

function fmt(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Lightweight tooltip that tracks the hovered cell within the grid wrapper.
const grid = ref<HTMLElement | null>(null)
const tip = ref({ show: false, x: 0, y: 0, text: '' })

function showTip(e: MouseEvent, d: Day | null) {
  if (!d || !grid.value) return
  const host = grid.value.getBoundingClientRect()
  const cell = (e.target as HTMLElement).getBoundingClientRect()
  tip.value = {
    show: true,
    x: cell.left - host.left + cell.width / 2,
    y: cell.top - host.top,
    text:
      d.count === 0
        ? `No contributions on ${fmt(d.date)}`
        : `${d.count} contribution${d.count > 1 ? 's' : ''} on ${fmt(d.date)}`,
  }
}
function hideTip() {
  tip.value.show = false
}

// Diagonal entrance stagger on first view, gated to honor reduced motion.
const lit = ref(false)
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !grid.value) {
    lit.value = true
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        lit.value = true
        io.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  io.observe(grid.value)
})
</script>

<template>
  <section id="activity" class="section activity">
    <div class="shell">
      <div class="act-head">
        <p v-reveal class="eyebrow">Commit activity</p>
        <h2 v-reveal:80 class="section-title">Consistency, day after day</h2>
        <p v-reveal:140 class="lead act-lead">
          {{ data.total.toLocaleString('en') }} GitHub contributions since {{ data.since }}. The
          graph, not the repositories.
        </p>
      </div>

      <div v-reveal:160 class="act-card">
        <div class="act-toolbar">
          <span class="act-year-total mono">
            <strong>{{ stats.total.toLocaleString('en') }}</strong> in {{ selected.year }}
          </span>
          <div class="act-years" role="tablist" aria-label="Select year">
            <button
              v-for="y in data.years"
              :key="y.year"
              type="button"
              role="tab"
              :aria-selected="y.year === selectedYear"
              class="act-year"
              :class="{ active: y.year === selectedYear }"
              @click="selectedYear = y.year"
            >
              {{ y.year }}
            </button>
          </div>
        </div>

        <div ref="grid" class="cal-wrap" :class="{ lit }">
          <div
            class="cal-tip"
            :class="{ show: tip.show }"
            :style="{ left: tip.x + 'px', top: tip.y + 'px' }"
            role="status"
          >
            {{ tip.text }}
          </div>

          <div class="cal">
            <div class="cal-months">
              <span
                v-for="m in monthLabels"
                :key="m.col + m.name"
                class="cal-month"
                :style="{ gridColumn: m.col + 1 }"
                >{{ m.name }}</span
              >
            </div>

            <div class="cal-body">
              <div class="cal-weekdays" aria-hidden="true">
                <span></span><span>Mon</span><span></span><span>Wed</span><span></span
                ><span>Fri</span><span></span>
              </div>

              <div
                class="cal-grid"
                role="img"
                :aria-label="`${selected.total} contributions in ${selected.year}`"
              >
                <div v-for="(w, wi) in weeks" :key="wi" class="cal-col">
                  <span
                    v-for="(d, di) in w"
                    :key="di"
                    class="cal-cell"
                    :class="d ? `lvl-${d.level}` : 'empty'"
                    :style="{ '--i': wi + di }"
                    @mouseenter="showTip($event, d)"
                    @mouseleave="hideTip"
                  />
                </div>
              </div>
            </div>

            <div class="cal-legend mono">
              <span>Less</span>
              <span class="cal-cell lvl-0" /><span class="cal-cell lvl-1" /><span
                class="cal-cell lvl-2"
              /><span class="cal-cell lvl-3" /><span class="cal-cell lvl-4" />
              <span>More</span>
            </div>
          </div>
        </div>

        <dl class="act-stats">
          <div class="act-stat">
            <dt>Contributions</dt>
            <dd class="mono">{{ stats.total.toLocaleString('en') }}</dd>
          </div>
          <div class="act-stat">
            <dt>Longest streak</dt>
            <dd class="mono">{{ stats.longest }}<span class="u">d</span></dd>
          </div>
          <div class="act-stat">
            <dt>Active days</dt>
            <dd class="mono">{{ stats.active }}</dd>
          </div>
          <div class="act-stat">
            <dt>Best day</dt>
            <dd class="mono">{{ stats.best.count }}<span class="u">commits</span></dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.act-head {
  max-width: 680px;
  margin-bottom: clamp(2.4rem, 5vw, 3.6rem);
}
.act-lead {
  margin-top: 1.2rem;
}
.act-card {
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--bg) 60%, var(--surface));
  padding: clamp(1.3rem, 3vw, 2rem);
}

.act-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.act-year-total {
  font-size: 0.9rem;
  color: var(--muted);
}
.act-year-total strong {
  color: var(--fg);
  font-weight: 600;
}
.act-years {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  max-width: 100%;
}
.act-year {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 0.3rem 0.6rem;
  border-radius: 7px;
  color: var(--muted);
  border: 1px solid transparent;
  transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.15s var(--ease);
}
.act-year:hover {
  color: var(--fg);
  background: var(--surface);
}
.act-year:active {
  transform: scale(0.95);
}
.act-year.active {
  color: var(--accent-contrast);
  background: var(--accent);
  font-weight: 600;
}

.cal-wrap {
  position: relative;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  scrollbar-width: thin;
}
.cal {
  min-width: 680px;
}
.cal-months {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  margin-left: 30px;
  margin-bottom: 6px;
}
.cal-month {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--faint);
  grid-row: 1;
}
.cal-body {
  display: flex;
  gap: 6px;
}
.cal-weekdays {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 3px;
  width: 24px;
  flex: 0 0 24px;
}
.cal-weekdays span {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  color: var(--faint);
  line-height: 13px;
  height: 13px;
}
.cal-grid {
  display: flex;
  gap: 3px;
  flex: 1;
}
.cal-col {
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  gap: 3px;
}
.cal-cell {
  width: 13px;
  height: 13px;
  border-radius: 3px;
  background: var(--surface);
  border: 1px solid var(--line);
}
.cal-grid .cal-cell {
  transition: transform 0.18s var(--ease);
  opacity: 0;
  transform: scale(0.2);
}
.cal-wrap.lit .cal-grid .cal-cell {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
  transition-delay: calc(var(--i) * 6ms);
}
.cal-grid .cal-cell:hover {
  transform: scale(1.35);
  outline: 1px solid var(--fg);
}
.cal-cell.empty {
  background: transparent;
  border-color: transparent;
}
.lvl-0 {
  background: var(--surface);
}
.lvl-1 {
  background: rgba(var(--canvas-particle), 0.28);
  border-color: transparent;
}
.lvl-2 {
  background: rgba(var(--canvas-particle), 0.5);
  border-color: transparent;
}
.lvl-3 {
  background: rgba(var(--canvas-particle), 0.75);
  border-color: transparent;
}
.lvl-4 {
  background: rgb(var(--canvas-particle));
  border-color: transparent;
}

.cal-legend {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  margin-top: 0.9rem;
  font-size: 0.68rem;
  color: var(--faint);
}
.cal-legend .cal-cell {
  opacity: 1;
  transform: none;
}

.cal-tip {
  position: absolute;
  z-index: 5;
  transform: translate(-50%, -120%);
  background: var(--fg);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.4rem 0.6rem;
  border-radius: 7px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s var(--ease);
  box-shadow: var(--shadow-soft);
}
.cal-tip.show {
  opacity: 1;
}

.act-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin-top: 1.6rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--line);
}
.act-stat {
  padding: 0.2rem clamp(0.4rem, 1.5vw, 1rem);
  position: relative;
}
.act-stat + .act-stat::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10%;
  height: 80%;
  width: 1px;
  background: var(--line);
}
.act-stat dt {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--faint);
}
.act-stat dd {
  margin-top: 0.5rem;
  font-size: clamp(1.5rem, 4vw, 2.3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--fg);
}
.act-stat .u {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--faint);
  margin-left: 0.25rem;
  letter-spacing: 0;
}

@media (max-width: 620px) {
  .act-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.4rem 0;
  }
  .act-stat:nth-child(odd)::before {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cal-grid .cal-cell {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
