<script setup lang="ts">
import CaseCard from '@/components/molecules/CaseCard.vue';

const props = defineProps<{
  cases: Array<{
    id: string;
    name: string;
  }>;
}>();
</script>

<template>
  <h2>Moje sprawy</h2>
  <CaseCard v-for="(userCase, index) in cases" :key="userCase.id" :userCase="userCase" :index="index + 1" />
  <p v-if="cases.length===0">Brak spraw.</p>
</template>

