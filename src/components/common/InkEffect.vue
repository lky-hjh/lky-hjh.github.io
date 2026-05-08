<template>
  <div class="ink-container" aria-hidden="true">
    <div
      v-for="stroke in strokes"
      :key="stroke.id"
      class="ink-stroke"
      :class="{ 'ink-fading': stroke.fading }"
      :style="{
        width: `${stroke.size}px`,
        height: `${stroke.size}px`,
        left: `${stroke.x}px`,
        top: `${stroke.y}px`,
        opacity: stroke.opacity,
        transform: `translate(-50%, -50%) rotate(${stroke.rotation}deg)`
      }"
    />
  </div>
</template>

<script setup>
import { useInkEffect } from '@/composables/useInkEffect'

const { strokes } = useInkEffect()
</script>

<style scoped>
.ink-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.ink-stroke {
  position: fixed;
  background: radial-gradient(ellipse at center,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  transition: opacity 2s ease-out;
}

.ink-fading {
  opacity: 0 !important;
}
</style>
