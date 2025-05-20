import {TextField, Button, Box} from '@mui/material';

export default function VentasForm() {
  return (
    <>
          <div style={{width: '100%'}}>
            <Box 
              sx={{ 
                display: 'grid', 
                gap: 1, 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                mb:3
              }}>
            <TextField
              id="total"
              label="Total"
              type="number"
              required
            />
            <TextField
              id="recibido"
              label="Recibido"
              type="number"
              required
            />
            </Box>
          </div>
          <Button key='buttonSubmit' variant='contained' type='submit' sx={{borderRadius: '8px'}}>Agregar</Button>
    </>
  );
}