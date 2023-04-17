import { FC } from "react";
import { Pricing } from "../../Models/PricingModel";
import "./PricingCard.css"
import logo from "../../assets/card1.jpg"
import { Button } from "@mui/material";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";


interface Props{
    pricing: Pricing
}

const PricingCard: FC<Props> = ({pricing}) => {

    return <div className="pricingCard"> 
        
        <div className="pricingCard_header">
            <h3>{pricing.titre}</h3>
            <h1>{pricing.prix}€/mois</h1>
        </div>
        <Button style={{
            'backgroundColor': '#42564a',
            'color': 'white'
        }}>Essayez l'offre</Button>
        <div>
            <h3 className="pricingCard_subtitle">Ce que vous allez obtenir</h3>
            {
                pricing.description.split(";").map((desc) => (
                    <div className="offerElement">
                        <CheckCircleOutlineOutlined/>
                        <p>{desc}</p>
                    </div>
                    
                    ))
            } 
        </div>
        
         
        
        
    </div>
}

export default PricingCard;