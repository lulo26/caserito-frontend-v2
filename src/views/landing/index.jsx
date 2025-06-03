import './assets/style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Button from '@mui/material/Button';
import { Link } from 'react-router';


import React, { useEffect, useState } from "react";
import axios from "axios";

import { Grid2, Card, Box, CardActions, CardContent, CardMedia } from "@mui/material";
import Typography from '@mui/material/Typography';


export default function Landing() {

    const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const productoURL =  'http://168.231.112.194:8098/api/producto'
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
    const isEmpty = (obj)=>{
        let test = obj === undefined
        console.log(test);
        return test;
    }
    if (loading) return (<> cargando</>);
    if (error) return <div>Error: {error}</div>;

  return (
<>
    <div class="container main-container">
        <nav>
            <Link to="/pages/register">Ingresar</Link>
        </nav>
        <div class="bottomText">
            <a href="#productos">Ver Más</a>
        </div>
    </div>
      
      <div class="blank" id='productos'>
        <span class="blankText">Nuestros productos</span>
      </div>
<br /><br />
<Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>

{
    data.data.map((post) => (
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
                <Typography variant="body2" sx={{wordBreak:'break-word', color: 'text.secondary', display: "inline-block", whiteSpace: "pre-line" }}>
                    {post.descripcion}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
            </Card>
        </Grid2>
    ))
}
</Carousel>
     <br /> 
    <div class="second">
    </div>
      
    <div class="blank" id='nosotros'>
        <span class="blankText">Sobre Nosotros</span>
    </div>
    <div class="second">
        <Box>
            <Typography variant="h2">
                Somos una repostería especializada en la elaboración de diferentes tipos de postres, ubicada en la zona céntrica de la ciudad de Cartago, con calidad y presentación artesanal. 
            </Typography>
        </Box>
    </div>
</>
);
}