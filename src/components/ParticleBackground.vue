<template>
  <canvas ref="canvas" class="starfield"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animationId: number

onMounted(() => {
  const c = canvas.value!
  const ctx = c.getContext('2d')!

  c.width = window.innerWidth
  c.height = window.innerHeight

  const handleResize = () => {
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  interface Star {
    x: number
    y: number
    size: number
    opacity: number
    speed: number
    color: string
    twinkleSpeed: number
    twinkleOffset: number
  }

  const colors = ['#ffffff', '#00f5c4', '#7c3aed', '#ffffff', '#ffffff']

  const stars: Star[] = Array.from({ length: 150 }, (): Star => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.7 + 0.1,
    speed: Math.random() * 0.15 + 0.05,
    color: colors[Math.floor(Math.random() * colors.length)] as string,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2
  }))

  let frame = 0

  const draw = () => {
    ctx.clearRect(0, 0, c.width, c.height)
    frame++

    stars.forEach(star => {
      const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset)
      const currentOpacity = star.opacity + twinkle * 0.3

      star.y += star.speed
      if (star.y > c.height) {
        star.y = 0
        star.x = Math.random() * c.width
      }

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = star.color
      ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity))
      ctx.fill()

      if (star.size > 1) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = Math.max(0, currentOpacity * 0.08)
        ctx.fill()
      }

      ctx.globalAlpha = 1
    })

    animationId = requestAnimationFrame(draw)
  }

  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
.starfield {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  display: block;
}
</style>