// material-ui
import { useState } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';

import VentasModal from './components/VentasModal';

// project imports
import VentasTable from './components/VentasTable';

export default function Ventas() {
  const [response, setResponse] = useState([])
    const [page, setPage] = useState()
    // Consumir api
    const leerApi = async()=>{
        let {data} = await axios.get('http://127.0.0.1:8000/api/venta')
        setResponse(data.data)
        setPage(data.page)
        console.log(data);
        
    }
  return (<>
  
   <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
      <h1>Ventas</h1> 
      <VentasModal/>
    </Stack>
    <VentasTable/>
    </>);
}
