<script setup lang="ts">
import CaseCard from '@/components/molecules/CaseCard.vue';

const props = defineProps<{
  cases: Array<{
    id: string | number;
    name: string;
  }>;
}>();
</script>

<template>
  <div>
    <h2>Moje sprawy</h2>
    <div v-if="cases && cases.length" class="grid-container">
      <CaseCard v-for="(userCase, index) in cases" :key="userCase.id" :userCase="userCase" :index="index + 1" />
    </div>
    <p v-else>Brak spraw.</p>
  </div>
</template>

