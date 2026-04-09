<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogin() {
  await router.push('/auth/login')
}

async function handleLogout() {
  await authStore.logout()
  await router.push('/')
}
</script>

<template>
  <el-button
    v-if="authStore.isUserLogged"
    @click="handleLogout"
  >
    Wyloguj się
  </el-button>

  <el-button
    v-else
    @click="handleLogin"
  >
    Zaloguj się
  </el-button>
</template>
