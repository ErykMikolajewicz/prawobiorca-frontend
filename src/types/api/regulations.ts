
export type regulationType = 'ACT' | 'DECREE' | 'STATUTE'

export type regulationRepresentation = {id: string,
    presentationName: string,
    isPrepared: boolean,
    regulationType?: regulationType}


