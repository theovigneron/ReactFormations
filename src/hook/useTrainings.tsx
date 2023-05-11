import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingStatus, getTrainings } from "../store/selectors/trainingsSelectors";
import { createTrainings, fetchTrainings, LOADING_STATUS } from "../store/reducers/TrainingReducers";
import { Training } from "../Models/TrainingModel";

const useTrainings = () => {
    const dispatch = useDispatch()
    const trainings = useSelector((state) => getTrainings(state))
    const loadingStatus = useSelector((state) => getLoadingStatus(state))
    const createTraining = (data: Training) => dispatch({type:createTrainings().type, payload: data})
    useEffect(()=>{ 
        if(loadingStatus === LOADING_STATUS.NOT_STARTED){
            dispatch({type:fetchTrainings().type })
        }
    },[])

    return {
        trainings,
        loadingStatus,
        createTraining
    }
}

export default useTrainings