<script setup lang="ts">
import PublicFileCard from '@/components/molecules/PublicFileCard.vue';

const props = defineProps<{
  files: Array<{
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }>;
}>();
</script>

<template>
  <h2>Pliki publiczne</h2>
  <PublicFileCard v-for="(file, index) in files" :key="index" :file="file" />
  <p v-if="files.length === 0">Brak plików.</p>
</template>
