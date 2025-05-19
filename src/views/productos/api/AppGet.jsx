import React, { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../components/Loading";
import { Grid2, Card, Box, CardActions, CardContent, CardMedia } from "@mui/material";
import Typography from '@mui/material/Typography';

import Loader from "../../../ui-component/Loader";
import { baseURL } from "../../../store/constant";

import AppPut from "./AppPut";
import AppDelete from "./AppDelete";

export default function AppGet() {
    const productoURL = baseURL + 'producto'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axios.get(productoURL)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return (<><Loader/> <Loading/></>);
    if (error) return <div>Error: {error}</div>;

    return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid2 container spacing={2}>
    {data.data.map((post) => (
        <Grid2 key={post.id}>
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={post.descripcion}
                height="140"
                image={post.imagen}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.nombre}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Descripción: {post.descripcion}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt:3}}>
                    Cantidad: {post.stock}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Precio: ${post.precio}
                </Typography>
            </CardContent>
            <CardActions>
                <AppPut IDproducto={post.id}/>
                <AppDelete IDproducto={post.id}/>
            </CardActions>
            </Card>
        </Grid2>
    ))}
    </Grid2>
    </Box>
    );
};