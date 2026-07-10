<template>
  <nav class="nav">
    <div class="logo">
      <LogoIcon :size="64" />
      <span>John Kenneth Reside.dev</span>
    </div>
    <ul class="nav-links">
      <li v-for="link in links" :key="link" @click="scrollTo(link)">
        {{ link }}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon.vue'

const links = ['About', 'Projects', 'Skills', 'Achievements', 'GitHub', 'Contact']

const scrollTo = (section: string) => {
  const el = document.getElementById(section.toLowerCase())
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 18px clamp(16px, 5vw, 40px);
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
  background: rgba(10,10,15,0.7);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  min-width: 0;
}

.logo span {
  font-family: 'Space Mono', monospace;
  font-size: clamp(11px, 2vw, 13px);
  color: #00f5c4;
  letter-spacing: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  justify-content: flex-end;
  gap: clamp(12px, 2.5vw, 28px);
  list-style: none;
  flex-wrap: wrap;
}

.nav-links li {
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #666680;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-links li:hover {
  color: #00f5c4;
}

@media (max-width: 820px) {
  .nav {
    align-items: flex-start;
    flex-direction: column;
    padding-block: 14px;
  }

  .nav-links {
    width: 100%;
    justify-content: flex-start;
    row-gap: 10px;
  }
}

@media (max-width: 520px) {
  .logo :deep(svg) {
    width: 44px;
    height: 44px;
  }

  .logo span {
    max-width: calc(100vw - 96px);
  }

  .nav-links {
    gap: 8px 14px;
  }

  .nav-links li {
    font-size: 10px;
    letter-spacing: 1px;
  }
}
</style>
