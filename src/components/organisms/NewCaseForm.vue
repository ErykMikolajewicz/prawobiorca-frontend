<script setup lang="ts">
import { ref } from 'vue'

const caseName = ref('')

const submitCase = () => {
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
}

.flex-grow-input {
  flex-grow: 1;
}
</style>
