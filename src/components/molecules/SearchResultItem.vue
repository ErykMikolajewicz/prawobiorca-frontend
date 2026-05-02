<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  result: string
  filename: string
  selectedCaseId?: string
}>()

const emit = defineEmits<{
  (e: 'add-to-case', payload: { articleContent: string }): void
}>()

const authStore = useAuthStore()
const { isUserLogged } = storeToRefs(authStore)

const handleAddToCase = () => {
  emit('add-to-case', { articleContent: props.result })
}
</script>

<template>
  <el-card shadow="hover">
    <div class="result-container">
      <label class="result-text">{{ result }}</label>
      <div class="actions">
        <el-button v-if="isUserLogged"
          type="primary"
          size="small"
          :disabled="!selectedCaseId"
          @click="handleAddToCase"
        >
          Dodaj do sprawy
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.result-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.result-text {
  flex: 1;
}

.actions {
  flex-shrink: 0;
}
</style>
