<script setup lang="ts">
import PublicFileCard from '@/components/molecules/PublicFileCard.vue'
import type {fileRepresentation} from '@/types/api/files.ts'

type Props = {
  files: Array<fileRepresentation>
}

defineProps<Props>()
</script>

<template>
  <h2>Pliki publiczne</h2>
  <PublicFileCard v-for="file in files" :key="file.file_hash_str" :file="file" />
  <p v-if="!files.length">Brak plików.</p>
</template>
