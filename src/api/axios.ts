import axios from 'axios'

export const prawobiorca_client = axios.create({
  baseURL: import.meta.env.PRAWOBIORCA_API_URL
})

prawobiorca_client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
