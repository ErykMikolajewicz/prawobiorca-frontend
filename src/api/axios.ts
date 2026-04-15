import axios from 'axios'

export const prawobiorcaClient = axios.create({
  baseURL: import.meta.env.VITE_PRAWOBIORCA_API_URL
})
prawobiorcaClient.defaults.withCredentials = true
