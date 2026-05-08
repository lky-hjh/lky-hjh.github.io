<template>
  <div class="tag-filter">
    <button
      class="tag-btn"
      :class="{ active: !selectedTag }"
      @click="$emit('select', null)"
    >
      全部
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      class="tag-btn"
      :class="{ active: selectedTag === tag }"
      @click="$emit('select', selectedTag === tag ? null : tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true
  },
  selectedTag: {
    type: String,
    default: null
  }
})

defineEmits(['select'])
</script>

<style scoped>
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.tag-btn {
  padding: 0.4rem 1rem;
  border: 1.5px solid rgba(102, 126, 234, 0.3);
  border-radius: 999px;
  background: transparent;
  color: #667eea;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.tag-btn:hover {
  background: rgba(102, 126, 234, 0.08);
  border-color: #667eea;
}

.tag-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .tag-btn {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>
