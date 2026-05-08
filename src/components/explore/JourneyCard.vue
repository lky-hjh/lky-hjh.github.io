<template>
  <div ref="cardRef" class="journey-card" :style="{ transform }">
    <div class="journey-cover">
      <img v-if="cover" :src="cover" :alt="title" />
      <div v-else class="journey-cover-placeholder">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="journey-info">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCard3D } from '@/composables/useCard3D'

defineProps({
  title: String,
  description: String,
  cover: String
})

const cardRef = ref(null)
const { transform } = useCard3D(cardRef)
</script>

<style scoped>
.journey-card {
  width: 100%;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;
  margin: 0 auto;
}

.journey-card:hover {
  transform: scale(1.02);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
}

.journey-cover {
  height: 240px;
  overflow: hidden;
}

.journey-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.journey-cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.journey-cover-placeholder span {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

.journey-info {
  padding: 2rem 2.5rem;
  text-align: left;
}

.journey-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: #222;
}

.journey-info p {
  color: #555;
  font-size: 1.05rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .journey-cover {
    height: 180px;
  }

  .journey-info {
    padding: 1.5rem;
  }
}
</style>
