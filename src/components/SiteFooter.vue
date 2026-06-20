<script setup lang="ts">
import { profile } from '../data/cv'
</script>

<template>
  <footer class="footer">
    <div class="shell footer-inner">
      <span class="footer-brand mono">joaopaulo<span class="dim">.dev</span></span>
      <p class="footer-note">
        Designed and built with Vue, TypeScript and a bit of GSAP. © 2026 {{ profile.name }}.
      </p>
      <a href="#top" class="to-top mono">Back to top ↑</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding-block: 2.4rem;
}
.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.footer-brand {
  font-size: 0.95rem;
  font-weight: 600;
}
.dim {
  color: var(--faint);
}
.footer-note {
  font-size: 0.84rem;
  color: var(--faint);
}
.to-top {
  font-size: 0.82rem;
  color: var(--muted);
  transition: color 0.2s;
}
.to-top:hover {
  color: var(--accent);
}
</style>
