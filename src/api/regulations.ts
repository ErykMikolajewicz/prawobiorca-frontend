import axios from 'axios'
import { prawobiorcaClient } from '@/api/axios'
import type {
  regulationData,
  regulationRepresentation,
  regulationType,
  regulationUploadTarget,
} from '@/types/api/regulations.ts'
import type { searchParams, searchResult } from '@/types/api/search.ts'

export async function getPublicRegulations(
  regulationType?: regulationType,
): Promise<Array<regulationRepresentation>> {
  try {
    const response = await prawobiorcaClient.get('/regulations', {
      params: regulationType ? { documentType: regulationType } : undefined,
    })

    if (response.status === 204) {
      return []
    }
    if (Array.isArray(response.data)) {
      return response.data
    }
    console.error('Invalid response format for public files:', response.data)
    return []
  } catch (error) {
    console.error('Failed to fetch public files:', error)
    return []
  }
}

export async function getUserRegulations(
  regulationType?: regulationType,
): Promise<Array<regulationRepresentation>> {
  try {
    const response = await prawobiorcaClient.get('/user/regulations', {
      params: regulationType ? { documentType: regulationType } : undefined,
    })

    if (response.status === 204) {
      return []
    }
    if (Array.isArray(response.data)) {
      return response.data
    }
    console.error('Invalid response format for user regulations:', response.data)
    return []
  } catch (error) {
    console.error('Failed to fetch user regulations:', error)
    return []
  }
}

export async function createPublicRegulation(
  data: regulationData,
): Promise<regulationUploadTarget> {
  const response = await prawobiorcaClient.post('/regulations', data)
  return response.data
}

export async function createUserRegulation(data: regulationData): Promise<regulationUploadTarget> {
  const response = await prawobiorcaClient.post('/user/regulations', data)
  return response.data
}

export async function uploadFileToStorage(
  target: regulationUploadTarget,
  file: File,
): Promise<void> {
  const formData = new FormData()
  for (const [key, value] of Object.entries(target.fields)) {
    formData.append(key, value)
  }
  formData.append('file', file)

  let uploadUrl = target.url
  if (import.meta.env.DEV && uploadUrl.includes('localhost:9000')) {
    uploadUrl = uploadUrl.replace(/^https?:\/\/localhost:9000/, '/storage')
  }

  await axios.post(uploadUrl, formData)
}

export async function confirmPublicRegulationUpload(regulationId: string): Promise<void> {
  await prawobiorcaClient.post(`/regulations/${regulationId}/confirm-upload`)
}

export async function confirmUserRegulationUpload(regulationId: string): Promise<void> {
  await prawobiorcaClient.post(`/user/regulations/${regulationId}/confirm-upload`)
}

export async function getPublicRegulationDownloadUrl(regulationId: string): Promise<string> {
  const response = await prawobiorcaClient.get(`/regulations/${regulationId}/download-url`)
  const url = response.data
  if (import.meta.env.DEV && typeof url === 'string' && url.includes('localhost:9000')) {
    return url.replace(/^https?:\/\/localhost:9000/, '/storage')
  }
  return url
}

export async function getUserRegulationDownloadUrl(regulationId: string): Promise<string> {
  const response = await prawobiorcaClient.get(`/user/regulations/${regulationId}/download-url`)
  const url = response.data
  if (import.meta.env.DEV && typeof url === 'string' && url.includes('localhost:9000')) {
    return url.replace(/^https?:\/\/localhost:9000/, '/storage')
  }
  return url
}

export async function uploadUserRegulation(
  regulation: File,
  presentationName: string,
  regulationType?: regulationType,
): Promise<string> {
  try {
    const uploadTarget = await createUserRegulation({
      name: presentationName,
      regulation_type: regulationType || null,
    })

    await uploadFileToStorage(uploadTarget, regulation)
    await confirmUserRegulationUpload(uploadTarget.id)

    return uploadTarget.id
  } catch (error) {
    console.error('Failed to upload user regulation:', error)
    throw error
  }
}

export async function uploadPublicRegulation(
  regulation: File,
  presentationName: string,
  regulationType?: regulationType,
): Promise<string> {
  try {
    const uploadTarget = await createPublicRegulation({
      name: presentationName,
      regulation_type: regulationType || null,
    })

    await uploadFileToStorage(uploadTarget, regulation)
    await confirmPublicRegulationUpload(uploadTarget.id)

    return uploadTarget.id
  } catch (error) {
    console.error('Failed to upload public regulation:', error)
    throw error
  }
}

export async function deleteUserRegulation(regulationId: string): Promise<void> {
  await prawobiorcaClient.delete(`/user/regulations/${regulationId}`)
}

export async function deletePublicRegulation(regulationId: string): Promise<void> {
  await prawobiorcaClient.delete(`/regulations/${regulationId}`)
}

export async function prepareUserRegulation(regulationId: string): Promise<void> {
  await prawobiorcaClient.post(`/user/regulations/${regulationId}/preparation`)
}

export async function preparePublicRegulation(regulationId: string): Promise<void> {
  await prawobiorcaClient.post(`/regulations/${regulationId}/preparation`)
}

export async function searchRegulation(
  searchParams: searchParams,
  regulationId: string,
): Promise<Array<searchResult>> {
  const response = await prawobiorcaClient.get(`/regulations/${regulationId}/documents`, {
    params: { ...searchParams },
  })

  if (response.status === 204) {
    return []
  }
  return response.data
}

export async function searchUserRegulation(
  searchParams: searchParams,
  regulationId: string,
): Promise<Array<searchResult>> {
  const response = await prawobiorcaClient.get(`/user/regulations/${regulationId}/documents`, {
    params: { ...searchParams },
  })

  if (response.status === 204) {
    return []
  }
  return response.data
}
