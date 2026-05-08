<template>
  <DefaultLayout>
    <div class="page-content">
      <h1 class="page-title">作品展示</h1>

      <!-- 主要作品 -->
      <section class="works-section">
        <h2>项目作品</h2>
        <div class="works-grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :title="project.title"
            :subtitle="project.subtitle"
            :folder="project.folder"
            @click="openDetail(project)"
          />
        </div>
      </section>

      <!-- 练习作品 -->
      <section class="works-section">
        <h2>练习作品</h2>
        <div class="works-grid practices-grid">
          <ProjectCard
            v-for="practice in practices"
            :key="practice.id"
            :title="practice.title"
            :subtitle="practice.subtitle"
            :folder="practice.folder"
            @click="openDetail(practice)"
          />
        </div>
      </section>

      <!-- 项目详情模态框 -->
      <ProjectDetail v-model:visible="showDetail">
        <div v-if="selectedProject" class="detail-body">
          <h2 class="detail-title">{{ selectedProject.title }}</h2>
          <p class="detail-subtitle">{{ selectedProject.subtitle }}</p>

          <!-- 图片画廊 -->
          <ImageGallery
            :main="mainImage"
            :thumbnails="thumbnailImages"
          />

          <!-- 视频列表 -->
          <div v-if="selectedProject.videos && selectedProject.videos.length > 0">
            <VideoPlayer
              v-for="(video, idx) in selectedProject.videos"
              :key="idx"
              :type="video.type"
              :bvid="video.bvid"
              :src="video.src"
            />
          </div>

          <!-- 项目介绍 -->
          <div v-if="selectedProject.description" class="detail-section">
            <h3>项目介绍</h3>
            <p>{{ selectedProject.description }}</p>
          </div>

          <!-- 技术特点 -->
          <div v-if="selectedProject.features && selectedProject.features.length > 0">
            <h3>技术特点</h3>
            <ul class="detail-list">
              <li v-for="feat in selectedProject.features" :key="feat">{{ feat }}</li>
            </ul>
          </div>

          <!-- 职责说明 -->
          <div
            v-if="selectedProject.responsibilities && selectedProject.responsibilities.length > 0"
          >
            <h3>我的职责</h3>
            <ul class="detail-list">
              <li v-for="(resp, idx) in selectedProject.responsibilities" :key="idx">{{ resp }}</li>
            </ul>
          </div>
        </div>
      </ProjectDetail>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProjectCard from '@/components/works/ProjectCard.vue'
import ProjectDetail from '@/components/works/ProjectDetail.vue'
import ImageGallery from '@/components/works/ImageGallery.vue'
import VideoPlayer from '@/components/common/VideoPlayer.vue'
import projectData from '@/data/projects.json'

const projects = projectData.projects
const practices = projectData.practices

const showDetail = ref(false)
const selectedProject = ref(null)

const mainImage = computed(() => {
  if (!selectedProject.value) return ''
  return `./works/${selectedProject.value.folder}/main.png`
})

const thumbnailImages = computed(() => {
  if (!selectedProject.value) return []
  const folder = selectedProject.value.folder
  const thumbs = []
  for (let i = 1; i <= 3; i++) {
    thumbs.push(`./works/${folder}/thumb${i}.png`)
  }
  return thumbs
})

const openDetail = (project) => {
  selectedProject.value = project
  showDetail.value = true
}
</script>

<style scoped>
.page-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.works-section {
  margin-bottom: 3rem;
}

.works-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.practices-grid {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* 详情样式 */
.detail-body {
  padding: 0;
}

.detail-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.detail-subtitle {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.detail-section {
  margin-top: 1.5rem;
}

.detail-section h3,
.detail-body h3 {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.detail-body p {
  line-height: 1.8;
  color: #555;
}

.detail-list {
  padding-left: 1.5rem;
}

.detail-list li {
  margin-bottom: 0.5rem;
  line-height: 1.8;
  color: #555;
}

.resp-item {
  margin-bottom: 1rem;
}

.resp-item p {
  line-height: 1.8;
  color: #555;
}

@media (max-width: 768px) {
  .page-content {
    padding: 1rem;
  }

  .works-grid {
    gap: 1rem;
  }
}
</style>
