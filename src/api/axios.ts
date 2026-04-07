import axios from 'axios'

export const prawobiorcaClient = axios.create({
  baseURL: import.meta.env.PRAWOBIORCA_API_URL
})
