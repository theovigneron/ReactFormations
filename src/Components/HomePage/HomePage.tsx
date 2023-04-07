import { Box, Modal } from "@mui/material";
import { useState } from "react";
import useTrainings from "../../hook/useTrainings";
import TrainingCard from "../TrainingCard/TrainingCard"
import TrainingModals from "../TrainingModals/TrainingModals";
import "./HomePage.css"
const HomePage = () => {
    const {trainings} = useTrainings()
    const [statusModals, setStatusModals] = useState(false)
    const [selectedTraining, setSelectedTrainings] = useState(null)
    const openModals = (id: string) => {
        const training = trainings.find(t => t.ID === id)
        setSelectedTrainings(training)
        setStatusModals(true)
    }

    const closeModals = () => {
        setStatusModals(false)
    }

    return <div className="TrainingsCards">    
        {
            trainings.map((training) => (
                <TrainingCard training={training} onOpen={() => openModals(training.ID)}/>
            ))
        }
        <Modal
            open={statusModals}
            onClose={() => setStatusModals(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={{ width: 400 }} className="modalBox">
                <TrainingModals onClose={closeModals} training={selectedTraining} />
            </Box>
        </Modal>
    </div>
}

export default HomePage;