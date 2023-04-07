import { Button } from "@mui/material"
import "./TrainingModals.css"
import { FC, useState } from "react"
import { Training } from "../../Models/TrainingModel"
import {ModuleCard} from "../ModuleCard/ModuleCard"
interface Props {
    onClose: () => void
    training: Training | null
}
const TrainingModals: FC<Props> = ({onClose, training}) => {

   

    return <div className="trainingModals">
        <header className="trainingModals_header">
            <h1> Modules </h1>
            <Button onClick={onClose} >Fermer</Button>
        </header>
        <div className="trainingModals_container">
            {
                training?.module?.map((mod) => (
                    <ModuleCard module={mod} ></ModuleCard>
                ))
            }
        </div>
    </div>
}

export default TrainingModals