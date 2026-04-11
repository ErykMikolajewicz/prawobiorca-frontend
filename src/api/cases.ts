import {prawobiorcaClient} from '@/api/axios'
import type {caseData} from '@/types/api/cases.ts'


export async function getCases(): Promise<Array<caseData>> {
  const response = await prawobiorcaClient.get('/user/cases')
  if (response.status == 204) {
    return []
  }
  return response.data
}
