// material-ui
import { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import UsuariosModal from './components/UsuariosModal';
import { Stack } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import UsuariosTable from './components/UsuariosTable';

export default function Usuarios() {
  const [response, setResponse] = useState([])
    const [page, setPage] = useState()
    // Consumir api
    const leerApi = async()=>{
        let {data} = await axios.get('https://reqres.in/api/users?page=2')
        setResponse(data.data)
        setPage(data.page)
        console.log(data);
        
    }
  return (<>
   <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
      <h1>Usuarios</h1> 
      <UsuariosModal/>
    </Stack>
    <UsuariosTable/>
    </>);
}
