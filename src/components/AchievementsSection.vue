<template>
  <section id="achievements" class="achievements" ref="elementRef">
    <div class="section-label" :class="{ revealed: revealed }">// 04 — Achievements</div>
    <h2 class="section-title" :class="{ revealed: revealed }">Certifications & Badges</h2>

    <div class="badges-grid">
      <div
        v-for="(badge, index) in badges"
        :key="badge.id"
        class="badge-card badge-hidden"
        :class="{ 'badge-revealed': revealed }"
        :style="{ transitionDelay: `${index * 0.1}s` }"
      >
        <div class="badge-icon">{{ badge.icon }}</div>
        <div class="badge-info">
          <div class="badge-title">{{ badge.title }}</div>
          <div class="badge-issuer">{{ badge.issuer }}</div>
          <div class="badge-date">{{ badge.date }}</div>
        </div>
        <div class="badge-tag" :style="{ borderColor: badge.color, color: badge.color }">
          {{ badge.category }}
        </div>
      </div>
    </div>

    <div class="stats-badges" :class="{ revealed: revealed }">
      <div class="stat-badge" v-for="stat in stats" :key="stat.label">
        <div class="stat-badge-num">{{ stat.value }}</div>
        <div class="stat-badge-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

interface Badge {
  id: number
  icon: string
  title: string
  issuer: string
  date: string
  category: string
  color: string
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
    color: '#00f5c4'
  },
  {
    id: 2,
    icon: '⬡',
    title: 'Dolor Sit Amet',
    issuer: 'Ipsum Academy',
    date: 'Mar 2024',
    category: 'Vue.js',
    color: '#7c3aed'
  },
  {
    id: 3,
    icon: '⬡',
    title: 'Consectetur Adipiscing',
    issuer: 'Lorem University',
    date: 'Jun 2024',
    category: 'TypeScript',
    color: '#00f5c4'
  },
  {
    id: 4,
    icon: '⬡',
    title: 'Sed Do Eiusmod',
    issuer: 'Dolor Institute',
    date: 'Aug 2024',
    category: 'CSS',
    color: '#7c3aed'
  },
  {
    id: 5,
    icon: '⬡',
    title: 'Tempor Incididunt',
    issuer: 'Amet Academy',
    date: 'Oct 2024',
    category: 'UI/UX',
    color: '#00f5c4'
  },
  {
    id: 6,
    icon: '⬡',
    title: 'Ut Labore Et Dolore',
    issuer: 'Ipsum Institute',
    date: 'Dec 2024',
    category: 'Git',
    color: '#7c3aed'
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

.badges-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.badge-card {
  background: #14141e;
  border: 0.5px solid rgba(255,255,255,0.07);
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  transition: border-color 0.2s, transform 0.2s;
  cursor: default;
}

.badge-card:hover {
  border-color: rgba(0,245,196,0.3);
  transform: translateY(-3px);
}

.badge-hidden {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.badge-revealed {
  opacity: 1;
  transform: translateY(0);
}

.badge-icon {
  font-size: 28px;
  color: #00f5c4;
  line-height: 1;
  flex-shrink: 0;
}

.badge-info {
  flex: 1;
  min-width: 0;
}

.badge-title {
  font-size: 13px;
  font-weight: 700;
  color: #e8e8f0;
  margin-bottom: 4px;
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
}

.badge-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  padding: 3px 8px;
  border: 0.5px solid;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.stats-badges {
  display: flex;
  gap: 0;
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
  flex: 1;
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
</style>