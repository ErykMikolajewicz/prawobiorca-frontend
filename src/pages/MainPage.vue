<script setup lang="ts">
import { ref } from 'vue';
import AppNavbar from '@/components/organisms/AppNavbar.vue';
import AppFooter from '@/components/organisms/AppFooter.vue';
import PublicFilesList from '@/components/organisms/PublicFilesList.vue';
import UserFilesList from '@/components/organisms/UserFilesList.vue';
import UserCasesList from '@/components/organisms/UserCasesList.vue';
import AddFileForm from '@/components/organisms/AddFileForm.vue';
import NewCaseForm from '@/components/organisms/NewCaseForm.vue';

const isUserLogged = ref(true);

const publicFiles = ref([
  { presentation_name: 'File 1', file_hash_str: 'hash1', is_prepared: true },
  { presentation_name: 'File 2', file_hash_str: 'hash2', is_prepared: false }
]);

const userFiles = ref([
  { presentation_name: 'User File 1', file_hash_str: 'uhash1', is_prepared: true },
  { presentation_name: 'User File 2', file_hash_str: 'uhash2', is_prepared: false }
]);

const cases = ref([
  { id: '1', name: 'Podanie o akademik' },
  { id: '2', name: 'Zwolnienie z wfu' }]);
</script>

<template>
  <div class="main-page">
    <AppNavbar />

    <main class="content-container">

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
  </div>
</template>

