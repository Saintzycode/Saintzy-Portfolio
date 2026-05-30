<template>
  <section id="about" class="hero">
    <div class="hero-left">
      <div class="hero-tag">Frontend Developer</div>
      <h1 class="hero-title">
  <span class="glitch" data-text="Building">Building</span><br />
  <span class="glitch" data-text="interfaces">interfaces</span><br />
  <span class="glitch" data-text="that">that</span> <span class="glitch-accent" data-text="matter.">matter.</span>
</h1>
      <p class="hero-desc">
        I craft fast, accessible, and visually sharp web experiences
        using Vue.js and modern web technologies.
      </p>
      <div class="hero-btns">
        <button class="btn-primary" @click="scrollTo('projects')">View Projects</button>
        <button class="btn-outline" @click="downloadCV">Download CV</button>
      </div>
    </div>

    <div class="hero-visual">
  <div class="avatar-wrapper">
    <div class="card-bg-2"></div>
    <div class="card-bg-1"></div>
    <div class="card-main">
      <img src="@/assets/Main Profile.jpg" alt="John Kenneth Reside" class="profile-img" />
      <div class="card-badge">
        <span class="badge-dot"></span>
        Available for work
      </div>
    </div>
  </div>
</div>
    <div class="stats-row">
      <div class="stat" v-for="stat in stats" :key="stat.label">
        <span class="stat-num">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Stat {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '3+', label: 'Projects' },
  { value: '0+', label: 'Years Exp' },
  { value: '8+', label: 'Technologies' },
  { value: '100%', label: 'Passion' }
]

const scrollTo = (section: string) => {
  const el = document.getElementById(section)
  el?.scrollIntoView({ behavior: 'smooth' })
}

const downloadCV = () => {
  window.open('/cv.pdf', '_blank')
}
</script>

<style scoped>
.hero {
  background: transparent;
  padding: 64px 40px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 40px;
  align-items: center;
  position: relative;
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
  pointer-events: none;
  overflow: hidden;
}
.hero-tag {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #00f5c4;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-tag::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1px;
  background: #00f5c4;
}

.hero-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -1px;
  margin-bottom: 20px;
  color: #e8e8f0;
}

.hero-title span {
  color: #00f5c4;
}

.hero-desc {
  font-size: 14px;
  color: #666680;
  line-height: 1.7;
  max-width: 380px;
  margin-bottom: 32px;
}

.hero-btns {
  display: flex;
  gap: 12px;
}

.btn-primary {
  padding: 12px 24px;
  background: #00f5c4;
  color: #000;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-outline {
  padding: 12px 24px;
  background: transparent;
  color: #e8e8f0;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: 0.5px solid rgba(255,255,255,0.07);
  cursor: pointer;
  transition: border-color 0.2s;
}

.btn-outline:hover {
  border-color: #00f5c4;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.avatar-wrapper {
  position: relative;
  width: 280px;
  height: 340px;
}

.card-main {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  height: 340px;
  overflow: hidden;
  border: 1px solid rgba(0,245,196,0.4);
  z-index: 3;
  transition: transform 0.3s ease;
}

.avatar-wrapper:hover .card-main {
  transform: translate(-4px, -4px);
}

.card-bg-1 {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 280px;
  height: 340px;
  background: #7c3aed;
  z-index: 2;
  transition: transform 0.3s ease;
}

.avatar-wrapper:hover .card-bg-1 {
  transform: translate(4px, 4px);
}

.card-bg-2 {
  position: absolute;
  top: 22px;
  left: 22px;
  width: 280px;
  height: 340px;
  background: #00f5c4;
  opacity: 0.15;
  z-index: 1;
  transition: transform 0.3s ease;
}

.avatar-wrapper:hover .card-bg-2 {
  transform: translate(8px, 8px);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(15%);
  transition: filter 0.3s ease;
}

.avatar-wrapper:hover .profile-img {
  filter: grayscale(0%);
}

.card-badge {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(10,10,15,0.85);
  border: 0.5px solid rgba(0,245,196,0.4);
  padding: 6px 14px;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #00f5c4;
  letter-spacing: 1.5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(4px);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #00f5c4;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.avatar-rect:hover .overlay {
  opacity: 1;
  transform: translateY(0);
}

.overlay-text {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #00f5c4;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.overlay-sub {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  letter-spacing: 1px;
}

.corner {
  position: absolute;
  width: 20px;
  height: 20px;
}

.corner-tl {
  top: 12px;
  left: 12px;
  border-top: 2px solid #00f5c4;
  border-left: 2px solid #00f5c4;
}

.corner-br {
  bottom: 12px;
  right: 12px;
  border-bottom: 2px solid #00f5c4;
  border-right: 2px solid #00f5c4;
}
.stats-row {
  grid-column: 1 / -1;
  display: flex;
  gap: 24px;
  padding: 20px 0;
  border-top: 0.5px solid rgba(255,255,255,0.07);
}

.stat {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat + .stat {
  padding-left: 24px;
  border-left: 0.5px solid rgba(255,255,255,0.07);
}

.stat-num {
  font-size: 24px;
  font-weight: 800;
  color: #00f5c4;
  font-family: 'Space Mono', monospace;
}

.stat-label {
  font-size: 11px;
  color: #666680;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.glitch {
  position: relative;
  display: inline-block;
  color: #e8e8f0;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  color: #00f5c4;
  animation: glitch-1 4s infinite linear;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch::after {
  color: #7c3aed;
  animation: glitch-2 4s infinite linear;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

.glitch-accent {
  position: relative;
  display: inline-block;
  color: #00f5c4;
}

.glitch-accent::before,
.glitch-accent::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-accent::before {
  color: #7c3aed;
  animation: glitch-1 3s infinite linear;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.glitch-accent::after {
  color: #ffffff;
  animation: glitch-2 3s infinite linear;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0%, 90%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  91% {
    transform: translate(-3px, 1px);
    opacity: 1;
  }
  92% {
    transform: translate(3px, -1px);
    opacity: 1;
  }
  93% {
    transform: translate(-2px, 2px);
    opacity: 1;
  }
  94% {
    transform: translate(0);
    opacity: 0;
  }
}

@keyframes glitch-2 {
  0%, 85%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  86% {
    transform: translate(3px, 1px);
    opacity: 1;
  }
  87% {
    transform: translate(-3px, -1px);
    opacity: 1;
  }
  88% {
    transform: translate(2px, -2px);
    opacity: 1;
  }
  89% {
    transform: translate(0);
    opacity: 0;
  }
}
</style>
