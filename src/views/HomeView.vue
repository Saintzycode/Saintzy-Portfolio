<template>
  <main style="background: transparent;">
    <NavBar />
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <AchievementsSection />
   
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProjectsSection from '@/components/ProjectSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import AchievementsSection from '@/components/AchievementsSection.vue'
import ContactSection from '@/components/ContactSection.vue'

</script>