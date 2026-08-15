
export type regulationType = 'ACT' | 'DECREE' | 'STATUTE'

export type regulationRepresentation = {
  id: string
  presentationName: string
  isPrepared: boolean
  isUploaded?: boolean
  regulationType?: regulationType | null
}

export type regulationData = {
  name: string
  regulation_type?: regulationType | null
}

export type regulationUploadTarget = {
  id: string
  url: string
  fields: Record<string, string>
}




