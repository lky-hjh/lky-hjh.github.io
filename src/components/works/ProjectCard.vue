<template>
  <div
    ref="cardRef"
    class="project-card"
    :style="{ transform }"
    @click="$emit('click')"
  >
    <img
      :src="imageSrc"
      :alt="title"
      class="card-image"
    />
    <div class="card-overlay">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCard3D } from '@/composables/useCard3D'

const props = defineProps({
  title: String,
  subtitle: String,
  folder: String
})

defineEmits(['click'])

const cardRef = ref(null)
const { transform } = useCard3D(cardRef)

const imageSrc = computed(() => {
  return `./works/${props.folder}/main.png`
})
</script>

<style scoped>
.project-card {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.card-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
