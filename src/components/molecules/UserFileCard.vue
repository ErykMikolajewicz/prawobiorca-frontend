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
    <form v-if="file.is_prepared" action="/search/user/file" method="get">
      <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
      <input type="hidden" name="filename" :value="file.presentation_name" />
      <el-button>Przeszukaj</el-button>
    </form>
    <form v-else :action="`/user/files/${file.presentation_name}/preparation`" method="post">
      <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
      <el-button>Przygotuj plik</el-button>
    </form>
  </el-card>
</template>
