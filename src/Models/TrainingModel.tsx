export interface Training{
    Titre: string,
    Nom: string,
    Logo: string
    SheetId: string
    modules: Module[]
    contact: Contact
}

export interface Contact{
    Description:string
    Message:string
    Nom:string
    Photo:string
    Site:string
    Mail: string
}

export interface Module{
    Description : string,
    Code: number
    Libellé: string
    Image: string
    Type: string
    exercices: Exercice[]
}

export interface Exercice{
    Description: String
    Duree: number 
    Code: number,
    Titre: string,
    Type: string
    Lien: string
}