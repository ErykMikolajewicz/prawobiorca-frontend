<script setup lang="ts">
import { ref } from 'vue'
import { deletePublicRegulation } from '@/api/regulations'
import { ElMessage } from 'element-plus'
import type { regulationRepresentation } from '@/types/api/regulations.ts'
import SearchRoundedIcon from '@iconify-vue/material-symbols/search-rounded'
import DeleteOutlineRoundedIcon from '@iconify-vue/material-symbols/delete-outline-rounded'
import IconMotion from '@/components/atoms/IconMotion.vue'
import RegulationTypeBadge from '@/components/atoms/RegulationTypeBadge.vue'

type Props = {
  regulation: regulationRepresentation
  isAdmin?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleted', regulationId: string): void
}>()

const isDeleting = ref(false)

async function handleDelete() {
  try {
    isDeleting.value = true
    await deletePublicRegulation(props.regulation.id)
    ElMessage.success('Regulacja została usunięta')
    emit('deleted', props.regulation.id)
  } catch (error) {
    ElMessage.error('Nie udało się usunąć regulacji')
    console.error(error)
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="regulation-card-wrapper">
    <router-link
      :to="{
        name: 'SearchPublicRegulation',
        params: { regulationId: regulation.id },
        state: { filename: regulation.presentationName }
      }"
      class="regulation-card-link"
    >
      <el-card shadow="hover" class="regulation-card">
        <RegulationTypeBadge :regulation-type="regulation.regulationType" class="type-badge" />
        <div class="card-content">
          <div class="regulation-info">
            <span class="file-name" :title="regulation.presentationName">{{
                regulation.presentationName
              }}</span>
          </div>
          <div class="actions">
            <IconMotion motion-type="search">
              <SearchRoundedIcon />
            </IconMotion>

            <el-popconfirm
              v-if="isAdmin"
              title="Czy na pewno chcesz usunąć tę regulację?"
              confirm-button-text="Tak"
              cancel-button-text="Nie"
              @confirm="handleDelete"
            >
              <template #reference>
                <button
                  class="icon-btn icon-btn-danger"
                  :disabled="isDeleting"
                  @click.prevent.stop
                >
                  <DeleteOutlineRoundedIcon />
                </button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<style scoped>
.regulation-card-wrapper {
  position: relative;
}

.regulation-card {
  position: relative;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.regulation-card:hover {
  box-shadow: var(--app-card-shadow);
}


.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
}

.regulation-info {
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

.type-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
}

.actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: var(--el-text-color-regular);
}

.icon-btn-danger:hover {
  color: var(--el-color-danger);
}

.icon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.regulation-card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.regulation-card-link:hover {
  .regulation-card {
    box-shadow: var(--app-card-shadow);
  }
}
</style>
