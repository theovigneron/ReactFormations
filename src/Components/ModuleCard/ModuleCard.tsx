import { FC, useState } from "react"
import {Module} from "../../Models/TrainingModel"
import './ModuleCard.css'
import { Box, Modal } from "@mui/material"
import TrainingModals from "../TrainingModals/TrainingModals"
import ExerciceModals from "../ExerciceModals/ExerciceModals"
interface Props {
    module: Module
}

export const ModuleCard: FC<Props>= ({module}) =>{
    const [statusModals, setStatusModals] = useState(false)

    const openModals = () => {
        setStatusModals(true)
    }

    const closeModals = () => {
        console.log("coucocuocuocu")
        setStatusModals(false)
    }

    return <>
        <div className="module_card" onClick={openModals}>
            <h1>{module.Libellé}</h1>
            <p>{module.Description}</p>
        </div>
        <Modal
            open={statusModals}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={{ width: 400 }} className="modalBox">
                <ExerciceModals key={module.ID} onClose={closeModals} exercice={module.exercices} />
            </Box>
        </Modal>
    </>
  
}

export default ModuleCard