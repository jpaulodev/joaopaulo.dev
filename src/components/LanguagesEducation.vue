<script setup lang="ts">
import { languages, education } from '../data/cv'
import { vReveal } from '../composables/useReveal'
</script>

<template>
  <section class="section le">
    <div class="shell le-grid">
      <div v-reveal class="le-col">
        <p class="eyebrow">Languages</p>
        <div class="lang-list">
          <div v-for="l in languages" :key="l.name" class="lang">
            <div class="lang-top">
              <span class="lang-name">{{ l.name }}</span>
              <span class="lang-level mono">{{ l.level }}</span>
            </div>
            <div class="bar">
              <span class="bar-fill" :style="{ width: l.proficiency + '%' }"></span>
            </div>
          </div>
        </div>
      </div>

      <div v-reveal:120 class="le-col">
        <p class="eyebrow">Education</p>
        <div class="edu">
          <h3 class="edu-degree">{{ education.degree }}</h3>
          <p class="edu-school">{{ education.school }}</p>
          <span class="edu-period mono">{{ education.period }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.le {
  border-top: 1px solid var(--line);
}
.le-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2.4rem, 6vw, 5rem);
}
.lang-list {
  margin-top: 2rem;
  display: grid;
  gap: 1.8rem;
}
.lang-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.7rem;
}
.lang-name {
  font-size: 1.1rem;
  font-weight: 500;
}
.lang-level {
  font-size: 0.78rem;
  color: var(--faint);
}
.bar {
  height: 4px;
  border-radius: 4px;
  background: var(--line);
  overflow: hidden;
}
.bar-fill {
  display: block;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 55%, transparent));
}
.edu {
  margin-top: 2rem;
  padding: clamp(1.4rem, 3vw, 2rem);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--elev);
}
.edu-degree {
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.edu-school {
  margin-top: 0.6rem;
  color: var(--muted);
}
.edu-period {
  display: inline-block;
  margin-top: 1.1rem;
  font-size: 0.82rem;
  color: var(--accent);
}

@media (max-width: 720px) {
  .le-grid {
    grid-template-columns: 1fr;
  }
}
</style>
