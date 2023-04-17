import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingStatus, getPricings } from "../store/selectors/pricingsSelectors";
import { fetchPricings, LOADING_STATUS } from "../store/reducers/PricingReducers";
import { Pricing } from "../Models/PricingModel";

const usePricings = () => {
    const dispatch = useDispatch()
    const pricings = useSelector((state) => getPricings(state))
    const loadingStatus = useSelector((state) => getLoadingStatus(state))
    useEffect(()=>{ 
        if(loadingStatus === LOADING_STATUS.NOT_STARTED){
            dispatch({type:fetchPricings().type })
        }
    },[])

    return {
        pricings,
        loadingStatus
    }
}

export default usePricings