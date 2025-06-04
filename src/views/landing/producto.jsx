import './assets/style.css'

import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router';


import React, { useEffect, useState } from "react";
import { Grid2, Card, CardActions, CardContent, CardMedia, Stack, TextField } from "@mui/material";
import { useParams } from 'react-router';
import axios from "axios";
import { Typography, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { frontUrl, baseURL } from '../../store/constant';


export default function Producto() {

    const [productoTitle, setProductoTitle] = useState()
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const params = useParams()
    const productoURL =  `${baseURL}/producto/${params.id}`
    const imgURL = `${baseURL}/storage/`

        useEffect(() => {
        // Make GET request to fetch data
        axios.get(productoURL)
            .then((response) => {
                console.log(response)
                setData(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);



    const goHome = () => {
        window.location.replace(frontUrl)
    }

    const updateOne = (id, payload) => {
        return axios({
            method: 'put',
            url: `${baseURL}/${id}`,
            data: payload,
            responseType: 'json'
        })
    }

    const setSubmit = (e) => {
        e.preventDefault()

        const payload = {
          nombre: fields.nombre.value,
          comentario:fields.nombre.value, //cambiar
        }

        const response = updateOne(params.id, payload)
        response
        .then((res) => {
            console.log(res)
            res.data.status ? (
                console.log('fino')
            ) : (
                console.log('nada pa')
            )
        })
        .catch((err) =>{
            notifications.show('Error de conexión: ' + err.message, 
            {severity: 'error',autoHideDuration: 3000,})
        })
    }

    if (loading) return (<> <CircularProgress color="primary" /></>);
    if (error) return <div>Error: {error}</div>;

  return (
<>
    <Box sx={{margin:'2vh', justifyItems:'center'}}>
        <Stack spacing={2}>
            <Stack direction='row'>
                <Button onClick={(e) => goHome()} variant='contained' size="small" color='primary' sx={{borderRadius: '8px', color:'#fff'}}>Volver</Button>
            </Stack>
            <Card sx={{maxWidth: 900}} >
            <CardMedia
                component="img"
                height="300"
                image={`${imgURL}${data.imagen}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {data.nombre}
                </Typography>
                <Typography variant='h3'>
                    {data.descripcion}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Precio ${data.precio}
                </Typography>
            </CardContent>
            <CardActions>
                <form action="" onSubmit={setSubmit}>

                </form>
                <Stack spacing={2}>
                    <TextField
                        required
                        name='nombre'
                        label="Nombre"
                        type="text"
                    />
                    <TextField
                        required
                        name='comentario'
                        label="Comentario"
                        type="text"
                    />
                <Button variant='contained' size="small" color='primary' sx={{borderRadius: '8px', color:'#fff'}}>Dejar Reseña</Button>
                </Stack>
            </CardActions>
            </Card>
        </Stack>
    </Box>
</>
);
}