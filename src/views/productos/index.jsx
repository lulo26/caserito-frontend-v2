import ProductosCard from './components/ProductosCard';
import ProductosModal from './components/ProductosModal';
import Stack from '@mui/material/Stack';
import {Grid2} from '@mui/material';
import { Box } from '@mui/material';

import AppGet from './api/AppGet';

export default function Productos() {
  return (
  <>
  <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
    <h1>Productos</h1> 
    <ProductosModal/>
  </Stack>
  <AppGet/>
  </>
  );
}
