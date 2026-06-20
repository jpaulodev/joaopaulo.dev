<script setup lang="ts">
import { profile } from '../data/cv'
import { vReveal } from '../composables/useReveal'

const focus = [
  { k: 'Backend', v: 'TypeScript · Node · NestJS' },
  { k: 'Frontend', v: 'Vue.js · clean CSS' },
  { k: 'Architecture', v: 'Microservices · Clean Arch · DI' },
  { k: 'Reliability', v: '100% test coverage · CI/CD' },
]
</script>

<template>
  <section id="profile" class="section">
    <div class="shell profile-grid">
      <div class="profile-head">
        <p v-reveal class="eyebrow">Profile</p>
        <h2 v-reveal:80 class="section-title">
          Fifteen years shipping<br />
          systems that stay<br />
          <span class="title-accent">reliable at scale.</span>
        </h2>
      </div>

      <div class="profile-body">
        <p v-reveal:120 class="profile-text">{{ profile.summary }}</p>

        <dl class="focus">
          <div v-for="(f, i) in focus" :key="f.k" v-reveal="160 + i * 80" class="focus-row">
            <dt class="mono">{{ f.k }}</dt>
            <dd>{{ f.v }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: start;
}
.profile-head {
  position: sticky;
  top: 110px;
}
.title-accent {
  color: var(--accent);
}
.profile-text {
  font-size: clamp(1.05rem, 2vw, 1.22rem);
  line-height: 1.75;
  color: var(--muted);
}
.focus {
  margin-top: 2.6rem;
  border-top: 1px solid var(--line);
}
.focus-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 1rem;
  padding: 1.05rem 0;
  border-bottom: 1px solid var(--line);
  align-items: baseline;
}
.focus-row dt {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--faint);
}
.focus-row dd {
  color: var(--fg);
  font-size: 1rem;
}

@media (max-width: 860px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
  .profile-head {
    position: static;
  }
}
@media (max-width: 460px) {
  .focus-row {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}
</style>
