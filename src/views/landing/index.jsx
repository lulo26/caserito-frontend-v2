import './assets/style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';


import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Grid2, Card, Box, CardActions, CardContent, CardMedia } from "@mui/material";
import Typography from '@mui/material/Typography';

import { ACCESS_TOKEN_NAME, baseURL } from '../../store/constant';
import { Parallax } from 'react-parallax';

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
const imgURL = 'http://168.231.112.194:8098/storage/'

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loginText, setLoginText] = useState('Ingresar');
    const [loginLink, setLoginLink] = useState('/pages/login');

    const navigate = useNavigate()

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
        getSession()
    }, []);

    const getSession = () => {
        localStorage.getItem(ACCESS_TOKEN_NAME) ? (
            setLoginLink('/admin'), 
            setLoginText('Dashboard') 
        )
        : (
            setLoginLink('/pages/login'),
            setLoginText('Ingresar')
        )
    }

    const toProduct = (id) => {
        navigate(`/producto/${id}`)
    }

    const isEmpty = (obj)=>{
        let test = obj === undefined
        console.log(test);
        return test;
    }
    if (loading) return (<> <CircularProgress color="primary" /></>);
    if (error) return <div>Error: {error}</div>;

  return (
<>
    <div class="container main-container">
        <nav>
            <Link to={loginLink}>{loginText}</Link>
        </nav>
        <div class="bottomText">
            <a href="#productos">Ver Más</a>
        </div>
    </div>
      
      <div class="blank" id='productos'>
        <span class="blankText">Nuestros productos</span>
      </div>
<br /><br />

<Box sx={{margin:"2rem"}}>
    <Carousel
    swipeable={true}
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
        data.status ? 
        data.data.map((post) => (
            <Grid2 key={post.id}>
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt={post.descripcion}
                    height="140"
                    image={`${imgURL}${post.imagen}`}
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
                    <Button onClick={(e) => toProduct(post.id)} variant='contained' size="small" color='primary' sx={{borderRadius: '8px', color:'#fff'}}>Mas</Button>
                </CardActions>
                </Card>
            </Grid2>
        )) : <div>No hay productos disponibles en estos momentos</div>
    }
    </Carousel>
</Box>


     <br /> 
    <div class="second">
    </div>
      
    <div class="blank" id='nosotros'>
        <span class="blankText">Sobre Nosotros</span>
    </div>
    <div class="about">
        <Box>
            <Typography variant="h2">
                Somos una repostería especializada en la elaboración de diferentes tipos de postres, ubicada en la zona céntrica de la ciudad de Cartago, con calidad y presentación artesanal. 
            </Typography>
        </Box>
    </div>
</>
);
}