<template>
  <div class="video-player" :class="{ loading: isLoading }">
    <iframe
      v-if="isLoaded"
      :src="iframeSrc"
      class="video-iframe"
      frameborder="0"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin allow-presentation"
    />
    <button
      v-else
      class="video-play-btn"
      @click="loadVideo"
    >
      ▶
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'bilibili'
  },
  bvid: String
})

const isLoaded = ref(false)
const isLoading = ref(false)

const iframeSrc = computed(() => {
  if (props.type === 'bilibili' && props.bvid) {
    return `https://player.bilibili.com/player.html?bvid=${props.bvid}&page=1&high_quality=1&danmaku=0`
  }
  return ''
})

const loadVideo = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoaded.value = true
    isLoading.value = false
  }, 500)
}
</script>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-play-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translate(-50%, -50%) scale(1.1);
}

.video-player.loading .video-play-btn {
  display: none;
}

.video-player.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
