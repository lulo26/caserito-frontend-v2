import ProductCard from './components/productCard';
import ModalNuevo from './components/ModalNuevo';
import Stack from '@mui/material/Stack';
import * as React from 'react';


// ==============================|| SAMPLE PAGE ||============================== //

export default function Productos() {
  return (
  <>
  <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
    <h1>Productos</h1> 
    <ModalNuevo/>
  </Stack>
  <ProductCard/>
  </>
  );
}
