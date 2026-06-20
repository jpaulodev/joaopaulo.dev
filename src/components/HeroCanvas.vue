<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Interactive particle network - a nod to distributed systems / microservices.
// Nodes drift, link to nearby nodes, and lean toward the cursor.
// Collapses to a calm static field under prefers-reduced-motion.
const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0
let cleanup: (() => void) | null = null

interface P {
  x: number
  y: number
  vx: number
  vy: number
}

onMounted(() => {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  if (!ctx) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  let w = 0
  let h = 0
  let points: P[] = []
  const mouse = { x: -9999, y: -9999 }

  function rgb() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--canvas-particle')
      .trim() || '52, 224, 161'
  }
  let color = rgb()

  function resize() {
    const rect = el!.getBoundingClientRect()
    w = rect.width
    h = rect.height
    el!.width = w * dpr
    el!.height = h * dpr
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

    const density = Math.min(Math.floor((w * h) / 16000), 90)
    points = Array.from({ length: Math.max(density, 28) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
    }))
    color = rgb()
  }

  const LINK = 132

  function draw() {
    ctx!.clearRect(0, 0, w, h)

    for (const p of points) {
      if (!reduce) {
        p.x += p.vx
        p.y += p.vy

        // gentle pull toward cursor
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const d2 = dx * dx + dy * dy
        if (d2 < 26000) {
          p.vx += dx * 0.000018
          p.vy += dy * 0.000018
        }

        // friction + soft speed clamp
        p.vx *= 0.992
        p.vy *= 0.992

        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.x = Math.max(0, Math.min(w, p.x))
        p.y = Math.max(0, Math.min(h, p.y))
      }

      ctx!.beginPath()
      ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(${color}, 0.85)`
      ctx!.fill()
    }

    // links
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i]
        const b = points[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.hypot(dx, dy)
        if (dist < LINK) {
          const alpha = (1 - dist / LINK) * 0.5
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.strokeStyle = `rgba(${color}, ${alpha})`
          ctx!.lineWidth = 1
          ctx!.stroke()
        }
      }
    }

    // cursor link halo
    if (!reduce && mouse.x > -9000) {
      for (const p of points) {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (dist < 170) {
          ctx!.beginPath()
          ctx!.moveTo(p.x, p.y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.strokeStyle = `rgba(${color}, ${(1 - dist / 170) * 0.45})`
          ctx!.lineWidth = 1
          ctx!.stroke()
        }
      }
    }

    raf = requestAnimationFrame(draw)
  }

  function onMove(e: PointerEvent) {
    const rect = el!.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }
  function onLeave() {
    mouse.x = -9999
    mouse.y = -9999
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerleave', onLeave)

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="hero-canvas" aria-hidden="true" />
</template>

<style scoped>
.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 75% 80% at 65% 40%, #000 30%, transparent 80%);
  opacity: 0.9;
}
</style>
