<script setup lang="ts">
import AuthControls from '@/components/molecules/AuthControls.vue'
</script>

<template>
  <el-header class="app-navbar">
    <div class="logo">
      PRAWOBIORCA
    </div>

    <AuthControls />
  </el-header>
</template>

<style scoped>
.app-navbar {
  background-color: var(--el-bg-color-overlay);
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  color: var(--el-color-primary);
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>

