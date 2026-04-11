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
    <router-link v-if="file.is_prepared" :to="{ path: '/search/user/file', query: { fileHashStr: file.file_hash_str, filename: file.presentation_name } }">
      <el-button>Przeszukaj</el-button>
    </router-link>
    <form v-else :action="`/user/files/${file.presentation_name}/preparation`" method="post">
      <input type="hidden" name="fileHashStr" :value="file.file_hash_str" />
      <el-button native-type="submit">Przygotuj plik</el-button>
    </form>
  </el-card>
</template>
