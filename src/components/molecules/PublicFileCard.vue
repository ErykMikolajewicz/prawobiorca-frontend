<script setup lang="ts">
import type {fileRepresentation} from '@/types/api/files.ts'

type Props = {
  file: fileRepresentation
}

defineProps<Props>()
</script>

<template>
  <el-card>
    <span :title="file.presentation_name">{{ file.presentation_name }}</span>
    <router-link :to="{ path: '/search/public-file', query: { fileHashStr: file.file_hash_str, filename: file.presentation_name } }">
      <el-button :disabled="!file.is_prepared">Przeszukaj</el-button>
    </router-link>
  </el-card>
</template>
