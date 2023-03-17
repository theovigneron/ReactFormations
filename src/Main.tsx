import React, { useState } from "react"
import { Button, Tab, Tabs } from "@mui/material"
import HomePage from "./Components/HomePage/HomePage";
import CreateTraining from "./Components/CreateTraining/CreateTraining";
import "./main.css"
import logo from "./assets/logo.png"
const Main = () => {
    const [value, setValue] = useState(1);
    // Liste des composants
    const componentsList: any = { 1: HomePage, 2: CreateTraining }

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    const Component = componentsList[value]

    return <>
            <div className="NavBar">
                    <img src={logo} alt="" className="NavBar-logo"/>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        TabIndicatorProps={{ style: { margin: "0 auto" } }}
                        indicatorColor="primary"
                    >
                        <Tab value={1} label="HomePage" />
                        <Tab value={2} label="Creation" />
                    </Tabs>
                    <Button variant="contained"> Se Connecter</Button>
            </div>
            <div className="Container">
                <Component />
            </div>
        </>
}

export default Main