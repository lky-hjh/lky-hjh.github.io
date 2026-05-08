<template>
  <div class="image-gallery">
    <img
      :src="currentImage"
      :alt="currentAlt"
      class="main-image"
    />
    <div v-if="thumbnails.length > 0" class="gallery-thumbs">
      <img
        v-for="(thumb, index) in thumbnails"
        :key="index"
        :src="thumb"
        :alt="`缩略图 ${index + 1}`"
        :class="{ active: currentIndex === index }"
        @click="switchImage(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  main: String,
  thumbnails: {
    type: Array,
    default: () => []
  }
})

const currentIndex = ref(-1)

const currentImage = computed(() => {
  if (props.thumbnails.length === 0) return props.main
  return currentIndex.value >= 0 ? props.thumbnails[currentIndex.value] : props.main
})

const currentAlt = computed(() => currentIndex.value >= 0 ? `图片 ${currentIndex.value + 1}` : '主图')

const switchImage = (index) => {
  currentIndex.value = index
}
</script>

<style scoped>
.image-gallery {
  margin-bottom: 1.5rem;
}

.main-image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.gallery-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow-x: auto;
}

.gallery-thumbs img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s;
  flex-shrink: 0;
}

.gallery-thumbs img:hover,
.gallery-thumbs img.active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
