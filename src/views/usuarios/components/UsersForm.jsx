import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material';

export default function UsersForm() {
  return (
    <>
          <div>
            <TextField
              id="name"
              label="Nombre"
              type="text"
              sx={{mb:3, mr:3, width:'100%'}}
              required
            />
          </div>
          <div>
            <TextField
              id="email"
              label="Correo"
              type="email"
              sx={{mb:3, mr:3, width:'100%'}}
              required
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Contraseña"
              type="password"
              sx={{mb:3, mr:3, width:'100%'}}
              required
            />
          </div>
          <Button key='buttonSubmit' variant='contained' type='submit' sx={{borderRadius: '8px'}}>Agregar</Button>
    </>
  );
}