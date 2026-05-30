<template>
  <div class="player" :class="{ expanded: isExpanded }">
    <div class="player-bar" @click="toggleExpand">
      <div class="player-left">
        <div class="vinyl" :class="{ spinning: isPlaying }">
          <div class="vinyl-inner"></div>
        </div>
        <div class="track-info">
          <div class="track-name">{{ currentTrack?.name }}</div>
          <div class="track-artist">{{ currentTrack?.artist }}</div>
        </div>
      </div>
      <div class="player-controls" @click.stop>
        <button class="ctrl-btn" @click="prevTrack">⏮</button>
        <button class="ctrl-btn play-btn" @click="togglePlay">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="ctrl-btn" @click="nextTrack">⏭</button>
      </div>
      <div class="player-right" @click.stop>
        <input
          type="range"
          min="0"
          max="100"
          v-model="volume"
          @input="updateVolume"
          class="volume-slider"
        />
        <span class="vol-icon">{{ volume > 0 ? '🔊' : '🔇' }}</span>
      </div>
    </div>

    <div class="progress-bar" v-if="isExpanded">
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="time-row">
        <span>{{ currentTime }}</span>
        <span>{{ duration }}</span>
      </div>
    </div>

    <div class="tracklist" v-if="isExpanded">
      <div
        v-for="(track, index) in tracks"
        :key="index"
        class="track-item"
        :class="{ active: currentIndex === index }"
        @click="selectTrack(index)"
      >
        <span class="track-num">{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</span>
        <span class="track-item-name">{{ track.name }}</span>
        <span class="track-item-artist">{{ track.artist }}</span>
        <span class="track-playing" v-if="currentIndex === index && isPlaying">▶</span>
      </div>
    </div>
  </div>

  <audio ref="audio" @timeupdate="onTimeUpdate" @ended="nextTrack" @loadedmetadata="onLoadedMetadata"></audio>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Track {
  name: string
  artist: string
  url: string
}

const tracks: Track[] = [
  {
    name: 'Lofi Study',
    artist: 'Chillhop Music',
    url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
  },
  {
    name: 'Late Night Coding',
    artist: 'Lo-fi Beats',
    url: 'https://cdn.pixabay.com/audio/2022/10/25/audio_946b0939a5.mp3'
  },
  {
    name: 'Chill Vibes',
    artist: 'Ambient Mix',
    url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3'
  }
]

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isExpanded = ref(false)
const currentIndex = ref(0)
const volume = ref(50)
const progress = ref(0)
const currentTime = ref('0:00')
const duration = ref('0:00')

const currentTrack = computed(() => tracks[currentIndex.value])

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' + s : s}`
}

const loadTrack = () => {
  if (audio.value && currentTrack.value) {
    audio.value.src = currentTrack.value.url
    audio.value.load()
    if (isPlaying.value) audio.value.play()
  }
}

const togglePlay = () => {
  if (!audio.value) return
  if (isPlaying.value) {
    audio.value.pause()
    isPlaying.value = false
  } else {
    audio.value.play()
    isPlaying.value = true
  }
}

const nextTrack = () => {
  currentIndex.value = (currentIndex.value + 1) % tracks.length
  loadTrack()
}

const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + tracks.length) % tracks.length
  loadTrack()
}

const selectTrack = (index: number) => {
  currentIndex.value = index
  isPlaying.value = true
  loadTrack()
}

const updateVolume = () => {
  if (audio.value) audio.value.volume = volume.value / 100
}

const onTimeUpdate = () => {
  if (audio.value) {
    progress.value = (audio.value.currentTime / audio.value.duration) * 100 || 0
    currentTime.value = formatTime(audio.value.currentTime)
  }
}

const onLoadedMetadata = () => {
  if (audio.value) duration.value = formatTime(audio.value.duration)
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  if (audio.value) {
    audio.value.volume = volume.value / 100
    if (currentTrack.value) audio.value.src = currentTrack.value.url
  }
})

watch(currentIndex, () => loadTrack())
</script>

<style scoped>
.player {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 320px;
  background: rgba(13, 13, 20, 0.95);
  border: 0.5px solid rgba(0,245,196,0.3);
  border-radius: 12px;
  z-index: 1000;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.player-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  gap: 12px;
}

.player-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.vinyl {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: conic-gradient(#00f5c4, #7c3aed, #0a0a0f, #00f5c4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.vinyl.spinning {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vinyl-inner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0a0a0f;
  border: 2px solid rgba(0,245,196,0.5);
}

.track-info {
  min-width: 0;
}

.track-name {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #e8e8f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  font-size: 10px;
  color: #666680;
  margin-top: 2px;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ctrl-btn {
  background: transparent;
  border: none;
  color: #666680;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 6px;
  transition: color 0.2s;
}

.ctrl-btn:hover { color: #00f5c4; }

.play-btn {
  color: #00f5c4;
  font-size: 14px;
}

.player-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.volume-slider {
  width: 50px;
  accent-color: #00f5c4;
}

.vol-icon {
  font-size: 12px;
}

.progress-bar {
  padding: 0 16px 8px;
}

.progress-track {
  height: 2px;
  background: #1a1a24;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f5c4, #7c3aed);
  transition: width 0.5s linear;
}

.time-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  color: #666680;
  margin-top: 4px;
}

.tracklist {
  border-top: 0.5px solid rgba(255,255,255,0.07);
  max-height: 160px;
  overflow-y: auto;
}

.track-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 0.5px solid rgba(255,255,255,0.03);
}

.track-item:hover {
  background: rgba(0,245,196,0.05);
}

.track-item.active {
  background: rgba(0,245,196,0.08);
}

.track-num {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  color: #666680;
  min-width: 16px;
}

.track-item-name {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  color: #e8e8f0;
  flex: 1;
}

.track-item-artist {
  font-size: 10px;
  color: #666680;
}

.track-playing {
  font-size: 8px;
  color: #00f5c4;
}
</style>