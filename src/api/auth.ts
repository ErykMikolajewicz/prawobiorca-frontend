import { prawobiorca_client } from '@/api/axios'

export const logout = async (): Promise<void> => {
  await prawobiorca_client.post('/auth/logout')
}
