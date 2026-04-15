<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)

const submitFile = () => {}
</script>

<template>
  <div class="add-file-container">
    <h2 class="section-title">Dodaj plik</h2>

    <el-card shadow="never" class="form-card">
      <form class="file-form" method="post" action="/user/files" enctype="multipart/form-data" @submit.prevent="submitFile">
        <input id="addFile" ref="fileInput" class="custom-file-input" type="file" name="file" />
        <el-button type="primary" native-type="submit">
          Dodaj plik
        </el-button>
      </form>
    </el-card>
  </div>
</template>

<style scoped>
.add-file-container {
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

.file-form {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.custom-file-input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px dashed var(--el-text-color-secondary);
  border-radius: 4px;
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-regular);
  cursor: pointer;
  transition: border-color 0.2s;
  outline: none;
}

.custom-file-input:hover {
  border-color: var(--el-color-primary);
}

.custom-file-input::file-selector-button {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border: 1px solid var(--el-color-primary-light-5);
  border-radius: 4px;
  padding: 0.4rem 1rem;
  margin-right: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-file-input::file-selector-button:hover {
  background-color: var(--el-color-primary-light-7);
  border-color: var(--el-color-primary);
}
</style>
