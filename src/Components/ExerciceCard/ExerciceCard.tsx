import { FC } from "react"
import {Exercice} from "../../Models/TrainingModel"
import "./ExerciceCard.css"

interface Props {
    exercice: Exercice
}

export const ExerciceCard: FC<Props>= ({exercice}) =>{
    return <div className="exercice_card">
        <h1>{exercice.Titre}</h1>
        <p>{exercice.Description}</p>
    </div>
}

export default ExerciceCard