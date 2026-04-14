<script setup lang="ts">
import PublicFileCard from '@/components/molecules/PublicFileCard.vue'
import type {fileRepresentation} from '@/types/api/files.ts'

type Props = {
  files: Array<fileRepresentation>
}

defineProps<Props>()
</script>

<template>
  <div class="public-files-container">
    <h2 class="section-title">Pliki publiczne</h2>

    <div v-if="files.length" class="files-grid">
      <PublicFileCard
        v-for="file in files"
        :key="file.file_hash_str"
        :file="file"
      />
    </div>

    <el-empty
      v-else
      description="Brak plików publicznych."
    />
  </div>
</template>

<style scoped>
.public-files-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
  /* Dyskretny fioletowy akcent - kreska po lewej stronie */
  padding-left: 12px;
  border-left: 4px solid var(--el-color-primary);
}

.files-grid {
  display: grid;
  gap: 1rem; /* Standardowy margines / odstęp pomiędzy kartami */
  /* Siatka responsywna: karty będą miały minimum 300px,
     i wypełnią wolną przestrzeń układając się w rzędy tam, gdzie jest miejsce */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
