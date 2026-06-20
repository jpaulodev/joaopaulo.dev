// Fetch the FULL GitHub contribution history (every calendar year since the
// account was created) at build time and bake it into the bundle as
// src/data/contributions.json. Keeps the site self-contained (no runtime API
// dependency, no token, no repo names exposed); the scheduled deploy workflow
// keeps the snapshot fresh.
//
// Source: github-contributions-api.jogruber.de?y=all wraps the GitHub GraphQL
// contributionsCalendar and returns every day as { date, count, level } plus a
// per-year total map.
//
// Resilient by design: on any failure it leaves the existing committed snapshot
// untouched and exits 0, so a flaky API never breaks a deploy.

import { writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const USER = 'jpaulodev'
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/contributions.json')
const URL = `https://github-contributions-api.jogruber.de/v4/${USER}?y=all`

async function main() {
  try {
    const res = await fetch(URL, { headers: { accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const all = Array.isArray(data.contributions) ? data.contributions : []
    if (all.length === 0) throw new Error('empty contributions')

    // Group days by calendar year.
    const byYear = new Map()
    for (const d of all) {
      const y = d.date.slice(0, 4)
      if (!byYear.has(y)) byYear.set(y, [])
      byYear.get(y).push({ date: d.date, count: d.count || 0, level: d.level || 0 })
    }

    const totals = data.total || {}
    const years = [...byYear.keys()]
      .sort((a, b) => Number(b) - Number(a)) // most recent first
      .map((y) => {
        const days = byYear.get(y).sort((a, b) => a.date.localeCompare(b.date))
        const total = totals[y] ?? days.reduce((s, d) => s + d.count, 0)
        return { year: Number(y), total, days }
      })

    const allTime = years.reduce((s, y) => s + y.total, 0)
    const payload = {
      total: allTime,
      since: years.length ? years[years.length - 1].year : null,
      updated: new Date().toISOString().slice(0, 10),
      years,
    }
    writeFileSync(OUT, JSON.stringify(payload))
    console.log(`✓ contributions: ${years.length} years, ${allTime} total -> ${OUT}`)
  } catch (err) {
    if (existsSync(OUT)) {
      console.warn(`! contributions fetch failed (${err.message}); keeping existing snapshot`)
    } else {
      writeFileSync(OUT, JSON.stringify({ total: 0, since: null, updated: null, years: [] }))
      console.warn(`! contributions fetch failed (${err.message}); wrote empty snapshot`)
    }
  }
}

main()
