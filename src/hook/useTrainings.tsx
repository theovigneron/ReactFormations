import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingStatus, getTrainings } from "../store/selectors/trainingsSelectors";
import { fetchTrainings, LOADING_STATUS } from "../store/reducers/TrainingReducers";

const useTrainings = () => {
    const dispatch = useDispatch()
    const trainings = useSelector((state) => getTrainings(state))
    const loadingStatus = useSelector((state) => getLoadingStatus(state))

    useEffect(()=>{ 
        if(loadingStatus == LOADING_STATUS.NOT_STARTED){
            dispatch({type:fetchTrainings().type })
        }
    },[])

    return {
        trainings
    }
}

export default useTrainings