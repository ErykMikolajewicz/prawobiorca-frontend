import {prawobiorcaClient} from "@/api/axios.ts"

export async function addArticleToCase(caseId: string, presentationName: string, content: string) {
  const response = await prawobiorcaClient.post(`/user/cases/${caseId}/articles`, {
    presentationName: presentationName,
    content: content
  })
  return response.data
}
