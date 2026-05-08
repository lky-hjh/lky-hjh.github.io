<template>
  <div class="layout">
    <TheNavbar />
    <main class="main-content">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from '@/components/common/TheNavbar.vue'
import TheFooter from '@/components/common/TheFooter.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 80px;
}
</style>
