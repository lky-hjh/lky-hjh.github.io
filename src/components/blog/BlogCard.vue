<template>
  <div
    ref="cardRef"
    class="blog-card"
    :style="{ transform }"
    @click="$router.push({ name: 'blog-post', params: { id: post.id } })"
  >
    <div class="blog-card-cover">
      <img v-if="post.cover" :src="post.cover" :alt="post.title" />
      <div v-else class="blog-card-placeholder">
        <span>{{ post.title.slice(0, 2) }}</span>
      </div>
    </div>
    <div class="blog-card-body">
      <h3 class="blog-card-title">{{ post.title }}</h3>
      <p class="blog-card-summary">{{ post.summary }}</p>
      <div class="blog-card-meta">
        <div class="blog-card-tags">
          <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
        </div>
        <span class="blog-card-date">{{ post.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCard3D } from '@/composables/useCard3D'

defineProps({
  post: {
    type: Object,
    required: true
  }
})

const cardRef = ref(null)
const { transform } = useCard3D(cardRef)
</script>

<style scoped>
.blog-card {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.blog-card:hover {
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.blog-card-cover {
  height: 180px;
  overflow: hidden;
}

.blog-card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.blog-card:hover .blog-card-cover img {
  transform: scale(1.05);
}

.blog-card-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-card-placeholder span {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.blog-card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.blog-card-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #222;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card-summary {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.4rem;
}

.blog-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.blog-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  white-space: nowrap;
}

.blog-card-date {
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .blog-card-cover {
    height: 150px;
  }

  .blog-card-body {
    padding: 1.2rem;
  }
}
</style>
