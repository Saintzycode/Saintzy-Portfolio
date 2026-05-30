<template>
  <section id="projects" class="projects" ref="elementRef">
    <div class="section-header">
      <div class="section-label" :class="{ revealed }">// 02 — Work</div>
      <h2 class="section-title" :class="{ revealed }">Featured Projects</h2>
    </div>

    <div class="projects-grid">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card card-hidden"
        :class="{ 'card-revealed': revealed }"
        :style="{ transitionDelay: `${index * 0.15}s` }"
        @click="openLink(project.link)"
      >
        <div class="project-num">0{{ index + 1 }} —</div>
        <div class="project-title">{{ project.title }}</div>
        <div class="project-desc">{{ project.description }}</div>
        <div class="project-tags">
          <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="project-arrow">→</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '@/data/projects'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { revealed, elementRef } = useScrollReveal()

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.projects {
  background: transparent;
  padding: 64px 40px;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.07);
}

/* Section Header */
.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #00f5c4;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 32px;
  letter-spacing: -0.5px;
  color: #e8e8f0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease 0.1s;
}

.section-label.revealed,
.section-title.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Card */
.project-card {
  background: #14141e;
  border: 0.5px solid rgba(255, 255, 255, 0.07);
  padding: 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: #00f5c4;
}

.project-card:hover {
  border-color: rgba(0, 245, 196, 0.3);
  transform: translateY(-4px);
}

/* Card Reveal Animation */
.card-hidden {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.card-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Card Content */
.project-num {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #666680;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.project-title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #e8e8f0;
}

.project-desc {
  font-size: 12px;
  color: #666680;
  line-height: 1.6;
  margin-bottom: 16px;
}

.project-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.tag {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  padding: 3px 8px;
  border: 0.5px solid rgba(0, 245, 196, 0.3);
  color: #00f5c4;
  letter-spacing: 1px;
}

.project-arrow {
  font-size: 16px;
  color: #00f5c4;
  opacity: 0;
  transition: opacity 0.2s;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.project-card:hover .project-arrow {
  opacity: 1;
}
</style>