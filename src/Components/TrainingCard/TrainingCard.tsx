import { FC } from "react"
import { Training } from "../../Models/TrainingModel"
import "./TrainingCard.css"
import LockIcon from '@mui/icons-material/Lock';
export interface TrainingProps{
    training: Training
    onOpen: () => void
}
const TrainingCard: FC<TrainingProps> = ({training, onOpen}) => {

    
    return <div className="trainingCard" onClick={onOpen}>
        <img className="picture" src={training.Logo} />
        <div className="infoCard">
            <div className="infoCard_header">
                <div className="infoCard_title">{training.Nom}</div>
                <div className="infoCard_type">{training.Titre}</div>
            </div>
        </div>
    </div>
}

export default TrainingCard