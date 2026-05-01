<script setup lang="ts">
import { ref } from 'vue'
import { deleteCase } from '@/api/cases'
import { ElMessage } from 'element-plus'

type Props = {
  userCase: {
    id: string;
    name: string;
  };
  index: number;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'deleted', caseId: string): void
}>()

const isDeleting = ref(false)

async function handleDelete() {
  try {
    isDeleting.value = true
    await deleteCase(props.userCase.id)
    ElMessage.success('Sprawa została usunięta')
    emit('deleted', props.userCase.id)
  } catch (error) {
    ElMessage.error('Nie udało się usunąć sprawy')
    console.error(error)
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <el-card shadow="hover" class="case-card">
    <div class="card-content">
      <div class="case-info">
        <span class="case-name" :title="userCase.name">{{ userCase.name }}</span>
      </div>
      <div class="actions">
        <router-link class="action-link" :to="`/user/cases/${userCase.id}`">
          <el-button type="primary" class="full-width-btn">Przejdź</el-button>
        </router-link>
        <el-popconfirm
          title="Czy na pewno chcesz usunąć tę sprawę?"
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
.case-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.case-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(138, 43, 226, 0.12);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.case-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.case-name {
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
  width: 100%;
}
</style>
