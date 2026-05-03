<script setup lang="ts">
import SearchResultItem from '@/components/molecules/SearchResultItem.vue'
import type {searchResult} from '@/types/api/search.ts'

defineProps<{
  results: Array<searchResult>
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
          v-for="{ id, text, score } in results"
          :key="id"
          :result="text"
          :score="score"
          :selected-case-id="selectedCaseId"
          @add-to-case="onAddToCase"
        />
    </div>
    <div v-else-if="query">
      <p>Brak wyników dla zapytania: "{{ query }}"</p>
    </div>
  </div>
</template>
