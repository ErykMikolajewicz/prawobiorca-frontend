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
  <el-card>
    <el-tag type="info">{{ index }}</el-tag>
    <span :title="userCase.name">{{ userCase.name }}</span>
    <el-button :href="`/user/cases/${userCase.id}`">Przejdź</el-button>
    <input type="hidden" name="caseId" :value="userCase.id" />
    <el-button>Usuń</el-button>
  </el-card>
</template>
