import React, { useState, useEffect, createContext } from "react"
import { Button, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material"
import HomePage from "./Components/HomePage/HomePage";
import CreateTraining from "./Components/CreateTraining/CreateTraining";
import "./main.css"
import logo from "./assets/logo.png"
import Pricings from "./Components/Pricings/Pricings";
import jwt_decode from "jwt-decode"
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

export const DataContext = createContext(null);


const Main = () => {
    const [value, setValue] = useState(1);
    const componentsList: any = { 1: HomePage, 2: CreateTraining, 3:Pricings }
    const [user, setUser] = useState<any>(null)


    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        setValue(newValue);
    };

    const handleCallbackResponse = (response: any) => {
      const userObject = jwt_decode(response.credential)
      setUser(userObject)
    }
    
    useEffect(()=>{
      google.accounts.id.initialize({
        client_id:"790241858145-eoqa2f9jgu1bs68t4tfiaikvso28q2ot.apps.googleusercontent.com",
        callback: handleCallbackResponse
      })
      const div = document.getElementById("signinDiv")
      
      if(div){
        google.accounts.id.renderButton(div,{theme:'outline', size:"large",  type: 'standard'})
      }
    
    }, [user])

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
                  user == null
                  ?
                  <div id="signinDiv" />
                  :
                  <Button onClick={() => setUser(null)}> LogOut</Button>
                  
              }                    
            </div>
            <div className="Container">
              <DataContext.Provider value={user}>
                <Component />
              </DataContext.Provider>

            </div>
        </>
}

export default Main