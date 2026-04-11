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
  <el-card v-if="isUserLogged" shadow="hover">
      <label>{{ result }}</label>
        <el-button
          type="success"
          size="small"
          :disabled="!selectedCaseId"
          @click="handleAddToCase"
        >
          Dodaj do sprawy
        </el-button>
  </el-card>
</template>
