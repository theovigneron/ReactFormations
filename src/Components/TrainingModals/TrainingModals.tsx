import { Button } from "@mui/material"
import "./TrainingModals.css"
import { FC, useContext} from "react"
import { Training } from "../../Models/TrainingModel"
import {ModuleCard} from "../ModuleCard/ModuleCard"
import { DataContext } from "../../Main"
interface Props {
    onClose: () => void
    training: Training
}
const TrainingModals: FC<Props> = ({onClose, training}) => {

    const data = useContext(DataContext);


    return <div className="trainingModals">
        <header className="trainingModals_header">
            <img src={training?.Logo} alt="" />
            <h1> {training?.Titre} </h1>
            <Button onClick={onClose} >Fermer</Button>
        </header>
        <div className="trainingModals_container">
            <div className="trainingModals_content">
                <div className="trainingModals_modules">
                    {
                        training?.modules?.map((mod) => (
                            <ModuleCard module={mod} locked={data==null} ></ModuleCard>
                        ))
                    }
                </div>
                
                {
                    data == null
                    &&
                    <div className="infoConnection">
                        <h2> Connectez vous pour vous inscrire aux cours </h2>
                    </div>
                }
            </div>
            <div className="trainingModals_contact">
                <div className="contact_header">
                    <img src={training.contact.Photo} alt="" />
                    <h1>{training.contact.Nom}</h1>
                </div>
                <div className="contact_content">
                    <h3>Description du coach:</h3>
                    <p>{training.contact.Description}</p>
                    <h3>Message promotionnel:</h3>
                    <p>{training.contact.Message}</p>
                    <h3>Site: {training.contact.Site}</h3>
                    <h3>Mail: {training.contact.Mail}</h3>
                </div>
            </div>
            
        </div>
    </div>
}

export default TrainingModals