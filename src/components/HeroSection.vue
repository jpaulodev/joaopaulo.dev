<script setup lang="ts">
import HeroCanvas from './HeroCanvas.vue'
import { profile } from '../data/cv'
</script>

<template>
  <section id="top" class="hero">
    <HeroCanvas />

    <div class="shell hero-inner">
      <div class="hero-copy">
        <p class="hero-name">
          {{ profile.name }}
          <span class="hero-avail">
            <span class="status-dot" aria-hidden="true"></span>
            Open to remote
          </span>
        </p>

        <h1 class="hero-title">
          Senior Software
          <span class="hero-title-accent">Engineer.</span>
        </h1>

        <p class="hero-lead">{{ profile.tagline }}</p>

        <div class="hero-actions">
          <a href="#experience" class="btn btn-primary">
            View experience
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a :href="`mailto:${profile.email}`" class="btn btn-ghost">{{ profile.email }}</a>
        </div>

        <ul class="hero-meta mono">
          <li>
            <span class="meta-k">LOC</span>
            {{ profile.location }}
          </li>
          <li>
            <span class="meta-k">TZ</span>
            {{ profile.timezone }}
          </li>
          <li>
            <span class="meta-k">STACK</span>
            TypeScript · Node · Vue
          </li>
        </ul>
      </div>
    </div>

    <a href="#profile" class="hero-scroll mono" aria-label="Scroll to profile">
      <span class="scroll-rail"><span class="scroll-dot"></span></span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero::after {
  /* accent bloom behind the copy */
  content: '';
  position: absolute;
  width: 60vw;
  height: 60vw;
  max-width: 720px;
  max-height: 720px;
  right: -8vw;
  top: 10%;
  background: radial-gradient(circle, var(--accent-glow), transparent 68%);
  filter: blur(20px);
  pointer-events: none;
  z-index: 0;
}
.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-top: 5rem;
}
.hero-copy {
  max-width: 760px;
}
.hero-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  font-size: clamp(1rem, 2.2vw, 1.3rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--fg);
  animation: fade-up 0.7s var(--ease) both;
}
.hero-avail {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 var(--accent-glow);
  animation: pulse 2.4s ease-out infinite;
}
.hero-title {
  margin-top: 1rem;
  font-size: clamp(2.6rem, 8.5vw, 6.2rem);
  line-height: 0.94;
  letter-spacing: -0.04em;
  font-weight: 600;
  animation: fade-up 0.8s var(--ease) 0.08s both;
}
.hero-title-accent {
  display: block;
  color: transparent;
  -webkit-text-stroke: 1.4px var(--fg);
  text-stroke: 1.4px var(--fg);
}
.hero-lead {
  margin-top: 1.8rem;
  max-width: 56ch;
  font-size: clamp(1.05rem, 2.2vw, 1.32rem);
  line-height: 1.6;
  color: var(--muted);
  animation: fade-up 0.8s var(--ease) 0.16s both;
}
.hero-actions {
  margin-top: 2.4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  animation: fade-up 0.8s var(--ease) 0.24s both;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.8rem 1.4rem;
  border-radius: 11px;
  font-size: 0.96rem;
  font-weight: 500;
  transition: transform 0.2s var(--ease), background 0.2s, border-color 0.2s, color 0.2s;
}
.btn-primary {
  background: var(--accent);
  color: var(--accent-contrast);
}
.btn-primary svg {
  transition: transform 0.25s var(--ease);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px -12px var(--accent-glow);
}
.btn-primary:hover svg {
  transform: translateX(3px);
}
.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
.btn-ghost {
  border: 1px solid var(--line-strong);
  color: var(--fg);
  font-family: var(--font-mono);
  font-size: 0.88rem;
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}
.btn-ghost:active {
  transform: translateY(0) scale(0.98);
}
.hero-meta {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  font-size: 0.8rem;
  color: var(--muted);
  animation: fade-up 0.8s var(--ease) 0.32s both;
}
.hero-meta li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
}
.meta-k {
  color: var(--faint);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
}
.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.scroll-rail {
  display: block;
  width: 22px;
  height: 34px;
  border: 1.5px solid var(--line-strong);
  border-radius: 12px;
  position: relative;
}
.scroll-dot {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 3px;
  height: 6px;
  border-radius: 2px;
  background: var(--accent);
  transform: translateX(-50%);
  animation: scroll-bob 1.8s var(--ease) infinite;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 var(--accent-glow);
  }
  70% {
    box-shadow: 0 0 0 9px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
@keyframes scroll-bob {
  0%,
  100% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, 11px);
    opacity: 0.3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-name,
  .hero-title,
  .hero-lead,
  .hero-actions,
  .hero-meta {
    animation: none;
  }
  .status-dot,
  .scroll-dot {
    animation: none;
  }
}

@media (max-width: 560px) {
  .hero-meta {
    gap: 1rem 1.4rem;
  }
}
</style>
