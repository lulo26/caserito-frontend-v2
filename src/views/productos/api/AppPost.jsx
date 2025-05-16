import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { FormControl, Box, TextField } from '@mui/material';
import { baseURL } from "../../../store/constant";
import { Form } from "react-router";

import Alert from '@mui/material/Alert';

export default function AppPost() {
    const productoURL = baseURL + 'producto'
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let field = event.target

        const newProduct = {
            nombre: field.nombre.value,
            descripcion: field.descripcion.value,
            stock: field.stock.value,
            precio: field.precio.value,
            imagen: field.imagen.value,
        };

        // Make POST request to send data
        axios
            .post(productoURL, newProduct)
            .then((response) => {
                setResponseMessage(<Alert severity="success">Yay.</Alert>);
            })
            .catch((err) => {
                setResponseMessage(<Alert severity="error">Algo pasó.</Alert>);
            });
    };

    return (   
        <>
            <Form noValidate autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <TextField
                        required
                        name='nombre'
                        label="Nombre"
                        type="text"
                        sx={{mb:3, mr:3, width:'100%'}}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name="descripcion"
                        label="Descripción"
                        type="text"
                        sx={{mb:3, mr:3, width:'100%'}}
                        multiline
                        maxRows={3}
                    />
                </div>
                <div style={{width: '100%'}}>
                    <Box 
                        sx={{ 
                            display: 'grid', 
                            gap: 1, 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            mb:3
                        }}>
                        <TextField
                            required
                            id="stock"
                            label="Cantidad"
                            type="number"
                        />
                        <TextField
                            required
                            id="precio"
                            label="Precio"
                            type="number"
                        />
                    </Box>
                </div>
                <div>
                    <TextField
                        required
                        id="imagen"
                        label="Imagen"
                        type="file"
                        autoComplete="current-password"
                        sx={{mb:3, mr:3, width:'100%'}}
                        slotProps={{
                            input:{
                                inputProps:{
                                    accept:".png, .jpeg, .webp"
                                }
                            },
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </div>
                <Button key='buttonSubmit' variant='contained' type='submit' sx={{borderRadius: '8px'}}>Agregar</Button>
                </Form>
        {responseMessage && <p>{responseMessage}</p>}
        </>
    );
};