import './assets/style.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';

import { Parallax } from 'react-parallax';

import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRef } from 'react';
import Lenis from '@studio-freight/lenis';

import { Grid2, Card, Box, CardActions, CardContent, CardMedia, Stack } from "@mui/material";
import Typography from '@mui/material/Typography';

import { ACCESS_TOKEN_NAME, baseURL, imageURL } from '../../store/constant';
import f1 from './assets/img/f1.png'
import f2 from './assets/img/f2.png'
import f3 from './assets/img/f3.png'
import bg4 from './assets/img/bg4.png'
import bg5 from './assets/img/bg5.png'
import bg6 from './assets/img/bg6.png'
import logo from './assets/img/logo.png'

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';

export default function Landing() {
    const lenisRef = useRef(null);
    
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


const productoURL = `${baseURL}/producto`
const imgURL = `${imageURL}/storage/`

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loginText, setLoginText] = useState('Ingresar');
    const [loginLink, setLoginLink] = useState('/pages/login');

    const navigate = useNavigate()

   

useEffect(() => {
  lenisRef.current = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenisRef.current?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenisRef.current?.destroy();
  };
}, []);

const handleScrollTo = (target) => {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target);
  }
};



    useEffect(() => {
            axios({
                method: 'get',
                url: productoURL,
                responseType: 'json',
            })
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
            setLoginLink('/admin/dashboard'), 
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
        return test;
    }
    if (loading) return (<> <CircularProgress color="primary" /></>);
    if (error) return <div>Error: {error}</div>;

    const handleDashboard=()=>{
        navigate(loginLink)
        setTimeout(() => window.location.reload(), 0)
    }

const navButtonStyle = {
  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' },
  padding: { xs: '0.25rem 0.75rem', sm: '0.5rem 1rem', md: '0.75rem 1.5rem' },
  textTransform: 'none',
  whiteSpace: 'nowrap',
};

  return (
<>
<div data-scroll-container>
<Parallax blur={0} bgImage={f1} bgImageAlt="the cat" strength={300}>
    <div class="navHeaderSection" id='main'>
        <span class="blankText">
<Stack
  direction="row"
  spacing={{ xs: 1, sm: 2, md: 3 }}
  useFlexGap
  flexWrap="wrap"
  justifyContent="center"
  sx={{ width: '100%', paddingY: 2 }}
>
  <Button color="secondary" sx={navButtonStyle} onClick={() => handleScrollTo('#productos')}>Productos</Button>
  <Button color="secondary" sx={navButtonStyle} onClick={() => handleScrollTo('#contacto')}>Contacto</Button>
  <Button color="secondary" sx={navButtonStyle} onClick={() => handleScrollTo('#nosotros')}>Nosotros</Button>
  <Button color="secondary" sx={navButtonStyle} onClick={() => handleDashboard()}>{loginText}</Button>
</Stack>

        </span>
    </div>
    <div class="container">
        <Parallax blur={0} bgImage={f2} bgImageAlt="the cat" strength={200}>
            <div class="container">
                <Parallax blur={0} bgImage={f3} bgImageAlt="the cat" strength={0}>
                    <div class="container bg-f3">
                    </div>
                </Parallax>
                <div class="logoSmall">
                    <Parallax 
                        blur={0} 
                        strength={0}
                    >
                        <div style={{ 
                            height: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}> 
                            <img class="logo-image" src={f3} alt="caserito :3" />
                            <div className="container">
                            </div>
                        </div>
                    </Parallax>
                </div>
            </div>
        </Parallax>
    </div>

</Parallax>
    <div class="headerTittle" id='productos'>
      <span class="blankText"><Typography color='secondary'   sx={{
    fontSize: {
      xs: '1.2rem', 
      sm: '1.5rem', 
      md: '2rem',   
      lg: '2.5rem', 
      xl: '3rem',  
    },
  }}>Nuestros productos</Typography></span>
    </div>
<Parallax blur={{min:0,max:5}} bgImage={bg5} bgImageAlt="the cat" strength={200}>
<div class="container">
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


    </div>
</Parallax>
<div class="headerTittle" id='contacto'>
    <span class="blankText"><Typography color='secondary'   sx={{
    fontSize: {
      xs: '1.2rem', 
      sm: '1.5rem', 
      md: '2rem',   
      lg: '2.5rem', 
      xl: '3rem',  
    },
  }}>¡Contactanos!</Typography></span>
</div>
<Parallax blur={{min:0,max:5}} bgImage={bg6} bgImageAlt="the cat" strength={300}>
    <div class="container contacto">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5}>
            <IconButton href="https://www.facebook.com/share/16WhPt96Yn/" ><FacebookIcon  sx={{fontSize:100}} /></IconButton>
            <IconButton href="https://www.instagram.com/caseritopostres_reposteriaart?igsh=ZmxyanI3cWtnYWc4" ><InstagramIcon sx={{fontSize:100}}  /></IconButton>
            <IconButton href="http://wa.me/573185438314" ><WhatsAppIcon  sx={{fontSize:100}} /></IconButton>
            <IconButton href="mailto:caseritopostres2025@gmail.com" ><EmailIcon  sx={{fontSize:100}} /></IconButton>
        </Stack>
        <br />
        <Box sx={{
            margin:'1rem',
            padding:'1rem',
            borderRadius:'30px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color:'#fff'
        }}>
            <Typography variant='h2'>Telefono de contacto:<br/> +57 3185438314</Typography>
            <Typography variant='h2'></Typography>
        </Box>
    </div>
</Parallax>
<div class="headerTittle" id='nosotros'>
    <span class="blankText"><Typography color='secondary'   sx={{
    fontSize: {
      xs: '1.2rem', 
      sm: '1.5rem', 
      md: '2rem',   
      lg: '2.5rem', 
      xl: '3rem',  
    },
  }}>Sobre Nosotros</Typography></span>
</div>
<Parallax blur={{min:0,max:5}} bgImage={bg4} bgImageAlt="the cat" strength={300}>
    <div class="container">
        <div class="about">
            <Box   sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',     
  }}>
                <Typography color='black' sx={{
                    fontSize: {
                    xs: '1rem', 
                    sm: '1.2rem', 
                    md: '1.5rem',   
                    lg: '2rem', 
                    xl: '2.5rem',  
                    textAlign: 'center'
                    },
                 }}>
                MISIÓN: La repostería Caserito Postres tiene como objetivo satisfacer las necesidades de las personas que quieran darse un gustico, además ofrecerles una dulce experiencia de sabores con nuestros increíbles postres caseritos a base de leche.
                </Typography>
                <br /><br />
                <Typography color='black' sx={{
                    fontSize: {
                    xs: '1rem', 
                    sm: '1.2rem', 
                    md: '1.5rem',   
                    lg: '2rem', 
                    xl: '2.5rem',  
                    textAlign: 'center'
                    },
                 }}>
                VISIÓN: Nuestro objetivo a largo plazo (2029) es innovar nuestro portafolio de productos ofreciendo postres personalizados y de temporada, llegar a ser una empresa sólida financieramente, ser reconocidos a nivel municipal, incrementar nuestras ventas y llegar a más clientes. 
                </Typography>
            </Box>
        </div>
    </div>
</Parallax>
</div>
</>
);
}