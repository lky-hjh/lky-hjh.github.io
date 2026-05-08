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
        <h2 class="detail-title">{{ selectedProject?.title }}</h2>
        <p class="detail-subtitle">{{ selectedProject?.subtitle }}</p>

        <ImageGallery
          :main="mainImage"
          :thumbnails="thumbnailImages"
        />

        <VideoPlayer
          v-for="video in selectedProject?.videos"
          :key="video.bvid"
          :type="video.type"
          :bvid="video.bvid"
        />

        <p class="detail-description">{{ selectedProject?.description }}</p>

        <ul v-if="selectedProject?.features?.length" class="detail-features">
          <li v-for="feature in selectedProject.features" :key="feature">
            {{ feature }}
          </li>
        </ul>
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

const projects = projectData.projects.filter(p => !p._removed)
const practices = projectData.practices.filter(p => !p._removed)

const showDetail = ref(false)
const selectedProject = ref(null)

const mainImage = computed(() => {
  if (!selectedProject.value) return ''
  return `./works/${selectedProject.value.folder}/main.png`
})

const thumbnailImages = computed(() => {
  if (!selectedProject.value) return []
  const folder = selectedProject.value.folder
  return [
    `./works/${folder}/thumb1.png`,
    `./works/${folder}/thumb2.png`,
    `./works/${folder}/thumb3.png`
  ].filter(Boolean)
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

.detail-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.detail-subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

.detail-description {
  line-height: 1.8;
  color: #555;
}

.detail-features {
  margin-top: 1.5rem;
  padding-left: 1.5rem;
}

.detail-features li {
  margin-bottom: 0.5rem;
  line-height: 1.8;
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