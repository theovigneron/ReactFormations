import { FC, useState } from "react"
import {Module} from "../../Models/TrainingModel"
import './ModuleCard.css'
import { Box, Modal } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import ExerciceModals from "../ExerciceModals/ExerciceModals"
interface Props {
    module: Module
    locked: boolean
}

export const ModuleCard: FC<Props>= ({module, locked}) =>{
    const [statusModals, setStatusModals] = useState(false)

    const openModals = () => {
        setStatusModals(true)
    }

    const closeModals = () => {
        setStatusModals(false)
    }

    return <>
        <div className={locked? "module_card_locked" :"module_card" } onClick={locked? ()=>{}: openModals}>
            <img src={module.Image} alt="" />
            <div>
                <h1>{module.Libellé}</h1>
                <p>{module.Description}</p>
            </div>
            {
                locked
                &&
                <LockIcon style={{position: "absolute",top: "45%", left: "45%", scale: "4", color: "#1c1c1c;"}}/>
            }
        </div>
        
        <Modal
            open={statusModals}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={{ width: 400 }} className="modalBox">
                <ExerciceModals key={module.Code} onClose={closeModals} exercices={module.exercices} />
            </Box>
        </Modal>
    </>
  
}

export default ModuleCard