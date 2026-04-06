<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = () => {
  router.push('/auth/login')
}

const handleLogout = async () => {
  await authStore.logout()
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
