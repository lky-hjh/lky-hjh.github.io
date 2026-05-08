<template>
  <DefaultLayout>
    <section class="hero">
      <h1>Mcdull</h1>
      <p class="subtitle">游戏制作/视觉设计</p>
      <router-link to="/works" class="cta-button">查看作品</router-link>
    </section>

    <section id="about" class="about-section">
      <h2>关于</h2>
      <div class="about-content">
        <div class="profile-header">
          <div class="profile-info">
            <p>手机: {{ profile.contact.phone }}</p>
            <p>{{ profile.contact.email }}</p>
            <p>微信号: {{ profile.contact.wechat }}</p>
            <p>
              个人博客（作品集）:
              <a :href="profile.contact.blog" target="_blank">{{ profile.contact.blog }}</a>
            </p>
          </div>
          <img
            :src="avatarUrl"
            alt="个人头像"
            class="profile-picture"
          />
        </div>

        <div class="about-section-content">
          <h3>教育背景</h3>
          <p>
            <strong>{{ profile.education.period }}</strong>
            {{ profile.education.school }}
            {{ profile.education.major }}
            绩点：{{ profile.education.gpa }}
          </p>

          <h3>数媒专业技能</h3>
          <ul>
            <li v-for="skill in profile.skills" :key="skill.category">
              <strong>{{ skill.category }}:</strong> {{ skill.description }}
            </li>
          </ul>

          <h3>工作经历</h3>
          <ul>
            <li v-for="exp in profile.experience" :key="exp.period">
              <strong>{{ exp.period }} {{ exp.company }} {{ exp.role }}</strong>
              <ul>
                <li v-for="detail in exp.details" :key="detail">{{ detail }}</li>
              </ul>
            </li>
          </ul>

          <h3>获奖经历</h3>
          <ul>
            <li v-for="award in profile.awards" :key="award">{{ award }}</li>
          </ul>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import profile from '@/data/profile.json'

const avatarUrl = `https://ui-avatars.com/api/?name=He+Juno&size=150&background=0D8ABC&color=fff&rounded=true`
</script>

<style scoped>
.hero {
  padding: 8rem 2rem;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 2rem;
}

.about-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 4rem auto;
  padding: 4rem 2rem;
  max-width: 1000px;
  width: 90%;
}

.about-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.about-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.profile-info {
  font-size: 1.1rem;
  line-height: 1.8;
}

.profile-info a {
  color: #0D8ABC;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.about-section-content {
  max-width: 800px;
  width: 100%;
  padding: 0 2rem;
}

.about-section-content h3 {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  color: #333;
}

.about-section-content p,
.about-section-content ul {
  margin-bottom: 1.5rem;
}

.about-section-content ul {
  padding-left: 1.5rem;
}

.about-section-content li {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem 1rem;
  }

  .about-section {
    margin: 3rem auto;
    padding: 3rem 1rem;
    width: 95%;
  }

  .about-content {
    gap: 2rem;
  }

  .about-section-content {
    padding: 0 1rem;
  }
}
</style>
