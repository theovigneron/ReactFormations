import useTrainings from "../hook/useTrainings";
import TrainingCard from "../TrainingCard/TrainingCard"
import "./HomePage.css"
const HomePage = () => {
    const {trainings} = useTrainings()
    return <div className="TrainingsCards">    
        {
            trainings.map((training) => (
                <TrainingCard training={training}/>
            ))
        }
    </div>
}

export default HomePage;