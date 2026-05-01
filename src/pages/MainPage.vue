<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import AppNavbar from '@/components/organisms/AppNavbar.vue'
import AppFooter from '@/components/organisms/AppFooter.vue'
import PublicFilesList from '@/components/organisms/PublicFilesList.vue'
import UserFilesList from '@/components/organisms/UserFilesList.vue'
import UserCasesList from '@/components/organisms/UserCasesList.vue'
import AddFileForm from '@/components/organisms/AddFileForm.vue'
import NewCaseForm from '@/components/organisms/NewCaseForm.vue'
import {getPublicFiles, getUserFiles} from "@/api/files.ts"
import type {fileRepresentation} from '@/types/api/files.ts'
import {getCases} from "@/api/cases.ts"
import type {caseData} from '@/types/api/cases.ts'


import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { isUserLogged } = storeToRefs(authStore)

const publicFiles = ref<Array<fileRepresentation>>([])

const userFiles = ref<Array<fileRepresentation>>([])

const cases = ref<Array<caseData>>([])

function handleCaseCreated(newCase: caseData) {
  cases.value.push(newCase)
}

function handleFileDeleted(fileHashStr: string) {
  userFiles.value = userFiles.value.filter(file => file.file_hash_str !== fileHashStr)
}

function handleCaseDeleted(caseId: string) {
  cases.value = cases.value.filter(c => c.id !== caseId)
}

onBeforeMount(async () => {
  publicFiles.value = await getPublicFiles()
  if (isUserLogged.value){
    userFiles.value = await getUserFiles()
    cases.value = await getCases()
  }
})
</script>

<template>
  <div class="page-container">
    <AppNavbar />

    <main class="main-content">
      <PublicFilesList :files="publicFiles" />

      <el-divider />

      <template v-if="isUserLogged">
        <UserFilesList :files="userFiles" @file-deleted="handleFileDeleted" />

        <el-divider />

        <AddFileForm />

        <el-divider />

        <UserCasesList :cases="cases" @case-deleted="handleCaseDeleted" />

        <el-divider />

        <NewCaseForm @case-created="handleCaseCreated" />
      </template>
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

