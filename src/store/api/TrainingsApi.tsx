import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Training } from "../../Models/TrainingModel";
import Result from "./Result";
export type HTTP_VERBS = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS"
const urlFlask = "http://localhost:8080"



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
