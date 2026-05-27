<script setup lang="ts">
import UserRegulationCard from '@/components/molecules/UserRegulationCard.vue'
import RegulationCreationCard from '@/components/molecules/RegulationCreationCard.vue'
import type {regulationRepresentation} from "@/types/api/regulations.ts"

type Props = {
  regulations: Array<regulationRepresentation>
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'user-regulation-deleted', regulationId: string): void
  (
    e: 'user-regulation-created',
    file: regulationRepresentation
  ): void
}>()
</script>

<template>
  <div class="user-files-container">
    <h2 class="section-title">Regulacje użytkownika</h2>

    <div class="files-grid">
      <UserRegulationCard
        v-for="regulation in regulations"
        :key="regulation.id"
        :regulation="regulation"
        @deleted="(regulationId) => emit('user-regulation-deleted', regulationId)"
      />

      <RegulationCreationCard
        @regulation-created="(regulation) => emit('user-regulation-created', regulation)"
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
