export type searchResult = {id: string,
  score: number
  text: string}

export type SearchParams = {
  query: string,
  threshold: number,
  limit?: number
}
