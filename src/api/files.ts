import {prawobiorcaClient} from '@/api/axios'
import type {fileRepresentation} from '@/types/api/files.ts'


export async function getPublicFiles(): Promise<Array<fileRepresentation>> {
  const response = await prawobiorcaClient.get('/files')
  if (response.status == 204) {
    return []
  }
  return response.data
}


export async function getUserFiles(): Promise<Array<fileRepresentation>> {
  const response = await prawobiorcaClient.get('/user/files')
  if (response.status == 204) {
    return []
  }
  return response.data
}
