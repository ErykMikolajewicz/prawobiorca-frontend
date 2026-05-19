import { prawobiorcaClient } from '@/api/axios'
import type { fileRepresentation } from '@/types/api/files.ts'


export async function getPublicFiles(): Promise<Array<fileRepresentation>> {
    try {
        const response = await prawobiorcaClient.get('/files')
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


export async function getUserFiles(): Promise<Array<fileRepresentation>> {
    try {
        const response = await prawobiorcaClient.get('/user/files')
        if (response.status == 204) {
            return []
        }
        if (Array.isArray(response.data)) {
            return response.data
        }
        console.error('Invalid response format for user files:', response.data)
        return []
    } catch (error) {
        console.error('Failed to fetch user files:', error)
        return []
    }
}

export async function uploadFile(file: File): Promise<string> {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await prawobiorcaClient.post('/user/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // API returns file_hash_str in response?
        if (response.data?.file_hash_str) {
            return response.data.file_hash_str
        }
        console.error('No file_hash_str in upload response:', response.data)
        throw new Error('Upload successful but no file hash returned')
    } catch (error) {
        console.error('Failed to upload file:', error)
        throw error
    }
}

export async function deleteUserFile(fileHashString: string): Promise<void> {
    await prawobiorcaClient.delete(`/user/files/${fileHashString}`)

}
