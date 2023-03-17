import React from "react"
import { makeStyles, Button, Box, TextField } from "@mui/material"
import { useForm } from 'react-hook-form';
import "./CreateTraining.css"
export type FieldType = "text" | "select"

const useStyles = () => makeStyles({ 
    validateButton: { 
        backgroundColor: '#3D5AFE',
        color: '#FFF',
        width: "25%",
        borderRadius: "20px",
        border: "2px solid",
        "border-color": "3D5AFE",
        '&:hover': { 
            backgroundColor: '#FFF',
            color: '#3D5AFE',
        }
    },
    cancelButton: { 
        backgroundColor: '#FFF',
        color: '#3D5AFE',
        width: "25%",
        borderRadius: "20px",
        border: "2px solid",
        "border-color": "3D5AFE",
        '&:hover': { 
            backgroundColor: '#3D5AFE',
            color: '#FFF',
      },
    },
})



const CreateTraining = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submited = (dataForm: any) => {
        console.log(dataForm)
    }

    return (
        <div className="Forms">
            <form>
                <h3> Formulaire de création </h3>
                <TextField 
                    {...register("Nom", {required: `Champ vide veuillez le remplir `})}
                    style={{ width: "100%" }} 
                    name={"Nom"} 
                    label={"Nom"}
                    variant="outlined" 
                />
                <TextField 
                    {...register("Description", {required: `Champ vide veuillez le remplir `})}
                    style={{ width: "100%" }} 
                    name={"Description"} 
                    label={"Description"}
                    variant="outlined" 
                />
                <TextField 
                    {...register("Type", {required: `Champ vide veuillez le remplir `})}
                    style={{ width: "100%" }} 
                    name={"Type"} 
                    label={"Type"}
                    variant="outlined" 
                />
                <Box  style={ { justifyContent: "center", borderTop: "solid", borderTopColor: "gray", margin: "10px", display:"flex", paddingTop:'1em' } }>
                    <Button onClick={ handleSubmit(submited) }>Valider</Button>  
                </Box>
            </form>      
        </div>
    )
}
export default CreateTraining