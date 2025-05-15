import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductosCard from "../components/ProductosCard";
import Loading from "../components/Loading";
import Loader from "../../../ui-component/Loader";
import { Grid2, Box } from "@mui/material";

export default function AppGet() {
    const apiLink = 'http://127.0.0.1:8000/api/producto'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get(apiLink)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loading/>;
    if (error) return <div>Error: {error}</div>;

    return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
                {data.data.map((post) => (
                    <Grid2>
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