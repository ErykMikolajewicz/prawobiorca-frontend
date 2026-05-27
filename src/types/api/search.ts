export type searchResult = {id: string,
  score: number
  text: string}

export type searchParams = {
  query: string,
  threshold: number,
  limit?: number
}
