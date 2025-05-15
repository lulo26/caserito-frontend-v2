import Box from '@mui/material/Box';
import {TextField} from '@mui/material';

export default function ProductosForm(nombre, descripcion, stock, precio, imagen) {
  return (
    <>
        <Box
        component='form'
        noValidate
        autoComplete='off'
        >
          <div>
            <TextField
              id="nombre"
              label="Nombre"
              type="text"
              value={nombre}
              sx={{mb:3, mr:3, width:'100%'}}
            />
          </div>
          <div>
            <TextField
              id="descripcion"
              label="Descripción"
              type="text"
              sx={{mb:3, mr:3, width:'100%'}}
              multiline
              value={descripcion}
              maxRows={3}
            />
          </div>
          
          <div style={{width: '100%'}}>
            <Box 
              sx={{ 
                display: 'grid', 
                gap: 1, 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                mb:3
              }}>
            <TextField
              id="stock"
              label="Cantidad"
              type="number"
              value={stock}
            />
            <TextField
              id="precio"
              label="Precio"
              type="number"
              value={precio}
            />
            </Box>
          </div>
          
         <div>
          <TextField
              id="imagen"
              label="Imagen"
              type="file"
              autoComplete="current-password"
              value={imagen}
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