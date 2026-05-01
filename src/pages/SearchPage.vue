<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

import AppNavbar from '@/components/organisms/AppNavbar.vue'
import AppFooter from '@/components/organisms/AppFooter.vue'
import SearchForm from '@/components/organisms/SearchForm.vue'
import CaseSelector from '@/components/molecules/CaseSelector.vue'
import SearchResultsList from '@/components/organisms/SearchResultsList.vue'

import { useAuthStore } from '@/stores/auth'
import { getCases } from '@/api/cases'
import { searchInFile } from '@/api/search'
import type { caseData } from '@/types/api/cases'
import {addArticleToCase} from "@/api/articles.ts"
import type {searchResult} from "@/types/api/search.ts"

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { isUserLogged } = storeToRefs(authStore)

const filename = ref((route.query.filename as string) || '')
const fileHashStr = ref((route.query.fileHashStr as string) || '')

const cases = ref<Array<caseData>>([])
const selectedCaseId = ref<string>('')
const results = ref<Array<searchResult>>([])
const currentQuery = ref('')
const isSearching = ref(false)

onBeforeMount(async () => {
  if (isUserLogged.value) {
    cases.value = await getCases()
  }

})

const handleSearch = async (query: string) => {
  currentQuery.value = query
  await router.replace({
    query: { ...route.query, query }
  })

  await performSearch(query)
}

const performSearch = async (query: string) => {
  if (!fileHashStr.value) {
    ElMessage.error('Brak identyfikatora pliku.')
    return
  }

  isSearching.value = true
  try {
    const fetchedResults = await searchInFile(query, fileHashStr.value, filename.value)
    results.value = fetchedResults
  } catch (error) {
    ElMessage.error('Wystąpił błąd podczas przeszukiwania pliku.')
    console.error(error)
  } finally {
    isSearching.value = false
  }
}

const handleAddToCase = async (payload: { articleContent: string }) => {
  if (!selectedCaseId.value) {
    ElMessage.warning('Wybierz sprawę z listy.')
    return
  }

  try {
    await addArticleToCase(selectedCaseId.value, filename.value, payload.articleContent)
    ElMessage.success('Dodano do sprawy.')
  } catch (error) {
    ElMessage.error('Wystąpił błąd podczas dodawania do sprawy.')
    console.error(error)
  }
}
</script>

<template>
  <AppNavbar />

  <main>
    <el-button link @click="router.push('/')">
      <el-icon><ArrowLeft /></el-icon> ← Powrót do głównego ekranu
    </el-button>

    <CaseSelector
      :cases="cases"
      v-model:selectedCaseId="selectedCaseId"
    />

    <h1>Przeszukaj plik: {{ filename }}</h1>

    <div v-loading="isSearching">
      <SearchForm
        :current-query="currentQuery"
        @search="handleSearch"
      />

      <SearchResultsList
        :results="results"
        :filename="filename"
        :selected-case-id="selectedCaseId"
        :query="currentQuery"
        @add-to-case="handleAddToCase"
      />
    </div>
  </main>

  <AppFooter />
</template>
