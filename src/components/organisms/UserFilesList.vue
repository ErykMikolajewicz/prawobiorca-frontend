<script setup lang="ts">
import UserFileCard from '@/components/molecules/UserFileCard.vue'

type Props = {
  files: Array<{
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }>;
}

defineProps<Props>()
</script>

<template>
  <h2>Pliki użytkownika</h2>
    <UserFileCard v-for="(file, index) in files" :key="index" :file="file" />
  <p v-if="!files.length">Brak plików.</p>
</template>

