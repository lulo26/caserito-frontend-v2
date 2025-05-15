import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductosCard from "../components/ProductosCard";
import Loading from "../components/Loading";
import Loader from "../../../ui-component/Loader";
<<<<<<< HEAD
import { Grid2, Box } from "@mui/material";
=======
import { Grid2 } from "@mui/material";
import {Box} from "@mui/material";
import { baseURL } from "../../../store/constant";
>>>>>>> 8ba5a7868cd848b7489673b0a20f7598ef33fc56

export default function AppGet() {
    const productoURL = baseURL + 'producto'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get(productoURL)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

<<<<<<< HEAD
    if (loading) return <Loading/>;
=======
    if (loading) return (<><Loader/> <Loading/></>);
>>>>>>> 8ba5a7868cd848b7489673b0a20f7598ef33fc56
    if (error) return <div>Error: {error}</div>;

    return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
                {data.data.map((post) => (
                    <Grid2 key={post.id}>
                        <ProductosCard key={post.id}
                            nombre={post.nombre}
                            descripcion={post.descripcion}
                            imagen={post.imagen}
                            stock={post.stock}
                            precio={post.precio}
                    />
                    </Grid2>
                ))}
        </Grid2>
    </Box>
    );
};