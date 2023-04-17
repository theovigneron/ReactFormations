import React, { useState } from "react"
import { Button, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material"
import HomePage from "./Components/HomePage/HomePage";
import CreateTraining from "./Components/CreateTraining/CreateTraining";
import "./main.css"
import logo from "./assets/logo.png"
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GoogleLogin } from '@react-oauth/google';
import Pricings from "./Components/Pricings/Pricings";

const theme = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#37463D',
            fontWeight: 'bold',
            "&.Mui-selected": {
              color: "#F8FBF1",
              borderBottom: "none"
            }         
          },
        },
      },
    },
  });

const Main = () => {
    const [value, setValue] = useState(1);
    const componentsList: any = { 1: HomePage, 2: CreateTraining, 3:Pricings }
    const [cred, setCred] = useState<null | string | undefined>(null)
    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    const clientId = '790241858145-eoqa2f9jgu1bs68t4tfiaikvso28q2ot.apps.googleusercontent.com';

    const Component = componentsList[value]

    return <>
            <div className="NavBar">
                    <img src={logo} alt="" className="NavBar-logo"/>
                    <ThemeProvider theme={theme}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            className="tabsMui"
                            TabIndicatorProps={{ sx: { margin: "0 auto", bgcolor:"#F8FBF1" } }}
                        >
                            <Tab value={1} label="HomePage" />
                            <Tab value={2} label="Creation" />
                            <Tab value={3} label="Nos prix" />
                        </Tabs>
                    </ThemeProvider>

                    {
                        cred == null
                        ?
                        <GoogleOAuthProvider clientId={clientId}>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    setCred(credentialResponse.clientId)
                                }}
                                onError={() => {
                                    console.log('Login Failed')
                                }}
                            />
                        </GoogleOAuthProvider>
                        :
                        <Button onClick={() => setCred(null)}> LogOut</Button>
                    }
                    

                    
            </div>
            <div className="Container">
                <Component />
            </div>
        </>
}

export default Main