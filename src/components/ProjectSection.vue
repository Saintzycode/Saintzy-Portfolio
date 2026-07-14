<template>
  <section id="projects" class="projects" ref="elementRef">
    <div class="section-header">
      <div class="section-label" :class="{ revealed }">// 02 — Work</div>
      <h2 class="section-title" :class="{ revealed }">Featured Projects</h2>
    </div>

    <n-carousel
      effect="card"
      prev-slide-style="transform: translateX(-100%) translateZ(-200px);"
      next-slide-style="transform: translateX(0%) translateZ(-200px);"
      :show-dots="false"
      :autoplay="true"
      :loop="true"
      :space-margin="20"
      class="projects-carousel"
    >
      <n-carousel-item v-for="(project, index) in projects" :key="`${project.id}-${index}`" :style="{ width: '70%' }">
        <div class="project-card" @click="openLink(project.link)">
          <div class="project-media">
            <img :src="project.image" :alt="`${project.title} preview`" />
            <div class="project-type">{{ project.type }}</div>
          </div>
          <div class="project-num">0{{ index + 1 }} —</div>
          <div class="project-body">
            <div class="project-title">{{ project.title }}</div>
            <div class="project-desc">{{ project.description }}</div>
            <div class="project-tags">
              <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="project-arrow">→</div>
        </div>
      </n-carousel-item>
    </n-carousel>
  </section>
</template>

<script setup lang="ts">
import { NCarousel, NCarouselItem } from 'naive-ui'
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
  padding: clamp(48px, 8vw, 64px) clamp(16px, 5vw, 40px);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.07);
}

/* Section Header */
.section-header {
  margin-bottom: 32px;
}

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
  font-size: clamp(24px, 5vw, 28px);
  font-weight: 800;
  margin-bottom: 0;
  letter-spacing: 0;
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

/* Carousel */
.projects-carousel {
  aspect-ratio: 10 / 7;
  max-height: 500px;
}

:deep(.n-carousel-item) {
  aspect-ratio: 1 / 1;
}

/* Card */
.project-card {
  background: #14141e;
  border: 0.5px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s;
  height: 100%;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #00f5c4;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
  z-index: 2;
}

.project-card:hover {
  border-color: rgba(0, 245, 196, 0.3);
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-media {
  position: relative;
  order: 1;
  flex: 1;
  min-height: 0;
  background: #0f0f17;
  overflow: hidden;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.07);
}

.project-media img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.35s ease, filter 0.35s ease;
}

.project-card:hover .project-media img {
  transform: scale(1.04);
  filter: saturate(1.15);
}

.project-type {
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 5px 10px;
  background: rgba(10, 10, 15, 0.82);
  border: 0.5px solid rgba(0, 245, 196, 0.35);
  color: #00f5c4;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.project-body {
  display: flex;
  flex-direction: column;
  order: 3;
  padding: 14px 22px 18px;
}

.project-num {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #666680;
  letter-spacing: 2px;
  order: 2;
  padding: 18px 22px 0;
  margin-bottom: 14px;
}

.project-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #e8e8f0;
}

.project-desc {
  font-size: 12px;
  color: #666680;
  line-height: 1.6;
  margin-bottom: 16px;
  overflow-wrap: anywhere;
}

.project-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-right: 52px;
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
  font-family: 'Space Mono', monospace;
  font-size: 0;
  letter-spacing: 1.5px;
  color: #00f5c4;
  opacity: 0;
  transition: opacity 0.2s;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.project-arrow::before {
  content: 'VIEW';
  font-size: 9px;
}

.project-card:hover .project-arrow {
  opacity: 1;
}

@media (max-width: 640px) {
  .project-arrow {
    opacity: 1;
  }
}
</style>
