export type searchResult = {id: string,
  text: string}

export type SearchParams = {
  query: string,
  threshold: number,
  limit?: number
}
