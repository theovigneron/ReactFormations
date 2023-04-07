import { FC } from "react"
import { Training } from "../../Models/TrainingModel"
import "./TrainingCard.css"
export interface TrainingProps{
    training: Training
    onOpen: () => void
}
const TrainingCard: FC<TrainingProps> = ({training, onOpen}) => {
    return <div className="trainingCard" onClick={onOpen}>
        <img className="picture" />
        <div className="infoCard">
            <div className="infoCard_header">
                <div className="infoCard_title">{training.Nom}</div>
                <div className="infoCard_type">{training.Type}</div>
            </div>
            <div className="infoCard_description">{training.Description}</div>
        </div>
    </div>
}

export default TrainingCard