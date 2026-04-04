import { defineStore } from 'pinia';
import { ref } from 'vue';

import * as authApi from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const isUserLogged = ref(false);

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      isUserLogged.value = false;
    }
  }

  const login = async () => {
    isUserLogged.value = true;
  };

  return { isUserLogged, logout, login };
});
