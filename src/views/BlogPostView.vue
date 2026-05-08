<template>
  <DefaultLayout>
    <div class="blog-post-section">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="$router.push({ name: 'blog' })">
        ← 返回博客
      </button>

      <!-- 加载中 -->
      <div v-if="loading" class="blog-post-loading">
        <p>加载中...</p>
      </div>

      <!-- 404 -->
      <div v-else-if="notFound" class="blog-post-not-found">
        <h2>文章未找到</h2>
        <p>你访问的文章不存在或已被移除。</p>
        <button class="back-btn" @click="$router.push({ name: 'blog' })">
          ← 返回博客
        </button>
      </div>

      <!-- 文章内容 -->
      <article v-else class="blog-post">
        <header class="blog-post-header">
          <h1 class="blog-post-title">{{ postMeta.title }}</h1>
          <div class="blog-post-meta">
            <span class="blog-post-date">{{ postMeta.date }}</span>
            <span class="blog-post-author">{{ postMeta.author }}</span>
            <div class="blog-post-tags">
              <span v-for="tag in postMeta.tags" :key="tag" class="blog-tag">{{ tag }}</span>
            </div>
          </div>
        </header>

        <div class="blog-post-content">
          <MarkdownRenderer :content="markdownContent" />
        </div>
      </article>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer.vue'
import blogData from '@/data/blog.json'

const route = useRoute()

const loading = ref(true)
const notFound = ref(false)
const postMeta = ref({})
const markdownContent = ref('')

onMounted(async () => {
  const postId = route.params.id
  const post = blogData.posts.find(p => p.id === postId)

  if (!post) {
    notFound.value = true
    loading.value = false
    return
  }

  postMeta.value = post

  try {
    const baseUrl = import.meta.env.BASE_URL
    const url = `${baseUrl}blog/${post.file}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    markdownContent.value = await response.text()
  } catch (err) {
    console.error('Failed to load markdown:', err)
    notFound.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.blog-post-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.back-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border: 1.5px solid rgba(102, 126, 234, 0.3);
  border-radius: 8px;
  background: transparent;
  color: #667eea;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.back-btn:hover {
  background: rgba(102, 126, 234, 0.08);
  border-color: #667eea;
}

.blog-post-loading,
.blog-post-not-found {
  text-align: center;
  padding: 4rem 0;
  color: #999;
}

.blog-post-not-found h2 {
  color: #333;
  margin-bottom: 0.5rem;
}

.blog-post {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.blog-post-header {
  padding: 2.5rem 2.5rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.blog-post-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 1rem;
  line-height: 1.4;
}

.blog-post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  color: #888;
  font-size: 0.9rem;
}

.blog-post-tags {
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

.blog-post-content {
  padding: 2rem 2.5rem 2.5rem;
}

@media (max-width: 768px) {
  .blog-post-section {
    padding: 1rem;
  }

  .blog-post-header {
    padding: 1.5rem;
  }

  .blog-post-title {
    font-size: 1.4rem;
  }

  .blog-post-content {
    padding: 1.5rem;
  }
}
</style>
