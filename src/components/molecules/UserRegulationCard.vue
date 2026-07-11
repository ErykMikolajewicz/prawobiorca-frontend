<script setup lang="ts">
import { ref } from 'vue'
import { deleteUserRegulation, prepareUserRegulation } from '@/api/regulations'
import { ElMessage } from 'element-plus'
import SearchRoundedIcon from '@iconify-vue/material-symbols/search-rounded'
import DeleteOutlineRoundedIcon from '@iconify-vue/material-symbols/delete-outline-rounded'
import SettingsIcon from '@iconify-vue/material-symbols/settings-rounded'
import IconMotion from '@/components/atoms/IconMotion.vue'
import type { regulationRepresentation } from "@/types/api/regulations.ts"

type Props = {
  regulation: regulationRepresentation
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleted', regulationId: string): void
}>()

const isDeleting = ref(false)

async function handleDelete() {
  try {
    isDeleting.value = true
    await deleteUserRegulation(props.regulation.id)
    ElMessage.success('Regulacja została usunięta')
    emit('deleted', props.regulation.id)
  } catch (error) {
    ElMessage.error('Nie udało się usunąć regulacji')
    console.error(error)
  } finally {
    isDeleting.value = false
  }
}

async function prepareRegulation(regulationId: string) {
  try {
    await prepareUserRegulation(regulationId)
    ElMessage.success('Regulacja została przygotowana')

  } catch (error) {
    console.error('Nie udało się przygotować regulacji', error)
  }
}
</script>

<template>
  <component
    :is="regulation.isPrepared ? 'router-link' : 'div'"
    :to="
      regulation.isPrepared
        ? {
            name: 'SearchUserRegulation',
            params: { regulationId: regulation.id },
            state: { filename: regulation.presentationName }
          }
        : undefined
    "
    :class="regulation.isPrepared ? 'file-card-link' : ''"
  >
    <el-card shadow="hover" class="file-card">
      <div class="card-content">
        <div class="regulation-info">
          <span class="regulation-name" :title="regulation.presentationName">{{
            regulation.presentationName
          }}</span>
        </div>
        <div class="actions">
          <span v-if="regulation.isPrepared">
            <IconMotion motion-type="search">
              <SearchRoundedIcon />
            </IconMotion>
          </span>

          <form
            v-else
            class="form-action"
            @submit.prevent="prepareRegulation(regulation.id)"
          >
            <button class="icon-btn" type="submit">
              <SettingsIcon />
            </button>
          </form>

          <el-popconfirm
            title="Czy na pewno chcesz usunąć tę regulację?"
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

.regulation-info {
  flex: 1;
  min-width: 0;
}

.regulation-name {
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
