import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { FormControl, Box, TextField } from '@mui/material';
import { baseURL } from "../../../store/constant";

import Alert from '@mui/material/Alert';

export default function AppPost() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const newProduct = {
            nombre: nombre,
            descripcion: descripcion,
            stock: stock,
            precio: precio,
            imagen: imagen,
        };

        // Make POST request to send data
        axios
            .post(baseURL, newProduct)
            .then((response) => {
                setResponseMessage(<Alert severity="success">This is a success Alert.</Alert>);
            })
            .catch((err) => {
                setResponseMessage(<Alert severity="error">This is an error Alert.</Alert>);
            });
    };

    return (   
        <>
        
            <Box
            component='form'
            noValidate
            autoComplete='off'
            >
                <FormControl onSubmit={handleSubmit}>
                <div>
                    <TextField
                        required
                        name={nombre}
                        label="Nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        sx={{mb:3, mr:3, width:'100%'}}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name="descripcion"
                        label="Descripción"
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
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
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <TextField
                            required
                            id="precio"
                            label="Precio"
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
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
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
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
                </FormControl>
            </Box>
        {responseMessage && <p>{responseMessage}</p>}
        </>
    );
};