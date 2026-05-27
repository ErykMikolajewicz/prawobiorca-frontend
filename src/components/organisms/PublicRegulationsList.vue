<script setup lang="ts">
import PublicRegulationCard from '@/components/molecules/PublicRegulationCard.vue'
import type {regulationRepresentation} from '@/types/api/regulations.ts'

type Props = {
  regulations: Array<regulationRepresentation>
}

defineProps<Props>()
</script>

<template>
  <div class="public-regulations-container">
    <h2 class="section-title">Publiczne regulacje</h2>

    <div v-if="regulations.length" class="files-grid">
      <PublicRegulationCard
        v-for="regulation in regulations"
        :key="regulation.id"
        :regulation="regulation"
      />
    </div>

    <el-empty
      v-else
      description="Brak regulacji publicznych."
    />
  </div>
</template>

<style scoped>
.public-regulations-container {
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
