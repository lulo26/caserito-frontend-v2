import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material';

export default function EditForm({nombre, descripcion, stock, precio, imagen}) {
    console.log(nombre)
  return (
        <>
         <div>
                    <TextField
                        required
                        name='nombre'
                        label="Nombre"
                        type="text"
                        sx={{mb:3, mr:3, width:'100%'}}
                        defaultValue={nombre}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name="descripcion"
                        label="Descripción"
                        type="text"
                        sx={{mb:3, mr:3, width:'100%'}}
                        multiline
                        maxRows={3}
                        defaultValue={descripcion}
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
                            type="number"
                            defaultValue={stock}
                        />
                        <TextField
                            required
                            id="precio"
                            label="Precio"
                            type="number"
                            defaultValue={precio}
                        />
                    </Box>
                </div>
                <div>
                    <TextField
                        id="imagen"
                        label="Imagen"
                        type="file"
                        autoComplete="current-password"
                        defaultValue={imagen}
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