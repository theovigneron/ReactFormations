
import { Button, CircularProgress } from "@mui/material";
import usePricings from "../../hook/usePricings";
import { LOADING_STATUS } from "../../store/reducers/TrainingReducers";
import PricingCard from "../PricingCard/PricingCard";
import "./Pricings.css"
const Pricings = () => {
    const { pricings, loadingStatus } = usePricings()
    console.log(loadingStatus)
    console.log(pricings)
    return <div className="testingPage">  
        {
        loadingStatus == LOADING_STATUS.LOADED
        ?
        <>
            <div className="testingPage_header">
                <h1>Des prix qui évoluent avec vous</h1>    
                <h3>Commencez à apprendre gratuitement. Profitez egalement d'une mise à niveau pour profiter d'un plus grand nombre de cours</h3>
            </div>  
            <div className="pricingscards">
                {
                    pricings.map((pricings,index) => (
                        <PricingCard key={index} pricing={pricings} />
                    ))
                }
            </div>  
            <div className="testingPage_bottom">
            </div>
        </>
        :
        <CircularProgress
                style={{
                    'width': '70px',
                    'height': '70px',
                    'alignSelf': 'center',
                    'color': '#3c5044'
                }}
        />
    }  
    </div>
}

export default Pricings;