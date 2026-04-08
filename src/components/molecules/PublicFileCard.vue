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
    <form action="/search/public-file" method="get">
      <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
      <input type="hidden" name="filename" :value="file.presentation_name" />
      <el-button :disabled="!file.is_prepared">Przeszukaj</el-button>
    </form>
  </el-card>
</template>
