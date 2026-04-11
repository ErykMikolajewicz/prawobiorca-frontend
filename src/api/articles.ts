import {prawobiorcaClient} from "@/api/axios.ts"

export async function addArticleToCase(caseId: string, documentName: string, articleContent: string) {
  const response = await prawobiorcaClient.post('/user/cases/articles', {
    case_id: caseId,
    document_name: documentName,
    article_content: articleContent
  })
  return response.data
}
