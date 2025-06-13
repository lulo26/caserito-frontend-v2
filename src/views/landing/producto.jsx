import './assets/style.css'

import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';


import React, { useEffect, useState } from "react";
import { Grid2, Card, CardActions, CardContent, CardMedia, Stack, TextField,Alert } from "@mui/material";
import { useParams } from 'react-router';
import axios from "axios";
import { Typography, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import { frontUrl, baseURL, imageURL } from '../../store/constant';


export default function Producto() {

    const [productoTitle, setProductoTitle] = useState()
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ratingValue, setRatingValue] = useState(2);
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();


    const params = useParams()
    const productoURL =  `${baseURL}/producto/${params.id}`
    const imgURL = `${imageURL}/storage/`

        useEffect(() => {
        axios.get(productoURL)
            .then((response) => {
                setData(response.data.data);
                setProductoTitle(response.data.data.nombre)
                console.log(response.data.data.nombre);
                
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

    const setReview = (payload) => {
        return axios({
            method: 'post',
            url: `${baseURL}/contact`,
            data: payload,
            responseType: 'json'
        })
    }

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target

        const payload = {
            nombre: fields.nombre.value,
            mensaje: `Producto: ${productoTitle}, puntuación: ${ratingValue}, comentario: ${fields.comentario.value}` 
        }

        const response = setReview(payload)
        response
        .then((res) => {
            console.log(res.data)
            setResponseMessage(<Alert severity="success">Reseña agregada</Alert>),
            navigate(-1)
        })
        .catch((err) =>{
            setResponseMessage(<Alert severity="error">Error al agregar la reseña</Alert>)
        })
    }

    if (loading) return (<> <CircularProgress color="primary" /></>);
    if (error) return <div>Error: {error}</div>;

  return (
<>
    <Box sx={{ minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2vh',}}>
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 900 }}>
            <Stack direction='row'>
                <Button onClick={(e) => goHome()} variant='contained' size="small" color='primary' sx={{borderRadius: '8px', color:'#fff'}}>Volver</Button>
            </Stack>
            <Card sx={{maxWidth: 900}} >
            <CardMedia
                component="img"
                height="300"
                maxWidth='300'
                image={`${imgURL}${data.imagen}`}
            />
            <CardContent sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }}>
                <Typography gutterBottom variant="h3" component="div">
                {data.nombre}
                </Typography>
                <Typography variant='h5'>
                    {data.descripcion}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Precio ${data.precio}
                </Typography>
            </CardContent>
            <CardActions>
                <form action="" onSubmit={setSubmit} style={{width:'100%'}}>
                <Box sx={{
                     width: '100%',
                    justifyContent:'center',
                    alignItems:'center',
                    alignContent:'center',
                    justifyItems:'center',
                    textAlign:'center'
                }}>                    
                    <Stack spacing={2}
      sx={{
        width: '100%',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
                        <Rating
                        name="review"
                        value={ratingValue}
                        onChange={(e, newValue) => {
                            setRatingValue(newValue);
                        }}
                        />
                        <TextField
                            required
                            name='nombre'
                            label="Nombre"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            required
                            name='comentario'
                            label="Comentario"
                            type="text"
                            fullWidth
                        />
                        <Button type="submit" variant='contained' size="small" color='primary' sx={{borderRadius: '8px', color:'#fff'}}>Dejar Reseña</Button>
                        {responseMessage && <p>{responseMessage}</p>}
                    </Stack>
                </Box>
                </form>
            </CardActions>
            </Card>
        </Stack>
    </Box>
</>
);
}