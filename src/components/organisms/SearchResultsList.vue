<script setup lang="ts">
import SearchResultItem from '@/components/molecules/SearchResultItem.vue'

defineProps<{
  results: Array<string>
  filename: string
  selectedCaseId?: string
  query: string
}>()

const emit = defineEmits<{
  (e: 'add-to-case', payload: { articleContent: string }): void
}>()

const onAddToCase = (payload: { articleContent: string }) => {
  emit('add-to-case', payload)
}
</script>

<template>
  <div class="search-results">
    <el-divider />

    <div v-if="results.length">
      <h2>Wyniki:</h2>
        <SearchResultItem
          v-for="(result, index) in results"
          :key="index"
          :result="result"
          :filename="filename"
          :selected-case-id="selectedCaseId"
          @add-to-case="onAddToCase"
        />
    </div>
    <div v-else-if="query">
      <p>Brak wyników dla zapytania: "{{ query }}"</p>
    </div>
  </div>
</template>
