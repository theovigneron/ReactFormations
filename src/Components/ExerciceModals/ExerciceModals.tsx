import { Button } from "@mui/material"
import "./ExerciceModals.css"
import { FC, useState } from "react"
import { Exercice } from "../../Models/TrainingModel"
import {ExerciceCard} from "../ExerciceCard/ExerciceCard"
import ReactPlayer from 'react-player/youtube'

interface Props {
    onClose: () => void
    exercices: Exercice[]
}

const ExerciceModals: FC<Props> = ({onClose, exercices}) => {

    const [urlYoutube, setUrlYoutube] = useState(exercices[0].Lien)

    return <div className="ExerciceModals">
        <header className="ExerciceModals_header">
            <h1> Exercice </h1>
            <Button onClick={() => onClose()} >Fermer</Button>
        </header>
        <div className="ExerciceModals_content">
            <div className="ExerciceModals_container">
                {
                    exercices?.map((exo) => (
                        <div onClick={() => setUrlYoutube(exo.Lien)}>
                            <ExerciceCard exercice={exo} key={exo.Titre} ></ExerciceCard>
                        </div>
                    ))
                }
            </div>
            <div className="ExerciceModals_video_container">
                <ReactPlayer url={urlYoutube} width={"100%"} height={"100%"} />
            </div>
        </div>
        
    </div>
}

export default ExerciceModals