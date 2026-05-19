<script setup lang="ts">
import { ref } from 'vue'
import UserFileCard from '@/components/molecules/UserFileCard.vue'
import FileCreationCard from '@/components/molecules/FileCreationCard.vue'

type Props = {
  files: Array<{
    presentation_name: string
    file_hash_str: string
    is_prepared: boolean
  }>
}

defineProps<Props>()

const fileCreationCardRef = ref<InstanceType<typeof FileCreationCard>>()

const emit = defineEmits<{
  (e: 'fileDeleted', fileHashStr: string): void
  (
    e: 'file-created',
    file: { presentation_name: string; file_hash_str: string; is_prepared: boolean }
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
        @deleted="(hash) => emit('fileDeleted', hash)"
      />

      <FileCreationCard
        ref="fileCreationCardRef"
        :class="files.length === 0 ? 'hidden-card' : ''"
        @file-created="(file) => emit('file-created', file)"
      />
    </div>

    <el-empty v-if="files.length === 0" description="Nie masz jeszcze żadnych plików.">
      <el-button type="primary" @click="fileCreationCardRef?.triggerFileInput()"
        >Wyślij plik</el-button
      >
    </el-empty>
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

.hidden-card {
    display: none;
}
</style>
