<template>
  <section id="skills" class="skills" ref="elementRef">
  <div class="section-label" :class="{ revealed: revealed }">// 03 — Stack</div>
  <h2 class="section-title" :class="{ revealed: revealed }">Skills & Tools</h2>

  <div class="skills-grid">
    <div
      v-for="(skill, index) in skills"
      :key="skill.name"
      class="skill-item skill-hidden"
      :class="{ 'skill-revealed': revealed }"
      :style="{ transitionDelay: `${index * 0.1}s` }"
    >
      <div class="skill-header">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-pct">{{ skill.level }}%</span>
      </div>
      <div class="bar-track">
        <div
          class="bar-fill"
          :style="{ width: revealed ? skill.level + '%' : '0%' }"
        ></div>
      </div>
    </div>
  </div>

  <div class="tools-row" :class="{ revealed: revealed }">
    <div class="tools-label">Tools I use</div>
    <div class="tools-list">
      <span class="tool-badge" v-for="tool in tools" :key="tool">
        {{ tool }}
      </span>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

interface Skill {
  name: string
  level: number
}

const skills: Skill[] = [
  { name: 'Vue.js / Nuxt', level: 92 },
  { name: 'JavaScript / TypeScript', level: 88 },
  { name: 'CSS / Tailwind', level: 85 },
  { name: 'REST APIs / GraphQL', level: 75 },
  { name: 'Git / GitHub', level: 80 },
  { name: 'Figma / UI Design', level: 70 },
]

const tools = [
  'VS Code', 'Vite', 'Pinia', 'Vue Router',
  'Axios', 'Figma', 'Git', 'Postman'
]

const { revealed, elementRef } = useScrollReveal()
</script>

<style scoped>
.skills {
  background: transparent;
  padding: 64px 40px;
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #00f5c4;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
  color: #e8e8f0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 13px;
  color: #e8e8f0;
  letter-spacing: 0.5px;
}

.skill-pct {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #00f5c4;
}

.bar-track {
  height: 2px;
  background: #1a1a24;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f5c4, #7c3aed);
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tools-row {
  border-top: 0.5px solid rgba(255,255,255,0.07);
  padding-top: 32px;
}

.tools-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #666680;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-badge {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  padding: 6px 14px;
  border: 0.5px solid rgba(255,255,255,0.07);
  color: #666680;
  letter-spacing: 1px;
  transition: border-color 0.2s, color 0.2s;
  cursor: default;
}

.tool-badge:hover {
  border-color: #00f5c4;
  color: #00f5c4;
}
.section-label,
.section-title,
.tools-row {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-label.revealed,
.section-title.revealed,
.tools-row.revealed {
  opacity: 1;
  transform: translateY(0);
}

.skill-hidden {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.skill-revealed {
  opacity: 1;
  transform: translateX(0);
}
</style>