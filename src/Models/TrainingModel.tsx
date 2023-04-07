export interface Training{
    Description: string,
    ID: number,
    Nom: string,
    Type: string
    module: Module[]
}


export interface Module{
    Description : string,
    ID: number
    Libellé: string
    exercices: Exercice[]
}

export interface Exercice{
    Description: String
    Duree: number 
    ID: number,
    Titre: string,
    Type: string
}