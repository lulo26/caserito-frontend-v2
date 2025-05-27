// material-ui
import { Stack } from '@mui/material';

// project imports
import UsersTable from './components/UsersTable';
import UsersModal from './components/UsersModal';

export default function Usuarios() {
  return (<>
  
   <Stack direction='row' spacing={2} alignItems='center' sx={{mb: 4}}>
      <h1>Usuarios</h1> 
      <UsersModal/>
    </Stack>
    <UsersTable/>
    </>);
}
