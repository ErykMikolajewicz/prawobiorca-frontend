import {prawobiorcaClient} from '@/api/axios'

export async function searchInFile(query: string, fileHashStr: string, filename: string): Promise<Array<string>> {
  const response = await prawobiorcaClient.get('/search/public-file', { params: {
    query,
    fileHashStr,
    filename
  }} )

  if (response.status === 204) {
    return []
  }
  return response.data
}

