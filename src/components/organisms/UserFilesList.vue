<script setup lang="ts">
import UserFileCard from '@/components/molecules/UserFileCard.vue'

type Props = {
  files: Array<{
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }>;
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'fileDeleted', fileHashStr: string): void
}>()
</script>

<template>
  <div class="user-files-container">
    <h2 class="section-title">Pliki użytkownika</h2>

    <div v-if="files.length" class="files-grid">
      <UserFileCard
        v-for="file in files"
        :key="file.file_hash_str"
        :file="file"
        @deleted="(hash) => emit('fileDeleted', hash)"
      />
    </div>

    <el-empty
      v-else
      description="Brak plików."
    />
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>

