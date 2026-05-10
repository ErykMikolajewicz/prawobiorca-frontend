<script setup lang="ts">
import { ref } from 'vue'
import {addCase} from '@/api/cases'

const caseName = ref('')

const emit = defineEmits(['case-created'])

async function submitCase() {
  const caseId = await addCase(caseName.value)
  emit('case-created', {
    id: caseId,
    name: caseName.value
  })

  caseName.value = ''
}
</script>

<template>
  <div class="new-case-container">
    <h2 class="section-title">Nowa sprawa</h2>

    <el-card shadow="never" class="form-card">
      <form class="case-form" action="/user/cases" method="post" @submit.prevent="submitCase">
        <el-input
          v-model="caseName"
          id="case_name"
          name="case_name"
          placeholder="Podaj nazwę sprawy..."
          required
          class="flex-grow-input"
        />
        <el-button type="primary" native-type="submit">
          Utwórz sprawę
        </el-button>
      </form>
    </el-card>
  </div>
</template>

<style scoped>
.new-case-container {
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

.form-card {
  border-radius: 8px;
  border: none;
  background-color: var(--el-bg-color-overlay);
}

.case-form {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.flex-grow-input {
  flex-grow: 1;
  min-width: 250px;
}
</style>
