import Box from '@mui/material/Box';
import {TextField} from '@mui/material';

export default function UsuariosForm() {
  return (
    <>
        <Box
        component='form'
        noValidate
        autoComplete='off'
        >
          <div style={{width: '100%'}}>
            <Box 
              sx={{ 
                display: 'grid', 
                gap: 1, 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                mb:3
              }}>
            <TextField
              id="nombre"
              label="Nombre"
              type="text"
            />
            <TextField
              id="documento"
              label="Documento"
              type="number"
            />
            </Box>
          </div>
          <div>
            <TextField
              id="correo"
              label="Correo"
              type="email"
              sx={{mb:3, mr:3, width:'100%'}}
            />
          </div>
          <div>
            <TextField
              id="pass"
              label="Contraseña"
              type="password"
              sx={{mb:3, mr:3, width:'100%'}}
            />
          </div>
         <div>
          <TextField
              id="imagen"
              label="Imagen de perfil"
              type="file"
              autoComplete="current-password"
              sx={{mb:3, mr:3, width:'100%'}}
              slotProps={{
                input:{
                  inputProps:{
                    accept:".png, .jpeg, .webp"
                  }
                },
                inputLabel: {
                shrink: true,
                },
              }}
            />
         </div>
        </Box>
    </>
  );
}