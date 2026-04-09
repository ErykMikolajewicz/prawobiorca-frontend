import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import LoginPage from "@/pages/LoginPage.vue"
import RegisterPage from "@/pages/RegisterPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.PRAWOBIORCA_API_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/auth/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/accounts/register',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ],
})

export default router
