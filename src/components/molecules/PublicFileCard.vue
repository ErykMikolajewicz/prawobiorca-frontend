<script setup lang="ts">

const props = defineProps<{
  file: {
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }
}>();
</script>

<template>
  <el-card>
    <span class="text-truncate" :title="file.presentation_name">{{ file.presentation_name }}</span>
    <form action="/search/public-file" method="get" class="m-0">
      <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
      <input type="hidden" name="filename" :value="file.presentation_name" />
      <el-button type="primary" size="small" native-type="submit" :disabled="!file.is_prepared">Przeszukaj</el-button>
    </form>
  </el-card>
</template>
