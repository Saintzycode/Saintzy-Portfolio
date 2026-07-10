<template>
  <div class="intro" v-if="visible" :class="{ 'fade-out': fadingOut }">
    <canvas ref="canvas" class="intro-stars"></canvas>
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="terminal-title">jk@portfolio:~</div>
      </div>

      <div class="terminal-body">
        <div
          v-for="(line, index) in visibleLines"
          :key="index"
          class="terminal-line"
        >
          <span class="prompt" v-if="line.type === 'command'">❯ </span>
          <span
            :class="{
              'text-accent': line.type === 'command',
              'text-muted': line.type === 'output',
              'text-success': line.type === 'success',
              'text-purple': line.type === 'purple'
            }"
          >{{ line.text }}</span>
          <span class="cursor" v-if="index === visibleLines.length - 1 && !done">█</span>
        </div>

        <div class="enter-btn-row" v-if="done">
          <button class="enter-btn" @click="handleEnter">
            <span>ENTER PORTFOLIO</span>
            <span class="btn-cursor">_</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['done'])

interface Line {
  text: string
  type: 'command' | 'output' | 'success' | 'purple'
  delay: number
}

const lines: Line[] = [
  { text: 'Initializing portfolio...', type: 'command', delay: 300 },
  { text: 'Loading modules...', type: 'output', delay: 600 },
  { text: '[██████████] 100%', type: 'output', delay: 900 },
  { text: 'Importing Vue.js framework...', type: 'command', delay: 1300 },
  { text: '✔ Vue 3 loaded successfully', type: 'success', delay: 1700 },
  { text: 'Importing TypeScript...', type: 'command', delay: 2000 },
  { text: '✔ TypeScript compiled', type: 'success', delay: 2400 },
  { text: 'Importing Tailwind CSS...', type: 'command', delay: 2700 },
  { text: '✔ Styles loaded', type: 'success', delay: 3000 },
  { text: 'Connecting to JK.dev...', type: 'command', delay: 3400 },
  { text: '✔ Connection established', type: 'success', delay: 3800 },
  { text: '> Welcome to JK\'s Portfolio', type: 'purple', delay: 4300 },
  { text: '> Frontend Developer | Vue.js | TypeScript', type: 'purple', delay: 4700 },
]

const visibleLines = ref<Line[]>([])
const done = ref(false)
const visible = ref(true)
const fadingOut = ref(false)
const canvas = ref<HTMLCanvasElement | null>(null)
let animationId: number

onMounted(() => {
  lines.forEach((line) => {
    setTimeout(() => {
      visibleLines.value.push(line)
    }, line.delay)
  })

  setTimeout(() => {
    done.value = true
  }, 5200)

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

const handleEnter = () => {
  fadingOut.value = true
  cancelAnimationFrame(animationId)
  setTimeout(() => {
    visible.value = false
    emit('done')
  }, 800)
}
</script>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  background: #0a0a0f;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  transition: opacity 0.8s ease;
}

.intro.fade-out {
  opacity: 0;
}

.intro-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.terminal {
  width: min(600px, 100%);
  background: rgba(13,13,20,0.85);
  border: 0.5px solid rgba(0,245,196,0.3);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #14141e;
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.terminal-title {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #666680;
  letter-spacing: 1px;
  margin: 0 auto;
}

.terminal-body {
  padding: clamp(16px, 5vw, 24px);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terminal-line {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  display: flex;
  align-items: center;
  gap: 4px;
  animation: fadeInLine 0.2s ease;
  min-width: 0;
  overflow-wrap: anywhere;
}

@keyframes fadeInLine {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

.prompt { color: #00f5c4; }
.text-accent { color: #00f5c4; }
.text-muted { color: #666680; }
.text-success { color: #28c840; }
.text-purple { color: #7c3aed; font-weight: 700; }

.cursor {
  color: #00f5c4;
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.enter-btn-row {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.enter-btn {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  letter-spacing: 3px;
  color: #000;
  background: #00f5c4;
  border: none;
  padding: 14px 32px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.2s;
  animation: fadeInLine 0.4s ease;
}

.enter-btn:hover {
  opacity: 0.85;
}

.btn-cursor {
  animation: blink 1s step-end infinite;
}

@media (max-width: 520px) {
  .terminal-body {
    min-height: 260px;
  }

  .terminal-line {
    font-size: 11px;
  }

  .enter-btn {
    width: 100%;
    justify-content: center;
    padding-inline: 16px;
    font-size: 11px;
    letter-spacing: 2px;
  }
}
</style>
