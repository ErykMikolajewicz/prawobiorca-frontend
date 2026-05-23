<script setup lang="ts">
import UserFileCard from '@/components/molecules/UserFileCard.vue'
import FileCreationCard from '@/components/molecules/FileCreationCard.vue'
import type {fileRepresentation} from "@/types/api/files.ts"

type Props = {
  files: Array<fileRepresentation>
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'user-file-deleted', fileHashStr: string): void
  (
    e: 'user-file-created',
    file: fileRepresentation
  ): void
}>()
</script>

<template>
  <div class="user-files-container">
    <h2 class="section-title">Pliki użytkownika</h2>

    <div class="files-grid">
      <UserFileCard
        v-for="file in files"
        :key="file.file_hash_str"
        :file="file"
        @deleted="(hash) => emit('user-file-deleted', hash)"
      />

      <FileCreationCard
        @file-created="(file) => emit('user-file-created', file)"
      />
    </div>
  </div>
</template>

<style scoped>
.user-files-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  padding-left: 12px;
  border-left: 4px solid var(--el-color-primary);
}

.files-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
}
</style>
