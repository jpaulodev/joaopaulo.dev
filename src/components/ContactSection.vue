<script setup lang="ts">
import { profile } from '../data/cv'
import { vReveal } from '../composables/useReveal'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LinkedIn', value: '/in/jpaulodev', href: profile.links.linkedin },
  { label: 'GitHub', value: '/jpaulodev', href: profile.links.github },
]
</script>

<template>
  <section id="contact" class="section contact">
    <div class="shell contact-inner">
      <p v-reveal class="eyebrow">Contact</p>
      <h2 v-reveal:80 class="contact-title">
        Let's build something<br />
        <span class="title-accent">reliable together.</span>
      </h2>
      <p v-reveal:140 class="lead contact-lead">
        Open to senior full-stack and backend roles, fully remote. Reply time is usually within
        a day.
      </p>

      <a v-reveal:200 :href="`mailto:${profile.email}`" class="contact-cta">
        {{ profile.email }}
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>

      <ul v-reveal:260 class="channels">
        <li v-for="c in channels" :key="c.label">
          <a :href="c.href" target="_blank" rel="noopener" class="channel">
            <span class="channel-label mono">{{ c.label }}</span>
            <span class="channel-value">{{ c.value }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.contact {
  position: relative;
  text-align: center;
  overflow: hidden;
}
.contact::before {
  content: '';
  position: absolute;
  width: 70vw;
  height: 70vw;
  max-width: 760px;
  max-height: 760px;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--accent-glow), transparent 65%);
  filter: blur(30px);
  pointer-events: none;
}
.contact-inner {
  position: relative;
  max-width: 760px;
  margin-inline: auto;
}
.contact-title {
  margin-top: 1.4rem;
  font-size: clamp(2.4rem, 7vw, 4.6rem);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 600;
}
.title-accent {
  color: var(--accent);
}
.contact-lead {
  margin: 1.6rem auto 0;
  text-align: center;
}
.contact-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 2.6rem;
  padding: 1rem 1.9rem;
  border-radius: 13px;
  background: var(--accent);
  color: var(--accent-contrast);
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  font-weight: 500;
  font-family: var(--font-mono);
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.contact-cta svg {
  transition: transform 0.25s var(--ease);
}
.contact-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 44px -16px var(--accent-glow);
}
.contact-cta:hover svg {
  transform: translateX(4px);
}
.contact-cta:active {
  transform: translateY(0) scale(0.98);
}
.channels {
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1px;
  margin-top: 3.4rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--line);
}
.channels li {
  flex: 1 1 180px;
}
.channel {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.4rem 1rem;
  background: var(--bg);
  height: 100%;
  transition: background 0.25s var(--ease);
}
.channel:hover {
  background: var(--elev);
}
.channel-label {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--faint);
}
.channel-value {
  font-size: 1rem;
  color: var(--fg);
  transition: color 0.2s;
}
.channel:hover .channel-value {
  color: var(--accent);
}
</style>
