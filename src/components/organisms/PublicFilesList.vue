<script setup lang="ts">
import PublicFileCard from '@/components/molecules/PublicFileCard.vue'

type Props = {
  files: Array<{
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }>
}

defineProps<Props>()
</script>

<template>
  <h2>Pliki publiczne</h2>
  <PublicFileCard v-for="(file, index) in files" :key="index" :file="file" />
  <p v-if="!files.length">Brak plików.</p>
</template>
