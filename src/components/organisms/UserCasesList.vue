<script setup lang="ts">
import CaseCard from '@/components/molecules/CaseCard.vue'

type Props = {
  cases: Array<{
    id: string
    name: string
  }>
}

defineProps<Props>()
</script>

<template>
  <div class="user-cases-container">
    <h2 class="section-title">Moje sprawy</h2>

    <div v-if="cases.length" class="cases-grid">
      <CaseCard
        v-for="(userCase, index) in cases"
        :key="userCase.id"
        :userCase="userCase"
        :index="index + 1"
      />
    </div>

    <el-empty
      v-else
      description="Brak spraw."
    />
  </div>
</template>

<style scoped>
.user-cases-container {
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

.cases-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>

