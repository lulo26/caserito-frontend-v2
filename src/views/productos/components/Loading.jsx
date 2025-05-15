import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
      <h3>Cargando</h3> 
      <CircularProgress />
      </Stack>
    </Box>
  );
}