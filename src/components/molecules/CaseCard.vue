<script setup lang="ts">

const props = defineProps<{
  userCase: {
    id: string;
    name: string;
  };
  index: number;
}>();
</script>

<template>
  <el-card>
    <el-tag type="info">{{ index }}</el-tag>
    <span class="text-truncate fw-bold" :title="userCase.name">{{ userCase.name }}</span>
    <el-button type="primary" size="small" tag="a" :href="`/user/cases/${userCase.id}`">Przejdź</el-button>
    <input type="hidden" name="caseId" :value="userCase.id" />
    <el-button type="danger" size="small">Usuń</el-button>
  </el-card>
</template>
