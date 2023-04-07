import { Button } from "@mui/material"
import "./ExerciceModals.css"
import { FC } from "react"
import { Exercice } from "../../Models/TrainingModel"
import {ExerciceCard} from "../ExerciceCard/ExerciceCard"

interface Props {
    onClose: () => void
    exercice: Exercice[] | null
}

const ExerciceModals: FC<Props> = ({onClose, exercice}) => {
    return <div className="ExerciceModals">
        <header className="ExerciceModals_header">
            <h1> Exercice </h1>
            <Button onClick={() => onClose()} >Fermer</Button>
        </header>
        <div className="ExerciceModals_container">
            {
                exercice?.map((exo) => (
                    <ExerciceCard exercice={exo} key={exo.ID}></ExerciceCard>
                ))
            }
        </div>
    </div>
}

export default ExerciceModals