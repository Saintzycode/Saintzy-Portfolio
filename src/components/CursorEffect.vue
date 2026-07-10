<template>
  <div>
    <div class="cursor-dot" ref="dot"></div>
    <div class="cursor-ring" ref="ring"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)

let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let animationId: number
let cursorEnabled = false

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY

  if (dot.value) {
    dot.value.style.left = `${mouseX}px`
    dot.value.style.top = `${mouseY}px`
  }
}

const onMouseEnterLink = () => {
  if (ring.value) {
    ring.value.style.width = '50px'
    ring.value.style.height = '50px'
    ring.value.style.borderColor = '#7c3aed'
    ring.value.style.backgroundColor = 'rgba(124,58,237,0.1)'
  }
  if (dot.value) {
    dot.value.style.opacity = '0'
  }
}

const onMouseLeaveLink = () => {
  if (ring.value) {
    ring.value.style.width = '32px'
    ring.value.style.height = '32px'
    ring.value.style.borderColor = '#00f5c4'
    ring.value.style.backgroundColor = 'transparent'
  }
  if (dot.value) {
    dot.value.style.opacity = '1'
  }
}

const animateRing = () => {
  ringX += (mouseX - ringX) * 0.12
  ringY += (mouseY - ringY) * 0.12

  if (ring.value) {
    ring.value.style.left = `${ringX}px`
    ring.value.style.top = `${ringY}px`
  }

  animationId = requestAnimationFrame(animateRing)
}

onMounted(() => {
  cursorEnabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!cursorEnabled) return

  document.addEventListener('mousemove', onMouseMove)
  animateRing()

  const interactables = document.querySelectorAll(
    'a, button, li, .project-card, .contact-link, .tool-badge'
  )
  interactables.forEach(el => {
    el.addEventListener('mouseenter', onMouseEnterLink)
    el.addEventListener('mouseleave', onMouseLeaveLink)
  })

  document.body.style.cursor = 'none'
})

onUnmounted(() => {
  if (!cursorEnabled) return

  document.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animationId)
  document.body.style.cursor = 'default'
})
</script>

<style scoped>
.cursor-dot {
  position: fixed;
  width: 6px;
  height: 6px;
  background: #00f5c4;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s;
}

.cursor-ring {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 1.5px solid #00f5c4;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s;
}

@media (hover: none), (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}
</style>
