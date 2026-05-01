<script setup lang="ts">
import { ref } from 'vue'
import { deleteUserFile } from '@/api/files'
import { ElMessage } from 'element-plus'

type Props = {
  file: {
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleted', fileHashStr: string): void
}>()

const isDeleting = ref(false)

async function handleDelete() {
  try {
    isDeleting.value = true
    await deleteUserFile(props.file.file_hash_str)
    ElMessage.success('Plik został usunięty')
    emit('deleted', props.file.file_hash_str)
  } catch (error) {
    ElMessage.error('Nie udało się usunąć pliku')
    console.error(error)
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <el-card shadow="hover" class="file-card">
    <div class="card-content">
      <div class="file-info">
        <span class="file-name" :title="file.presentation_name">{{ file.presentation_name }}</span>
      </div>
      <div class="actions">
        <router-link v-if="file.is_prepared" class="action-link" :to="{ path: '/search/user/file', query: { fileHashStr: file.file_hash_str, filename: file.presentation_name } }">
          <el-button type="primary" class="full-width-btn">Przeszukaj</el-button>
        </router-link>
        <form v-else class="action-link form-action" :action="`/user/files/${file.presentation_name}/preparation`" method="post">
          <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
          <el-button type="primary" native-type="submit" class="full-width-btn">Przygotuj plik</el-button>
        </form>
        <el-popconfirm
          title="Czy na pewno chcesz usunąć ten plik?"
          confirm-button-text="Tak"
          cancel-button-text="Nie"
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" :loading="isDeleting" class="full-width-btn">Usuń</el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.file-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.file-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.12);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.action-link {
  flex-shrink: 0;
  text-decoration: none;
  display: block;
  width: 100%;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  min-width: 130px;
}

.full-width-btn {
  width: 100%;
  margin-left: 0;
}

.form-action {
  margin: 0;
}
</style>
