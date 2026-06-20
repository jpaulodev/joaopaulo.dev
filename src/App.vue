<script setup lang="ts">
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBand from './components/StatsBand.vue'
import ProfileSection from './components/ProfileSection.vue'
import StackSection from './components/StackSection.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import ContributionsSection from './components/ContributionsSection.vue'
import LanguagesEducation from './components/LanguagesEducation.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <StatsBand />
    <ProfileSection />
    <StackSection />
    <ExperienceTimeline />
    <ContributionsSection />
    <LanguagesEducation />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
