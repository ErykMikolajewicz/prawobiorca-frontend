import { prawobiorcaClient } from '@/api/axios'
import axios from 'axios'

export async function logout(): Promise<void> {
  await prawobiorcaClient.post('/auth/logout')
}

export async function login(): Promise<void> {
  await prawobiorcaClient.post('/auth/login')
}

export async function isLogged(): Promise<boolean> {
  try {
    await prawobiorcaClient.get('/auth/me')
    return true
  }
  catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return false
      }
    }
    throw error
  }
}
