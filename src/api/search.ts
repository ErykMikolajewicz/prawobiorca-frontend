import {prawobiorcaClient} from '@/api/axios'

export async function searchInFile(query: string, fileHashStr: string, filename: string): Promise<Array<string>> {
  const response = await prawobiorcaClient.post('/search', {
    query,
    fileHashStr,
    filename
  })

  if (response.status === 204) {
    return []
  }
  return response.data.results
}

