<template>
  <DefaultLayout>
    <div class="blog-section">
      <h1 class="page-title">博客</h1>

      <TagFilter
        :tags="allTags"
        :selected-tag="selectedTag"
        @select="selectedTag = $event"
      />

      <div v-if="filteredPosts.length" class="blog-cards-grid">
        <BlogCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
        />
      </div>

      <div v-else class="blog-empty">
        <p>暂无相关文章</p>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlogCard from '@/components/blog/BlogCard.vue'
import TagFilter from '@/components/blog/TagFilter.vue'
import blogData from '@/data/blog.json'

const posts = blogData.posts
const selectedTag = ref(null)

const allTags = computed(() => {
  const tagSet = new Set()
  posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet)
})

const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter(post => post.tags.includes(selectedTag.value))
})
</script>

<style scoped>
.blog-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.blog-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.blog-empty {
  text-align: center;
  padding: 4rem 0;
  color: #999;
  font-size: 1.1rem;
}

@media (max-width: 1024px) {
  .blog-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blog-section {
    padding: 1rem;
  }

  .blog-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
