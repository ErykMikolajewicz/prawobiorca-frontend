import {prawobiorcaClient} from '@/api/axios'
import type {searchResult, SearchParams} from '@/types/api/search.ts'

export async function searchInFile(
  searchConfig: SearchParams,
  fileHashStr: string
): Promise<Array<searchResult>> {


  const response = await prawobiorcaClient.get(`/search/public-file/${fileHashStr}`,
    {params: { ...searchConfig } })

  if (response.status === 204) {
    return []
  }
  return response.data
}

