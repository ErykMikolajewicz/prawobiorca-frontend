<script setup lang="ts">
import { ref } from 'vue'
import { deleteUserFile } from '@/api/files'
import { ElMessage } from 'element-plus'
import SearchRoundedIcon from '@iconify-vue/material-symbols/search-rounded'
import DeleteOutlineRoundedIcon from '@iconify-vue/material-symbols/delete-outline-rounded'
import SettingsIcon from '@iconify-vue/material-symbols/settings-rounded'
import IconMotion from '@/components/atoms/IconMotion.vue'

type Props = {
  file: {
    presentation_name: string
    file_hash_str: string
    is_prepared: boolean
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
  <component
    :is="file.is_prepared ? 'router-link' : 'div'"
    :to="
      file.is_prepared
        ? {
            name: 'SearchUserFile',
            params: { fileHashStr: file.file_hash_str },
            state: { filename: file.presentation_name }
          }
        : undefined
    "
    :class="file.is_prepared ? 'file-card-link' : ''"
  >
    <el-card shadow="hover" class="file-card">
      <div class="card-content">
        <div class="file-info">
          <span class="file-name" :title="file.presentation_name">{{
            file.presentation_name
          }}</span>
        </div>
        <div class="actions">
          <span v-if="file.is_prepared">
            <IconMotion motion-type="search">
              <SearchRoundedIcon />
            </IconMotion>
          </span>

          <form
            v-else
            class="form-action"
            :action="`/user/files/${file.presentation_name}/preparation`"
            method="post"
            @submit.stop
          >
            <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
            <button class="icon-btn" type="submit" @click.stop>
              <SettingsIcon />
            </button>
          </form>

          <el-popconfirm
            title="Czy na pewno chcesz usunąć ten plik?"
            confirm-button-text="Tak"
            cancel-button-text="Nie"
            @confirm="handleDelete"
          >
            <template #reference>
              <button class="icon-btn icon-btn-danger" :disabled="isDeleting" @click.prevent.stop>
                <DeleteOutlineRoundedIcon />
              </button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </el-card>
  </component>
</template>

<style scoped>
.file-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  height: 100%;
}

.file-card:hover {
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
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.file-card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.file-card-link:hover {
  .file-card {
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.12);
  }

  :deep(.icon-btn) {
    color: var(--el-color-primary);
  }

  :deep(.search-icon-out) {
    opacity: 0;
    transform: translateX(2em);
  }

  :deep(.search-icon-in) {
    opacity: 1;
    transform: translateX(0);
  }
}

.icon-btn-danger:hover {
  color: var(--el-color-danger);
}

.icon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
}

.form-action {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}
</style>
