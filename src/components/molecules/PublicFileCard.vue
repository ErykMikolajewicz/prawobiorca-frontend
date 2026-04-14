<script setup lang="ts">
import type {fileRepresentation} from '@/types/api/files.ts'

type Props = {
  file: fileRepresentation
}

defineProps<Props>()
</script>

<template>
  <el-card shadow="hover" class="file-card">
    <div class="card-content">
      <div class="file-info">
        <span class="file-name" :title="file.presentation_name">{{ file.presentation_name }}</span>
      </div>
      <router-link class="action-link" :to="{ path: '/search/public-file', query: { fileHashStr: file.file_hash_str, filename: file.presentation_name } }">
        <el-button type="primary" :disabled="!file.is_prepared">Przeszukaj</el-button>
      </router-link>
    </div>
  </el-card>
</template>

<style scoped>
.file-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.file-card:hover {
  transform: translateY(-2px);
  /* Delikatny fioletowy cień z Twojej palety przy hover */
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.12);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.file-info {
  flex: 1;
  min-width: 0; /* Niezbędne, aby ucinanie działało wewnątrz kontenera flex */
}

.file-name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.action-link {
  flex-shrink: 0;
  text-decoration: none;
}
</style>
