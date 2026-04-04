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
  <el-card shadow="hover" body-class="card-body">
    <div class="card-content">
      <span class="text-truncate" :title="file.presentation_name">{{ file.presentation_name }}</span>
      <form v-if="file.is_prepared" action="/search/user/file" method="get" class="m-0">
        <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
        <input type="hidden" name="filename" :value="file.presentation_name" />
        <el-button type="primary" size="small" native-type="submit">Przeszukaj</el-button>
      </form>
      <form v-else :action="`/user/files/${file.presentation_name}/preparation`" method="post" class="m-0">
        <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
        <el-button type="primary" size="small" native-type="submit">Przygotuj plik</el-button>
      </form>
    </div>
  </el-card>
</template>
