export default class Result {
    Result: any;
    ErrorMessage: string;
    TimeGenerated: Date;
    Success: boolean;
    HttpStatus: number;
    LimitationsReach: boolean = false;
    count?: number

    constructor(json: any) {
      if (json == null)
        throw new Error("Result: la reponse de l'appel API est vide.")
      this.HttpStatus = json.status;
      this.Success = json.status.toString().startsWith("20");
      if (json.data && json.data.limitationsReach)
        this.LimitationsReach = json.data.limitationsReach;
      this.count = json.data?.count
      this.Result = json.data && json.data.result;
      // si le Code HTTP n'est pas un succès, alors l'API retourne le message d'erreur est dans les datas
      this.ErrorMessage = json.data && json.data.errorMessage;
      this.TimeGenerated = json.data && json.data.timeGenerated;
    }
}
  
export class TypedResult<T> extends Result {
    Result!: T; 
} 
