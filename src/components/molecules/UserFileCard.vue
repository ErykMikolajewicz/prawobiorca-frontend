<script setup lang="ts">

type Props = {
  file: {
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }
}

defineProps<Props>()
</script>

<template>
  <el-card shadow="hover" class="file-card">
    <div class="card-content">
      <div class="file-info">
        <span class="file-name" :title="file.presentation_name">{{ file.presentation_name }}</span>
      </div>
      <router-link v-if="file.is_prepared" class="action-link" :to="{ path: '/search/user/file', query: { fileHashStr: file.file_hash_str, filename: file.presentation_name } }">
        <el-button type="primary">Przeszukaj</el-button>
      </router-link>
      <form v-else class="action-link form-action" :action="`/user/files/${file.presentation_name}/preparation`" method="post">
        <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
        <el-button type="primary" native-type="submit">Przygotuj plik</el-button>
      </form>
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

.form-action {
  margin: 0;
}
</style>
