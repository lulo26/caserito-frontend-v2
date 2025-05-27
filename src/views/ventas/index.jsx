// material-ui
import { Stack } from '@mui/material';

import VentasModal from './components/VentasModal';

// project imports
import VentasTable from './components/VentasTable';

export default function Ventas() {
  return (<>
  
   <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
      <h1>Ventas</h1> 
      <VentasModal/>
    </Stack>
    <VentasTable/>
    </>);
}
