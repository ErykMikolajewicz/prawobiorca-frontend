<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import AppNavbar from '@/components/organisms/AppNavbar.vue'
import AppFooter from '@/components/organisms/AppFooter.vue'
import PinnedArticlesList from '@/components/organisms/PinnedArticlesList.vue'
import GeneratePdfForm from '@/components/organisms/GeneratePdfForm.vue'

import { getCaseArticles, unpinArticle, generatePdf } from '@/api/cases.ts'

import type {articleData} from "@/types/api/articles.ts"
import {ArrowLeft} from "@element-plus/icons-vue"

const route = useRoute()
const router = useRouter()
const caseId = route.params.id as string

const authStore = useAuthStore()
const { isUserLogged } = storeToRefs(authStore)

const articles = ref<Array<articleData>>([])

const loadArticles = async () => {
  if (isUserLogged.value) {
    articles.value = await getCaseArticles(caseId)
  }
}

onBeforeMount(async () => {
  await loadArticles()
})

const handleUnpin = async (articleId: string) => {
  await unpinArticle(caseId, articleId)
  await loadArticles()
}

const handleGeneratePdf = async (description: string) => {
  await generatePdf(caseId, description)
}
</script>

<template>
  <div class="page-container">
    <AppNavbar />

    <main class="case-page">
      <el-button link @click="router.push('/')">
        <el-icon><ArrowLeft /></el-icon> Powrót do głównego ekranu
      </el-button>

    <h1>Szczegóły Sprawy</h1>

      <el-row :gutter="20">
        <el-col :span="12">
          <section>
            <h2>Przypięte Artykuły</h2>
            <PinnedArticlesList :articles="articles" @unpin="handleUnpin" />
          </section>
        </el-col>
        <el-col :span="12">
          <section>
            <h2>Kontekst / Opis Wniosku</h2>
            <GeneratePdfForm :caseId="caseId" @generate-pdf="handleGeneratePdf" />
          </section>
        </el-col>
      </el-row>
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

.case-page {
  flex-grow: 1;
}
</style>
