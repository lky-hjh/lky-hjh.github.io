<template>
  <!-- Bilibili 视频 -->
  <div
    v-if="type === 'bilibili'"
    class="video-player"
    :class="{ loading: isLoading }"
  >
    <iframe
      v-if="isLoaded"
      :src="bilibiliSrc"
      class="video-iframe"
      frameborder="0"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin allow-presentation"
      loading="lazy"
    />
    <button v-else class="video-play-btn" @click="loadVideo">&#9654;</button>
  </div>

  <!-- OSS MP4 视频 -->
  <div
    v-if="type === 'mp4'"
    class="video-player mp4-player"
    :class="{ loading: isLoading }"
  >
    <div v-if="!isLoaded" class="mp4-overlay">
      <button class="video-play-btn" @click="loadVideo">&#9654;</button>
    </div>
    <video
      v-show="isLoaded"
      ref="videoRef"
      controls
      class="video-iframe"
      preload="none"
    >
      <source :src="src" type="video/mp4" />
      您的浏览器不支持视频播放。
    </video>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'bilibili'
  },
  bvid: String,
  src: String
})

const isLoaded = ref(false)
const isLoading = ref(false)
const videoRef = ref(null)

const bilibiliSrc = computed(() => {
  if (props.type === 'bilibili' && props.bvid) {
    return `https://player.bilibili.com/player.html?isOutside=true&bvid=${props.bvid}&autoplay=0`
  }
  return ''
})

const loadVideo = () => {
  isLoading.value = true

  if (props.type === 'mp4') {
    // OSS MP4：加载视频元素
    setTimeout(() => {
      isLoaded.value = true
      isLoading.value = false
      // 自动播放
      if (videoRef.value) {
        videoRef.value.load()
        videoRef.value.play().catch(() => {})
      }
    }, 300)
  } else {
    // Bilibili：加载 iframe
    setTimeout(() => {
      isLoaded.value = true
      isLoading.value = false
    }, 300)
  }
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
  margin-top: 20px;
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
  z-index: 10;
}

.video-play-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translate(-50%, -50%) scale(1.1);
}

.mp4-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
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
  z-index: 10;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
