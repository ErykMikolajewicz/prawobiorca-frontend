<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import AppNavbar from '@/components/organisms/AppNavbar.vue'
import AppFooter from '@/components/organisms/AppFooter.vue'
import PublicFilesList from '@/components/organisms/PublicFilesList.vue'
import UserFilesList from '@/components/organisms/UserFilesList.vue'
import UserCasesList from '@/components/organisms/UserCasesList.vue'
import AddFileForm from '@/components/organisms/AddFileForm.vue'
import NewCaseForm from '@/components/organisms/NewCaseForm.vue'


import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { isUserLogged } = storeToRefs(authStore)

const publicFiles = ref([])

const userFiles = ref([])

const cases = ref([])
</script>

<template>
  <AppNavbar />

  <main>

    <PublicFilesList :files="publicFiles" />

    <el-divider />

    <template v-if="isUserLogged">
      <UserFilesList :files="userFiles" />

      <el-divider />

      <AddFileForm />

      <el-divider />

      <UserCasesList :cases="cases" />

      <el-divider />

      <NewCaseForm />
    </template>
  </main>

  <AppFooter />
</template>

