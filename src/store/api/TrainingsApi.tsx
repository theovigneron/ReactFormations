import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Training } from "../../Models/TrainingModel";
import Result from "./Result";
export type HTTP_VERBS = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS"
const urlFlask = "http://localhost:8080"
export const TrainingsApiRequest = (baseUrl: string) => ({ method, id, body } : { method: HTTP_VERBS, id?: number, body?: any}) => {
    const endpoint = id != null ? `${baseUrl}/${id}` : baseUrl
    return request(method, endpoint, body)
}

const trainingsApi = TrainingsApiRequest(`/trainings`)

export const getTrainingsRequest = async () => {
    const response = await fetch("http://localhost:8080/trainings");
    return response.json()
}

export const postTrainingsRequest = async (data: Training) => {
    const response = await fetch("http://localhost:8080/trainings", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), 
      });
    return response.json();
}

export function request(method: HTTP_VERBS, url: string, body?: any) : Promise<Result> {
    const urlWithSlash: string = (url.startsWith('/')) ? url : '/' + url
    axios.interceptors.response.use(
        (res: any) => res,
        (err: { response: any; }) => {
            // par défaut: axios throw l'exception. On override pour retourner la reponse HTTP, même en erreur, dans le `then`
            return err.response;
        }
    );
    return axios(
    {
    method,
    url: `${urlFlask}${urlWithSlash}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
        'Expires': '-1'
    },
    responseType: 'json',
    data: JSON.stringify(body)
    })
    .then((response: any) => {
    const result = new Result(response);
    return result;
    });
}

