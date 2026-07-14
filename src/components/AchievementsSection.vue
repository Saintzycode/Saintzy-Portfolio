<template>
  <section id="achievements" class="achievements" ref="elementRef">
    <div class="section-label" :class="{ revealed: revealed }">// 04 — Achievements</div>
    <h2 class="section-title" :class="{ revealed: revealed }">Certifications & Badges</h2>

    <n-carousel
      effect="card"
      prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
      next-slide-style="transform: translateX(50%) translateZ(-800px);"
      :show-dots="false"
      :autoplay="true"
      :loop="true"
      class="badges-carousel"
    >
      <n-carousel-item v-for="(badge, index) in badges" :key="`${badge.id}-${index}`" :style="{ width: '60%' }">
        <div class="badge-card">
          <div class="badge-art">
            <img :src="badge.image" :alt="`${badge.title} badge`" />
          </div>
          <div class="badge-info">
            <div class="badge-meta">
              <span class="badge-date">{{ badge.date }}</span>
              <span class="badge-tag" :style="{ borderColor: badge.color, color: badge.color }">
                {{ badge.category }}
              </span>
            </div>
            <div class="badge-title">{{ badge.title }}</div>
            <div class="badge-issuer">{{ badge.issuer }}</div>
          </div>
        </div>
      </n-carousel-item>
    </n-carousel>

    <div class="stats-badges" :class="{ revealed: revealed }">
      <div class="stat-badge" v-for="stat in stats" :key="stat.label">
        <div class="stat-badge-num">{{ stat.value }}</div>
        <div class="stat-badge-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { NCarousel, NCarouselItem } from 'naive-ui'
import { useScrollReveal } from '@/composables/useScrollReveal'
import cssBadge from '@/assets/badges/ccna-introduction-to-networks.png'
import frontendBadge from '@/assets/badges/frontend-badge.svg'
import gitBadge from '@/assets/badges/git-badge.svg'
import typescriptBadge from '@/assets/badges/typescript-badge.svg'
import uiuxBadge from '@/assets/badges/uiux-badge.svg'
import vueBadge from '@/assets/badges/vue-badge.svg'

interface Badge {
  id: number
  icon: string
  title: string
  issuer: string
  date: string
  category: string
  color: string
  image: string
}

interface Stat {
  value: string
  label: string
}

const badges: Badge[] = [
  {
    id: 1,
    icon: '⬡',
    title: 'Lorem Ipsum Certificate',
    issuer: 'Lorem Institute',
    date: 'Jan 2024',
    category: 'Frontend',
    color: '#00f5c4',
    image: frontendBadge
  },
  {
    id: 2,
    icon: '⬡',
    title: 'Dolor Sit Amet',
    issuer: 'Ipsum Academy',
    date: 'Mar 2024',
    category: 'Vue.js',
    color: '#7c3aed',
    image: vueBadge
  },
  {
    id: 3,
    icon: '⬡',
    title: 'Consectetur Adipiscing',
    issuer: 'Lorem University',
    date: 'Jun 2024',
    category: 'TypeScript',
    color: '#00f5c4',
    image: typescriptBadge
  },
  {
    id: 4,
    icon: '⬡',
    title: 'CCNA 1',
    issuer: 'Universidad De Dagupan',
    date: 'Jun 2026',
    category: 'CISCO',
    color: '#7c3aed',
    image: cssBadge
  },
  {
    id: 5,
    icon: '⬡',
    title: 'Tempor Incididunt',
    issuer: 'Amet Academy',
    date: 'Oct 2024',
    category: 'UI/UX',
    color: '#00f5c4',
    image: uiuxBadge
  },
  {
    id: 6,
    icon: '⬡',
    title: 'Ut Labore Et Dolore',
    issuer: 'Ipsum Institute',
    date: 'Dec 2024',
    category: 'Git',
    color: '#7c3aed',
    image: gitBadge
  }
]

const stats: Stat[] = [
  { value: '6+', label: 'Certifications' },
  { value: '3+', label: 'Awards' },
  { value: '10+', label: 'Courses' },
  { value: '2+', label: 'Hackathons' }
]

const { revealed, elementRef } = useScrollReveal()
</script>

<style scoped>
.achievements {
  padding: clamp(48px, 8vw, 64px) clamp(16px, 5vw, 40px);
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
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
  margin-bottom: 18px;
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

.badges-carousel {
  height: 280px;
  margin: 0 0 38px;
}

.badge-card {
  background: #14141e;
  border: 0.5px solid rgba(255,255,255,0.07);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
  cursor: default;
  min-width: 0;
  height: 100%;
}

.badge-card:hover {
  border-color: rgba(0,245,196,0.3);
}

.badge-art {
  aspect-ratio: 16 / 9.5;
  background: #0f0f17;
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
  overflow: hidden;
  padding: 11px;
}

.badge-art img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.35s ease, filter 0.35s ease;
}

.badge-card:hover .badge-art img {
  transform: scale(1.03);
  filter: saturate(1.12);
}

.badge-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  padding: 16px 18px 18px;
}

.badge-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.badge-title {
  font-size: 15px;
  font-weight: 700;
  color: #e8e8f0;
  margin-bottom: 5px;
  overflow-wrap: anywhere;
}

.badge-issuer {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #666680;
  margin-bottom: 4px;
}

.badge-date {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  color: #444460;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.badge-tag {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  padding: 4px 9px;
  border: 0.5px solid;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.stats-badges {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  max-width: 1140px;
  margin: 0 auto;
  border: 0.5px solid rgba(255,255,255,0.07);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
}

.stats-badges.revealed {
  opacity: 1;
  transform: translateY(0);
}

.stat-badge {
  padding: 24px;
  text-align: center;
  border-right: 0.5px solid rgba(255,255,255,0.07);
}

.stat-badge:last-child {
  border-right: none;
}

.stat-badge-num {
  font-family: 'Space Mono', monospace;
  font-size: 28px;
  font-weight: 700;
  color: #00f5c4;
  margin-bottom: 6px;
}

.stat-badge-label {
  font-size: 11px;
  color: #666680;
  letter-spacing: 1px;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .stats-badges {
    grid-template-columns: 1fr;
  }

  .stat-badge {
    border-right: none;
    border-bottom: 0.5px solid rgba(255,255,255,0.07);
  }

  .stat-badge:last-child {
    border-bottom: none;
  }
}

@media (max-width: 420px) {
  .badge-meta {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
