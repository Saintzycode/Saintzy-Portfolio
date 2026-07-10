<template>
  <div class="music-player" :class="{ 'is-expanded': isExpanded }">
    <div class="music-player__shell" @click="toggleExpand">
      <div class="music-player__cover-wrap">
        <img
          class="music-player__cover"
          :src="currentTrack.cover"
          :alt="currentTrack.alt"
        />
        <div class="music-player__cover-overlay"></div>
        <span class="music-player__badge">{{ isPlaying ? 'Playing' : 'Ready' }}</span>
      </div>

      <div class="music-player__content">
        <div class="music-player__meta">
          <p class="music-player__eyebrow">Now playing</p>
          <h3>{{ currentTrack.name }}</h3>
          <p class="music-player__artist">{{ currentTrack.artist }}</p>
        </div>

        <div class="music-player__controls" @click.stop>
          <button class="icon-btn" type="button" aria-label="Shuffle music" @click="shuffleTrack">
            <span class="material-symbols-outlined music-player__material-icon" aria-hidden="true">
              shuffle
            </span>
          </button>
          <button class="icon-btn" type="button" aria-label="Previous track" @click="prevTrack">
            <svg class="music-player__transport-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 6v12l-8.5-6.07V18h-2V6h2v6.07L19 6z"></path>
            </svg>
          </button>
          <button
            class="icon-btn icon-btn--primary"
            type="button"
            :aria-label="isPlaying ? 'Pause music' : 'Play music'"
            @click="togglePlay"
          >
            <svg v-if="isPlaying" class="music-player__transport-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 6h3v12H7V6zm7 0h3v12h-3V6z"></path>
            </svg>
            <svg v-else class="music-player__transport-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5z"></path>
            </svg>
          </button>
          <button class="icon-btn" type="button" aria-label="Next track" @click="nextTrack">
            <svg class="music-player__transport-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 18V6l8.5 6.07V6h2v12h-2v-6.07L5 18z"></path>
            </svg>
          </button>
          <button class="icon-btn" type="button" aria-label="Restart song" @click="restartTrack">
            <svg class="music-player__transport-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5a7 7 0 1 1-6.93 6H3l3.5-3.5L10 11H7.91A5 5 0 1 0 12 7v2l4-3-4-3v2z"></path>
            </svg>
          </button>
        </div>

        <div class="music-player__progress" v-if="isExpanded" @click.stop>
          <div class="music-player__progress-track">
            <div class="music-player__progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="music-player__time-row">
            <span>{{ currentTime }}</span>
            <span>{{ duration }}</span>
          </div>
        </div>

        <div class="music-player__extras" v-if="isExpanded" @click.stop>
          <div class="music-player__volume-row">
            <label for="music-volume">Volume</label>
            <input
              id="music-volume"
              v-model.number="volume"
              class="music-player__volume"
              type="range"
              min="0"
              max="100"
            />
            <span>{{ volume }}%</span>
          </div>

          <div class="music-player__tracklist">
            <button
              v-for="(track, index) in tracks"
              :key="track.name"
              type="button"
              class="music-player__track"
              :class="{ 'is-active': currentIndex === index }"
              @click="selectTrack(index)"
            >
              <span class="music-player__track-index">{{ formatIndex(index) }}</span>
              <span class="music-player__track-text">
                <strong>{{ track.name }}</strong>
                <small>{{ track.artist }}</small>
              </span>
              <span v-if="currentIndex === index && isPlaying" class="music-player__track-state">
                ▶
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <audio
      ref="audio"
      @timeupdate="onTimeUpdate"
      @ended="nextTrack"
      @loadedmetadata="onLoadedMetadata"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import profileImage from '@/assets/profile.jpg'
import herTrack from '@/assets/audio/JVKE - her (official lyric video).mp3'
import sagipTrack from '@/assets/audio/Sagip - Jan Roberts (Lyric Visualizer).mp3'
import theManWhoCanTBeMovedTrack from '@/assets/audio/The Script - The Man Who Can’t Be Moved (Official Video).mp3'

type Track = {
  name: string
  artist: string
  url: string
  cover: string
  alt: string
}

const tracks: Track[] = [
  {
    name: 'Her',
    artist: 'JVKE',
    url: herTrack,
    cover: profileImage,
    alt: 'her by JVKE album cover'
  },
  {
    name: 'Sagip',
    artist: 'Jan Roberts',
    url: sagipTrack,
    cover: profileImage,
    alt: 'Sagip by Jan Roberts album cover'
  },
  {
    name: 'The Man Who Can’t Be Moved',
    artist: 'The Script',
    url: theManWhoCanTBeMovedTrack,
    cover: profileImage,
    alt: 'The Man Who Can’t Be Moved by The Script album cover'
  }
]

const fallbackTrack: Track = tracks[0] ?? {
  name: 'Her',
  artist: 'JVKE',
  url: '',
  cover: profileImage,
  alt: 'her by JVKE album cover'
}

const audio = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isExpanded = ref(false)
const currentIndex = ref(0)
const volume = ref(50)
const progress = ref(0)
const currentTime = ref('0:00')
const duration = ref('0:00')

const currentTrack = computed<Track>(() => tracks[currentIndex.value] ?? fallbackTrack)

const formatTime = (seconds: number): string => {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0
  const minutes = Math.floor(safeSeconds / 60)
  const remainingSeconds = Math.floor(safeSeconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

const formatIndex = (index: number): string => String(index + 1).padStart(2, '0')

const loadTrack = () => {
  if (!audio.value || !currentTrack.value) {
    return
  }

  audio.value.src = currentTrack.value.url
  audio.value.load()
  audio.value.volume = volume.value / 100

  if (isPlaying.value) {
    audio.value.play().catch(() => {
      isPlaying.value = false
    })
  }
}

const togglePlay = () => {
  if (!audio.value) {
    return
  }

  if (isPlaying.value) {
    audio.value.pause()
    isPlaying.value = false
    return
  }

  audio.value
    .play()
    .then(() => {
      isPlaying.value = true
    })
    .catch(() => {
      isPlaying.value = false
    })
}

const nextTrack = () => {
  currentIndex.value = (currentIndex.value + 1) % tracks.length
  isPlaying.value = true
  loadTrack()
}

const shuffleTrack = () => {
  if (tracks.length <= 1) {
    return
  }

  let nextIndex = currentIndex.value

  while (nextIndex === currentIndex.value) {
    nextIndex = Math.floor(Math.random() * tracks.length)
  }

  currentIndex.value = nextIndex
  isPlaying.value = true
  loadTrack()
}

const restartTrack = () => {
  if (!audio.value) {
    return
  }

  audio.value.currentTime = 0
  progress.value = 0
  currentTime.value = '0:00'

  if (!isPlaying.value) {
    audio.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      isPlaying.value = false
    })
  }
}

const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + tracks.length) % tracks.length
  isPlaying.value = true
  loadTrack()
}

const selectTrack = (index: number): void => {
  currentIndex.value = index
  isPlaying.value = true
  loadTrack()
}

const updateVolume = () => {
  if (audio.value) {
    audio.value.volume = volume.value / 100
  }
}

const onTimeUpdate = () => {
  if (!audio.value) {
    return
  }

  progress.value = audio.value.duration ? (audio.value.currentTime / audio.value.duration) * 100 : 0
  currentTime.value = formatTime(audio.value.currentTime)
}

const onLoadedMetadata = () => {
  if (audio.value) {
    duration.value = formatTime(audio.value.duration)
  }
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

watch(volume, updateVolume)
watch(currentIndex, loadTrack)

onMounted(() => {
  if (!audio.value) {
    return
  }

  audio.value.volume = volume.value / 100
  loadTrack()
})
</script>

<style scoped>
.music-player {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  width: min(420px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.music-player__shell {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 16px;
  padding: clamp(12px, 3vw, 16px);
  border-radius: 24px;
  background:
    radial-gradient(circle at top left, rgba(255, 209, 102, 0.16), transparent 34%),
    radial-gradient(circle at bottom right, rgba(92, 225, 230, 0.14), transparent 36%),
    linear-gradient(145deg, rgba(10, 13, 24, 0.96), rgba(15, 20, 34, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18px);
  cursor: pointer;
  color: #f5f7fb;
}

.music-player__cover-wrap {
  position: relative;
  min-height: 110px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 209, 102, 0.22), rgba(92, 225, 230, 0.16));
}

.music-player__cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}

.music-player__cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9, 12, 21, 0) 20%, rgba(9, 12, 21, 0.36) 100%);
}

.music-player__badge {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(9, 12, 21, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

.music-player__content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.music-player__meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.music-player__eyebrow {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(245, 247, 251, 0.7);
}

.music-player__meta h3 {
  margin: 0;
  font-size: clamp(15px, 4vw, 18px);
  line-height: 1.2;
  letter-spacing: -0.03em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.music-player__artist {
  margin: 0;
  font-size: 13px;
  color: rgba(245, 247, 251, 0.72);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.music-player__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  color: #f5f7fb;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease,
    opacity 0.18s ease;
}

.music-player__transport-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
  display: block;
}

.music-player__material-icon {
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-size: 18px;
  line-height: 1;
  display: block;
}

.icon-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
}

.icon-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.icon-btn--primary {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border: none;
  background: linear-gradient(135deg, #ffd166, #5ce1e6);
  color: #0f1320;
  box-shadow: 0 12px 24px rgba(92, 225, 230, 0.2);
}

.music-player__progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.music-player__progress-track {
  width: 100%;
  height: 4px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.music-player__progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ffd166, #5ce1e6);
  transition: width 0.2s linear;
}

.music-player__time-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(245, 247, 251, 0.64);
}

.music-player__extras {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.music-player__volume-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: rgba(245, 247, 251, 0.82);
}

.music-player__volume {
  width: 100%;
  accent-color: #5ce1e6;
  height: 24px;
}

.music-player__tracklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 2px;
  -webkit-overflow-scrolling: touch;
}

.music-player__track {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;
}

.music-player__track:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.14);
}

.music-player__track.is-active {
  background: rgba(92, 225, 230, 0.1);
  border-color: rgba(92, 225, 230, 0.28);
}

.music-player__track-index {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(245, 247, 251, 0.52);
}

.music-player__track-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.music-player__track-text strong,
.music-player__track-text small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.music-player__track-text strong {
  font-size: 13px;
  font-weight: 600;
}

.music-player__track-text small {
  font-size: 11px;
  color: rgba(245, 247, 251, 0.64);
}

.music-player__track-state {
  font-size: 11px;
  color: #5ce1e6;
}

/* ===== Mobile ===== */
@media (max-width: 640px) {
  .music-player {
    left: 12px;
    right: 12px;
    bottom: 12px;
    width: auto;
    max-width: none;
  }

  .music-player__shell {
    grid-template-columns: 56px minmax(0, 1fr);
    gap: 10px;
    padding: 10px;
    border-radius: 16px;
  }

  .music-player__cover-wrap {
    min-height: 0;
    border-radius: 12px;
  }

  .music-player__badge {
    display: none;
  }

  .music-player__content {
    gap: 6px;
  }

  .music-player__eyebrow {
    font-size: 9px;
    letter-spacing: 0.12em;
  }

  .music-player__meta h3 {
    font-size: 14px;
  }

  .music-player__artist {
    font-size: 11px;
  }

  .music-player__controls {
    justify-content: space-between;
    gap: 4px;
  }

  .icon-btn {
    width: 30px;
    height: 30px;
    min-width: 30px;
  }

  .icon-btn--primary {
    width: 38px;
    height: 38px;
    min-width: 38px;
  }

  .music-player__transport-icon {
    width: 14px;
    height: 14px;
  }

  .music-player__material-icon {
    font-size: 14px;
  }

  .music-player__tracklist {
    max-height: 30vh;
  }
}

@media (max-width: 360px) {
  .music-player__shell {
    grid-template-columns: 1fr;
  }

  .music-player__cover-wrap {
    aspect-ratio: 21 / 9;
  }

  .music-player__badge {
    display: inline-block;
  }
}
</style>