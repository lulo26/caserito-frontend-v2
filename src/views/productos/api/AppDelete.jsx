import axios from "axios";

import { useState } from "react";
import { Button } from "@mui/material";
import { baseURL } from "../../../store/constant";
import { useNavigate } from "react-router";

export default function AppDelete(IDproducto){
    const navigate = useNavigate();
    const IDstring = IDproducto.IDproducto
    const [responseMessage, setResponseMessage] = useState("");
    const DeleteProducto = ()=>{
        axios.delete(`${baseURL}/producto/${IDstring}`)
            .then(
                (response) => navigate(0))
            .catch((error) => console.log(error.message))
            
    }
    return(<>
        <Button onClick={DeleteProducto} variant='contained' size="small" color='error' sx={{borderRadius: '8px'}}>Eliminar</Button>
    </>
    )
}