<template>
  <Transition name="terminal-fade">
    <div class="secret-overlay" v-if="isOpen" @click.self="close">
      <div class="secret-terminal">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="terminal-title">secret@jk.dev:~</div>
          <button class="close-btn" @click="close">✕</button>
        </div>

        <div class="terminal-body" ref="bodyRef">
          <div class="welcome-msg">
            <div class="welcome-line">Welcome to JK's secret terminal 👾</div>
            <div class="welcome-line muted">Type <span class="highlight">help</span> to see available commands.</div>
          </div>

          <div
            v-for="(entry, index) in history"
            :key="index"
            class="history-entry"
          >
            <div class="cmd-line">
              <span class="prompt">❯ </span>
              <span class="cmd-text">{{ entry.command }}</span>
            </div>
            <div class="cmd-output" v-html="entry.output"></div>
          </div>

          <div class="input-line">
            <span class="prompt">❯ </span>
            <input
              ref="inputRef"
              v-model="currentInput"
              @keydown.enter="executeCommand"
              @keydown.up="historyUp"
              @keydown.down="historyDown"
              class="terminal-input"
              placeholder="type a command..."
              spellcheck="false"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const currentInput = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)
const cmdHistory = ref<string[]>([])
const historyIndex = ref(-1)

interface HistoryEntry {
  command: string
  output: string
}

const history = ref<HistoryEntry[]>([])

const commands: Record<string, () => string> = {
  help: () => `
    <div class="output-grid">
      <span class="cmd-name">help</span><span class="cmd-desc">Show available commands</span>
      <span class="cmd-name">about</span><span class="cmd-desc">About John Kenneth</span>
      <span class="cmd-name">skills</span><span class="cmd-desc">List all skills</span>
      <span class="cmd-name">contact</span><span class="cmd-desc">Get contact info</span>
      <span class="cmd-name">joke</span><span class="cmd-desc">Get a dev joke</span>
      <span class="cmd-name">matrix</span><span class="cmd-desc">???</span>
      <span class="cmd-name">clear</span><span class="cmd-desc">Clear terminal</span>
      <span class="cmd-name">exit</span><span class="cmd-desc">Close terminal</span>
    </div>
  `,
  about: () => `
    <div class="output-block">
      <div class="output-line"><span class="key">Name:</span> John Kenneth Reside</div>
      <div class="output-line"><span class="key">Role:</span> Frontend Developer</div>
      <div class="output-line"><span class="key">Stack:</span> Vue.js, TypeScript, Tailwind</div>
      <div class="output-line"><span class="key">Location:</span> Philippines 🇵🇭</div>
      <div class="output-line"><span class="key">Status:</span> <span class="success">Available for work ✔</span></div>
    </div>
  `,
  skills: () => `
    <div class="output-block">
      <div class="output-line skill-bar">Vue.js      <span class="bar">████████████</span> 92%</div>
      <div class="output-line skill-bar">TypeScript  <span class="bar">███████████</span> 88%</div>
      <div class="output-line skill-bar">CSS/Tailwind <span class="bar">██████████</span> 85%</div>
      <div class="output-line skill-bar">Git         <span class="bar">█████████</span> 80%</div>
    </div>
  `,
  contact: () => `
    <div class="output-block">
      <div class="output-line"><span class="key">Email:</span> <span class="highlight">yourname@email.com</span></div>
      <div class="output-line"><span class="key">GitHub:</span> <span class="highlight">github.com/Saintzycodes</span></div>
      <div class="output-line"><span class="key">LinkedIn:</span> <span class="highlight">linkedin.com/in/yourname</span></div>
    </div>
  `,
  joke: () => {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?' 😂",
      "Why do Java developers wear glasses? Because they don't C#! 👓",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
      "I would tell you a UDP joke, but you might not get it. 📦"
    ]
    return `<div class="output-block"><div class="output-line joke">${jokes[Math.floor(Math.random() * jokes.length)]}</div></div>`
  },
  matrix: () => `
    <div class="output-block matrix-msg">
      <div class="output-line">Wake up, JK...</div>
      <div class="output-line">The Matrix has you...</div>
      <div class="output-line">Follow the white rabbit. 🐇</div>
      <div class="output-line muted">// You found the easter egg! 🎉</div>
    </div>
  `,
  clear: () => {
    history.value = []
    return ''
  },
  exit: () => {
    close()
    return ''
  }
}

const executeCommand = async () => {
  const cmd = currentInput.value.trim().toLowerCase()
  if (!cmd) return

  cmdHistory.value.unshift(cmd)
  historyIndex.value = -1

  const handler = commands[cmd]
  const output = handler
    ? handler()
    : `<div class="output-block"><div class="output-line error">command not found: ${cmd} — type <span class="highlight">help</span> for available commands</div></div>`

  if (cmd !== 'clear' && cmd !== 'exit') {
    history.value.push({ command: cmd, output })
  }

  currentInput.value = ''

  await nextTick()
  if (bodyRef.value) {
    bodyRef.value.scrollTop = bodyRef.value.scrollHeight
  }
}

const historyUp = () => {
  if (historyIndex.value < cmdHistory.value.length - 1) {
    historyIndex.value++
    currentInput.value = cmdHistory.value[historyIndex.value] || ''
  }
}

const historyDown = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--
    currentInput.value = cmdHistory.value[historyIndex.value] || ''
  } else {
    historyIndex.value = -1
    currentInput.value = ''
  }
}

const open = async () => {
  isOpen.value = true
  await nextTick()
  inputRef.value?.focus()
}

const close = () => {
  isOpen.value = false
  history.value = []
  currentInput.value = ''
}

const onKeyDown = (e: KeyboardEvent) => {
  const tag = (e.target as HTMLElement).tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  if (e.key === '/') {
    e.preventDefault()
    isOpen.value ? close() : open()
  }
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>

<style scoped>
.secret-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.secret-terminal {
  width: 640px;
  max-height: 80vh;
  background: #0d0d14;
  border: 0.5px solid rgba(0,245,196,0.4);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #14141e;
  border-bottom: 0.5px solid rgba(255,255,255,0.07);
  gap: 12px;
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
  flex: 1;
  text-align: center;
}

.close-btn {
  background: transparent;
  border: none;
  color: #666680;
  cursor: pointer;
  font-size: 12px;
  transition: color 0.2s;
}

.close-btn:hover { color: #00f5c4; }

.terminal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.welcome-msg {
  margin-bottom: 8px;
}

.welcome-line {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: #e8e8f0;
  line-height: 1.8;
}

.welcome-line.muted { color: #666680; }

.history-entry {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cmd-line {
  display: flex;
  align-items: center;
  gap: 4px;
}

.prompt { color: #00f5c4; font-family: 'Space Mono', monospace; font-size: 13px; }
.cmd-text { font-family: 'Space Mono', monospace; font-size: 12px; color: #00f5c4; }

.input-line {
  display: flex;
  align-items: center;
  gap: 4px;
}

.terminal-input {
  background: transparent;
  border: none;
  outline: none;
  color: #e8e8f0;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  flex: 1;
  caret-color: #00f5c4;
}

.terminal-fade-enter-active,
.terminal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.terminal-fade-enter-from,
.terminal-fade-leave-to {
  opacity: 0;
}
</style>

<style>
.output-block {
  padding: 4px 0 4px 16px;
  border-left: 2px solid rgba(0,245,196,0.3);
}

.output-line {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #e8e8f0;
  line-height: 2;
}

.output-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 4px 0;
  padding: 4px 0 4px 16px;
  border-left: 2px solid rgba(0,245,196,0.3);
}

.cmd-name {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #00f5c4;
}

.cmd-desc {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #666680;
}

.key { color: #7c3aed; margin-right: 8px; }
.highlight { color: #00f5c4; }
.success { color: #28c840; }
.error { color: #ff5f57; }
.muted { color: #666680; }
.joke { color: #febc2e; }

.skill-bar {
  display: flex;
  gap: 12px;
  align-items: center;
}

.bar { color: #00f5c4; letter-spacing: -1px; }

.matrix-msg .output-line {
  color: #00f5c4;
  animation: flicker 0.5s ease infinite alternate;
}

@keyframes flicker {
  from { opacity: 0.7; }
  to { opacity: 1; }
}
</style>