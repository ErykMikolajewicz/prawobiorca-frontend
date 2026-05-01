<script setup lang="ts">

type Props = {
  userCase: {
    id: string;
    name: string;
  };
  index: number;
}

defineProps<Props>()
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
        <div class="form-action">
          <input type="hidden" name="caseId" :value="userCase.id" />
          <el-button type="danger" class="full-width-btn">Usuń</el-button>
        </div>
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
