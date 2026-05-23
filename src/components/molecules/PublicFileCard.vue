<script setup lang="ts">
import type { fileRepresentation } from '@/types/api/files.ts'
import SearchRoundedIcon from '@iconify-vue/material-symbols/search-rounded'
import IconMotion from '@/components/atoms/IconMotion.vue'

type Props = {
  file: fileRepresentation
}

defineProps<Props>()
</script>

<template>
  <router-link
    :to="{
      name: 'SearchPublicFile',
      params: { fileHashStr: file.file_hash_str },
      state: { filename: file.presentation_name }
    }"
    class="file-card-link"
  >
    <el-card shadow="hover" class="file-card">
      <div class="card-content">
        <div class="file-info">
          <span class="file-name" :title="file.presentation_name">{{
            file.presentation_name
          }}</span>
        </div>
        <IconMotion motion-type="search">
          <SearchRoundedIcon />
        </IconMotion>
      </div>
    </el-card>
  </router-link>
</template>

<style scoped>
.file-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.file-card:hover {
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
  min-width: 0;
}

.file-name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.file-card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.file-card-link:hover {
  .file-card {
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.12);
  }

  :deep(.icon-btn) {
    color: var(--el-color-primary);
  }

  :deep(.search-icon-out) {
    opacity: 0;
    transform: translateX(2em);
  }

  :deep(.search-icon-in) {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>
