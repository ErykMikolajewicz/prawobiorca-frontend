<script setup lang="ts">

type Props = {
  file: {
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }
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
