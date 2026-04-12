import {prawobiorcaClient} from '@/api/axios'
import type {caseData} from '@/types/api/cases.ts'
import type {articleData} from "@/types/api/articles.ts";


export async function getCases(): Promise<Array<caseData>> {
  const response = await prawobiorcaClient.get('/user/cases')
  if (response.status == 204) {
    return []
  }
  return response.data
}

export async function getCaseArticles(caseId: string): Promise<Array<articleData>> {
  const response = await prawobiorcaClient.get(`/case/${caseId}/articles`)
  if (response.status == 204) {
    return []
  }
  return response.data
}

export async function unpinArticle(caseId: string, articleId: string): Promise<void> {
  await prawobiorcaClient.post('/case/unpin', { article_id: articleId })
}

export async function generatePdf(caseId: string, description: string): Promise<void> {
  const response = await prawobiorcaClient.post('/case/generate-pdf', { description, caseId }, { responseType: 'blob' })

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `wniosek_${caseId}.pdf`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
