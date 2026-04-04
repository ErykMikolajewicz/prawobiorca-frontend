<script setup lang="ts">

const props = defineProps<{
  userCase: {
    id: string | number;
    name: string;
  };
  index: number;
}>();
</script>

<template>
  <el-card shadow="hover" body-class="card-body">
    <div class="case-card-content">
      <div class="case-header">
        <el-tag type="info" class="me-2">{{ index }}</el-tag>
        <span class="text-truncate fw-bold" :title="userCase.name">{{ userCase.name }}</span>
      </div>
      <div class="case-actions">
        <el-button type="primary" size="small" tag="a" :href="`/user/cases/${userCase.id}`">Przejdź</el-button>
        <div>
          <input type="hidden" name="caseId" :value="userCase.id" />
          <el-button type="danger" size="small">Usuń</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

