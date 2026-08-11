<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import AppNavbar from '@/components/organisms/AppNavbar.vue'
import AppFooter from '@/components/organisms/AppFooter.vue'
import PublicFilesList from '@/components/organisms/PublicRegulationsList.vue'
import UserRegulationsList from '@/components/organisms/UserRegulationsList.vue'
import UserCasesList from '@/components/organisms/UserCasesList.vue'
import RegulationUploadDialog from '@/components/molecules/RegulationUploadDialog.vue'
import { getPublicRegulations, getUserRegulations } from '@/api/regulations.ts'
import type { regulationRepresentation } from '@/types/api/regulations.ts'
import { getCases } from '@/api/cases.ts'
import type { caseData } from '@/types/api/cases.ts'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { isUserLogged, isAdmin } = storeToRefs(authStore)

const publicRegulations = ref<Array<regulationRepresentation>>([])

const userRegulations = ref<Array<regulationRepresentation>>([])

const cases = ref<Array<caseData>>([])

const isUploadDialogVisible = ref(false)

function handleCaseCreated(newCase: caseData) {
  cases.value.push(newCase)
}

function handleRegulationCreated(regulation: regulationRepresentation, target: 'user' | 'public') {
  if (target === 'public') {
    publicRegulations.value.push(regulation)
  } else {
    userRegulations.value.push(regulation)
  }
}

function handleUserRegulationDeleted(regulationId: string) {
  userRegulations.value = userRegulations.value.filter((regulation) => regulation.id !== regulationId)
}

function handleCaseDeleted(caseId: string) {
  cases.value = cases.value.filter((c) => c.id !== caseId)
}

onBeforeMount(async () => {
  try {
    publicRegulations.value = await getPublicRegulations()
  } catch (error) {
    console.error('Failed to fetch public files:', error)
    publicRegulations.value = []
  }

  if (isUserLogged.value) {
    try {
      userRegulations.value = await getUserRegulations()
      cases.value = await getCases()
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      userRegulations.value = []
      cases.value = []
    }
  }
})
</script>

<template>
  <div class="page-container">
    <AppNavbar />

    <main class="main-content">
      <div v-if="isUserLogged" class="page-actions">
        <el-button type="primary" @click="isUploadDialogVisible = true">Dodaj plik</el-button>
      </div>

      <PublicFilesList :regulations="publicRegulations" />

      <el-divider />

      <template v-if="isUserLogged">
        <UserRegulationsList :regulations="userRegulations"
                       @user-regulation-deleted="handleUserRegulationDeleted"/>

        <el-divider />

        <UserCasesList
          :cases="cases"
          @case-deleted="handleCaseDeleted"
          @case-created="handleCaseCreated"
        />
      </template>
    </main>

    <RegulationUploadDialog
      v-model="isUploadDialogVisible"
      :is-admin="isAdmin"
      @created="handleRegulationCreated"
    />

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
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.page-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
  }
}
</style>
