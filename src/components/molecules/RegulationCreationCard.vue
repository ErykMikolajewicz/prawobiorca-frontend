<script setup lang="ts">
import { ref } from 'vue'
import { uploadRegulation } from '@/api/regulations'
import { ElMessage } from 'element-plus'
import AttachFileRoundedIcon from '@iconify-vue/material-symbols/attach-file-rounded'
import type {regulationRepresentation} from '@/types/api/regulations.ts'

const fileInputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  (
    e: 'regulation-created',
    regulation: regulationRepresentation
  ): void
}>()

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const submitFile = async () => {
  const fileInput = fileInputRef.value
  const file = fileInput?.files?.[0]

  if (!file) {
    ElMessage.warning('Wybierz regulację do przesłania.')
    return
  }

  try {
    const regulationId = await uploadRegulation(file)
    ElMessage.success('Regulacja został pomyślnie dodana.')

    emit('regulation-created', {
      id: regulationId,
      presentationName: file.name,
      isPrepared: false
    })

    fileInput.value = ''
  } catch {
    ElMessage.error('Wystąpił błąd podczas dodawania regulacji.')
  }
}

defineExpose({
  triggerFileInput
})
</script>

<template>
  <el-card shadow="never" class="form-card" @click="fileInputRef?.click()">
    <form
      class="file-form"
      method="post"
      action="/user/regulations"
      enctype="multipart/form-data"
      @submit.prevent="submitFile"
    >
      <input
        ref="fileInputRef"
        id="addFile"
        class="custom-file-input"
        type="file"
        name="file"
        @change="submitFile"
      />
      <p>Wyślij nowy plik</p>
      <button type="submit" class="icon-btn">
        <AttachFileRoundedIcon />
      </button>
    </form>
  </el-card>
</template>

<style scoped>
.form-card {
  border: dashed 2px var(--el-color-primary-light-8);
  background-color: var(--el-color-primary-light-9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;

  &:hover {
    background-color: var(--el-color-primary-light-7);
    border-color: var(--el-color-primary-light-5);
  }
}

.file-form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5em;
}

.custom-file-input {
  display: none;
}

</style>
