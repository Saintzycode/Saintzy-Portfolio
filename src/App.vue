<template>
  <div id="main-app">
    <IntroScreen v-if="showIntro" @done="showIntro = false" />
    <template v-else>
      <ParticleBackground />
      <CursorEffect />
      <MusicPlayer />
      <SecretTerminal />
      <div class="content">
        <RouterView />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IntroScreen from '@/components/IntroScreen.vue'
import CursorEffect from '@/components/CursorEffect.vue'
import ParticleBackground from '@/components/ParticleBackground.vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
import SecretTerminal from '@/components/SecretTerminal.vue'

const showIntro = ref(true)
</script>