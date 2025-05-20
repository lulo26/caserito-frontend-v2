import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material';

export default function EditForm({nombre, descripcion, stock, precio, imagen}) {
  return (
        <>
         <div>
                    <TextField
                        required
                        name='nombre'
                        label='Nombre'
                        defaultValue={nombre}
                        type="text"
                        sx={{mb:3, mr:3, width:'100%'}}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name="descripcion"
                        label="Descripción"
                        defaultValue={descripcion}
                        type="text"
                        sx={{mb:3, mr:3, width:'100%'}}
                        multiline
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
                            required
                            id="stock"
                            label="Cantidad"
                            defaultValue={stock}
                            type="number"
                        />
                        <TextField
                            required
                            id="precio"
                            label="Precio"
                            defaultValue={precio}
                            type="number"
                        />
                    </Box>
                </div>
                <div>
                    <TextField
                        id="imagen"
                        label="Imagen"
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
                <Button key='buttonSubmit' variant='contained' type='submit' sx={{borderRadius: '8px'}}>Guardar</Button>
        </>
  );
}