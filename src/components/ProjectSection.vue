<template>
  <section id="projects" class="projects" ref="elementRef">
    <div class="section-header">
      <div class="section-label" :class="{ revealed }">// 02 — Work</div>
      <h2 class="section-title" :class="{ revealed }">Featured Projects</h2>
      <div class="carousel-controls" :class="{ revealed }">
        <button type="button" class="carousel-btn" aria-label="Previous project" @click="scrollProjects(-1)">
          Prev
        </button>
        <button type="button" class="carousel-btn" aria-label="Next project" @click="scrollProjects(1)">
          Next
        </button>
      </div>
    </div>

    <div
      class="projects-grid"
      ref="projectsCarousel"
      @focusin="pauseProjectAutoSlide"
      @focusout="resumeProjectAutoSlide"
    >
      <div
        v-for="(project, index) in carouselProjects"
        :key="`${project.id}-${index}`"
        class="project-card card-hidden"
        :class="{ 'card-revealed': revealed }"
        :style="{ transitionDelay: `${index * 0.15}s` }"
        @click="openLink(project.link)"
      >
        <div class="project-num">0{{ index + 1 }} —</div>
        <div class="project-media">
          <img :src="project.image" :alt="`${project.title} preview`" />
          <div class="project-type">{{ project.type }}</div>
        </div>
        <div class="project-body">
          <div class="project-title">{{ project.title }}</div>
        <div class="project-desc">{{ project.description }}</div>
        <div class="project-tags">
          <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
        </div>
        <div class="project-arrow">→</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { projects } from '@/data/projects'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { revealed, elementRef } = useScrollReveal()
const projectsCarousel = ref<HTMLElement | null>(null)
const carouselProjects = computed(() => [...projects, ...projects])
let projectAutoSlide: number | undefined
let projectButtonAnimation: number | undefined
let lastProjectFrame = 0
let projectScrollPosition = 0

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const scrollProjects = (direction: number) => {
  const carousel = projectsCarousel.value
  if (!carousel) return
  pauseProjectAutoSlide()

  const card = carousel.querySelector<HTMLElement>('.project-card')
  const distance = card ? card.offsetWidth + 20 : carousel.clientWidth
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth
  if (maxScrollLeft <= 2) return

  let target = carousel.scrollLeft + direction * distance
  if (direction > 0 && carousel.scrollLeft >= maxScrollLeft - 4) {
    target = 0
  }

  if (direction < 0 && carousel.scrollLeft <= 4) {
    target = maxScrollLeft
  }

  animateProjectsTo(Math.max(0, Math.min(target, maxScrollLeft)))
}

const animateProjectsTo = (target: number) => {
  const carousel = projectsCarousel.value
  if (!carousel) return

  const start = carousel.scrollLeft
  const distance = target - start
  const duration = 520
  const startTime = performance.now()

  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    projectScrollPosition = start + distance * eased
    carousel.scrollLeft = projectScrollPosition

    if (progress < 1) {
      projectButtonAnimation = window.requestAnimationFrame(step)
      return
    }

    projectButtonAnimation = undefined
    resumeProjectAutoSlide()
  }

  projectButtonAnimation = window.requestAnimationFrame(step)
}

const pauseProjectAutoSlide = () => {
  if (projectAutoSlide) window.cancelAnimationFrame(projectAutoSlide)
  if (projectButtonAnimation) window.cancelAnimationFrame(projectButtonAnimation)
  projectAutoSlide = undefined
  projectButtonAnimation = undefined
  lastProjectFrame = 0
}

const animateProjects = (timestamp: number) => {
  const carousel = projectsCarousel.value
  if (carousel) {
    const halfWidth = carousel.scrollWidth / 2
    const delta = lastProjectFrame ? timestamp - lastProjectFrame : 0
    if (!lastProjectFrame) projectScrollPosition = carousel.scrollLeft
    projectScrollPosition += delta * 0.055

    if (projectScrollPosition >= halfWidth) {
      projectScrollPosition -= halfWidth
    }

    carousel.scrollLeft = projectScrollPosition
  }

  lastProjectFrame = timestamp
  projectAutoSlide = window.requestAnimationFrame(animateProjects)
}

const resumeProjectAutoSlide = () => {
  pauseProjectAutoSlide()
  projectScrollPosition = projectsCarousel.value?.scrollLeft ?? 0
  projectAutoSlide = window.requestAnimationFrame(animateProjects)
}

onMounted(resumeProjectAutoSlide)
onUnmounted(pauseProjectAutoSlide)
</script>

<style scoped>
.projects {
  background: transparent;
  padding: clamp(48px, 8vw, 64px) clamp(16px, 5vw, 40px);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.07);
}

/* Section Header */
.section-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 16px;
  margin-bottom: 32px;
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #00f5c4;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
  grid-column: 1;
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
  grid-column: 1;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease 0.1s;
}

.carousel-controls {
  display: flex;
  gap: 8px;
  grid-column: 2;
  grid-row: 1 / span 2;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease 0.15s;
}

.carousel-controls.revealed {
  opacity: 1;
  transform: translateY(0);
}

.carousel-btn {
  background: #14141e;
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  color: #e8e8f0;
  cursor: pointer;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
  min-width: 56px;
  padding: 9px 12px;
  text-transform: uppercase;
  transition: border-color 0.2s, color 0.2s;
}

.carousel-btn:hover {
  border-color: #00f5c4;
  color: #00f5c4;
}

.section-label.revealed,
.section-title.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Grid */
.projects-grid {
  display: flex;
  gap: 20px;
  margin-inline: -6px;
  overflow-x: auto;
  padding: 6px 6px 14px;
  scroll-behavior: auto;
  scrollbar-width: none;
  will-change: scroll-position;
}

.projects-grid::-webkit-scrollbar {
  display: none;
}

/* Card */
.project-card {
  background: #14141e;
  border: 0.5px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex: 0 0 clamp(360px, 48vw, 620px);
  flex-direction: column;
  min-height: 100%;
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
  transform: translateY(-4px);
}

.project-card:hover::before {
  transform: scaleX(1);
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

.project-media {
  position: relative;
  order: 1;
  aspect-ratio: 16 / 10;
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
  flex: 1;
  flex-direction: column;
  order: 3;
  padding: 0 22px 22px;
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

@media (max-width: 980px) {
  .project-card {
    flex-basis: min(430px, calc(100vw - 52px));
  }
}

@media (max-width: 640px) {
  .section-header {
    grid-template-columns: 1fr;
  }

  .carousel-controls {
    grid-column: 1;
    grid-row: auto;
    justify-content: flex-start;
  }

  .project-card {
    flex-basis: calc(100vw - 44px);
  }

  .project-card {
    min-height: auto;
  }

  .project-arrow {
    opacity: 1;
  }
}
</style>
