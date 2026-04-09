import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as authApi from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const isUserLogged = ref(false)

  async function checkIsLogged(): Promise<void> {
    isUserLogged.value = await authApi.isLogged()
  }

   async function login(username: string, password: string): Promise<void> {
      await authApi.login(username, password)
      isUserLogged.value = true
  }

  async function logout() {
    try {
      await authApi.logout()
    } finally {
      isUserLogged.value = false
    }
  }

  return { isUserLogged, checkIsLogged, login, logout}
})
