import AppPost from './api/AppPost';
import Stack from '@mui/material/Stack';

import AppGet from './api/AppGet';

export default function Productos() {
  return (
  <>
  <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
    <h1>Productos</h1> 
    <AppPost/>
  </Stack>
  <AppGet/>
  </>
  );
}
