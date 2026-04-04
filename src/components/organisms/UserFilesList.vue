<script setup lang="ts">
import UserFileCard from '@/components/molecules/UserFileCard.vue';

const props = defineProps<{
  files: Array<{
    presentation_name: string;
    file_hash_str: string;
    is_prepared: boolean;
  }>;
}>();
</script>

<template>
  <h2>Pliki użytkownika</h2>
  <div v-if="files && files.length" class="grid-container">
    <UserFileCard v-for="(file, index) in files" :key="index" :file="file" />
  </div>
  <p v-else>Brak plików.</p>
</template>

