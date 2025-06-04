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
import { frontUrl, baseURL } from '../../store/constant';


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
    const imgURL = `https://168.231.112.194:8098/storage/`

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

    const setReview = (id, payload) => {
        return axios({
            method: 'post',
            url: `${baseURL}/review`,
            data: payload,
            responseType: 'json'
        })
    }

    const setSubmit = (e) => {
        e.preventDefault()
        let fields = e.target

        const payload = {
            producto_id: params.id,
            nombre: fields.nombre.value,
            comentario:fields.comentario.value,
            puntuacion: ratingValue
        }

        const response = setReview(params.id, payload)
        response
        .then((res) => {
            console.log(res.data)
            res.data.status ? (
                setResponseMessage(<Alert severity="success">Reseña agregada</Alert>),
                navigate(-1)
            ) : (
                setResponseMessage(<Alert severity="error">No se pudo agregar la reseña</Alert>)
            )
        })
        .catch((err) =>{
            setResponseMessage(<Alert severity="error">Error al agregar la reseña</Alert>)
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
                <Box sx={{
                    justifyContent:'center',
                    alignItems:'center',
                    alignContent:'center',
                    justifyItems:'center',
                    textAlign:'center'
                }}>                    
                    <Stack spacing={2} sx={{alignSelf:'center'}}>
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
                        />
                        <TextField
                            required
                            name='comentario'
                            label="Comentario"
                            type="text"
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