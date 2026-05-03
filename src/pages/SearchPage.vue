<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

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
import type {searchResult, SearchParams} from "@/types/api/search.ts"

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { isUserLogged } = storeToRefs(authStore)

const fileHashStr = ref((route.params.fileHashStr as string) || '')
const filename = history.state.filename
const searchParams = ref<SearchParams>({query: (route.query.query as string) || '',
  threshold: route.query.threshold !== undefined ? Number(route.query.threshold) : 0.7,
  limit: route.query.limit ? Number(route.query.limit) : undefined})

const cases = ref<Array<caseData>>([])
const selectedCaseId = ref<string>('')
const results = ref<Array<searchResult>>([])
const isSearching = ref(false)

onBeforeMount(async () => {
  if (isUserLogged.value) {
    cases.value = await getCases()
  }

})

const handleSearch = async (newSearchParams: SearchParams) => {
  searchParams.value = newSearchParams

  await router.replace({
    query: newSearchParams
  })

  await performSearch(newSearchParams)
}

async function performSearch(searchParams: SearchParams) {

  isSearching.value = true
  try {
    results.value =  await searchInFile(searchParams, fileHashStr.value)
  } catch (error) {
    ElMessage.error('Wystąpił błąd podczas przeszukiwania pliku.')
    console.error(error)
  } finally {
    isSearching.value = false
  }
}

async function handleAddToCase(payload: { articleContent: string }){
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
  <div class="page-container">
    <AppNavbar />

    <main class="main-content">
      <el-button link @click="router.push('/')">
        <el-icon><ArrowLeft /></el-icon> Powrót do głównego ekranu
      </el-button>

      <CaseSelector
        :cases="cases"
        v-model:selectedCaseId="selectedCaseId"
      />

    <h1>Przeszukaj plik: {{ filename }}</h1>

      <div v-loading="isSearching">
        <SearchForm
          :search-params="searchParams"
          @search="handleSearch"
        />

        <SearchResultsList
          :results="results"
          :selected-case-id="selectedCaseId"
          :query="searchParams.query"
          @add-to-case="handleAddToCase"
        />
      </div>
    </main>

  <AppFooter />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
}
</style>
