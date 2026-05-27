import {prawobiorcaClient} from '@/api/axios'
import type {regulationRepresentation} from '@/types/api/regulations.ts'
import type {searchParams, searchResult} from "@/types/api/search.ts"


export async function getPublicRegulations(): Promise<Array<regulationRepresentation>> {
    try {
        const response = await prawobiorcaClient.get('/regulations')
        if (response.status == 204) {
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


export async function getUserRegulations(): Promise<Array<regulationRepresentation>> {
    try {
        const response = await prawobiorcaClient.get('/user/regulations')
        if (response.status == 204) {
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

export async function uploadRegulation(regulation: File): Promise<string> {
    try {
        const formData = new FormData()
        formData.append('regulation', regulation)
        const response = await prawobiorcaClient.post('/user/regulations', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (response.data) {
            return response.data
        }
        throw new Error('Upload successful but no regulation id returned')
    } catch (error) {
        console.error('Failed to upload regulation:', error)
        throw error
    }
}

export async function deleteUserRegulation(regulationId: string): Promise<void> {
    await prawobiorcaClient.delete(`/user/regulations/${regulationId}`)

}

export async function searchRegulation(
  searchParams: searchParams,
  regulationId: string
): Promise<Array<searchResult>> {


  const response = await prawobiorcaClient.get(`/regulations/${regulationId}/documents`,
    {params: {...searchParams}})

  if (response.status === 204) {
    return []
  }
  return response.data
}
