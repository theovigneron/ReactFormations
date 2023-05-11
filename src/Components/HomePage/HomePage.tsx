import { Box, Modal } from "@mui/material";
import { useContext, useState } from "react";
import useTrainings from "../../hook/useTrainings";
import TrainingCard from "../TrainingCard/TrainingCard"
import TrainingModals from "../TrainingModals/TrainingModals";
import "./HomePage.css"
import { Training } from "../../Models/TrainingModel";
import { DataContext } from "../../Main";

const HomePage = () => {
    const {trainings, loadingStatus} = useTrainings()
    const [statusModals, setStatusModals] = useState(false)
    const [selectedTraining, setSelectedTrainings] = useState<Training>()

    const openModals = (training: Training) => {
        setSelectedTrainings(training)
        setStatusModals(true)
    }
    

    const closeModals = () => {
        setStatusModals(false)
    }

    return <div className="TrainingsCards">    
        {
            trainings.map((training) => (
                <TrainingCard training={training} onOpen={() => openModals(training)}/>
            ))
        }
        {
            selectedTraining
            &&
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
        }
       
    </div>
}

export default HomePage;