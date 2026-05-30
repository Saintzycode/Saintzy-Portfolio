<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 120 56"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- background -->
    <rect x="0" y="0" width="56" height="56" fill="#0a0a0f" rx="4"/>

    <!-- J shape -->
    <rect x="10" y="8" width="16" height="4" fill="#00f5c4"/>
    <rect x="18" y="8" width="4" height="28" fill="#00f5c4"/>
    <rect x="8" y="32" width="14" height="4" fill="#00f5c4"/>

    <!-- K shape -->
    <rect x="28" y="8" width="4" height="32" fill="#7c3aed"/>
    <line x1="32" y1="24" x2="46" y2="8" stroke="#7c3aed" stroke-width="4" stroke-linecap="square"/>
    <line x1="32" y1="24" x2="46" y2="40" stroke="#7c3aed" stroke-width="4" stroke-linecap="square"/>

    <!-- border -->
    <rect x="0" y="0" width="56" height="56" fill="none" stroke="#00f5c4" stroke-width="1" rx="4"/>

    <!-- corner accents -->
    <line x1="0" y1="0" x2="10" y2="0" stroke="#00f5c4" stroke-width="2"/>
    <line x1="0" y1="0" x2="0" y2="10" stroke="#00f5c4" stroke-width="2"/>
    <line x1="56" y1="56" x2="46" y2="56" stroke="#7c3aed" stroke-width="2"/>
    <line x1="56" y1="56" x2="56" y2="46" stroke="#7c3aed" stroke-width="2"/>

    <!-- DEV text -->
    <text
      x="64"
      y="38"
      font-family="'Space Mono', monospace"
      font-size="9"
      fill="#00f5c4"
      letter-spacing="3"
    >DEV</text>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), {
  size: 74
})
</script>