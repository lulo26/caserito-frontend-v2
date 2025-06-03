import { useState } from 'react';
import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material';

export default function ProductosForm() {
      const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    stock: '',
    precio: '',
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imagen: e.target.files[0] }));
  };
  return (
        <>
         <div>
                    <TextField
                        required
                        name='nombre'
                        label="Nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleChange}
                        sx={{mb:3, mr:3, width:'100%'}}
                    />
                </div>
                <div>
                    <TextField
                        required
                        name="descripcion"
                        label="Descripción"
                        value={formData.descripcion}
                        onChange={handleChange}
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
                            name='stock'
                            id="stock"
                            label="Cantidad"
                            value={formData.stock}
                            onChange={handleChange}
                            type="number"
                        />
                        <TextField
                            required
                            name='precio'
                            id="precio"
                            label="Precio"
                            value={formData.precio}
                            onChange={handleChange}
                            type="number"
                        />
                    </Box>
                </div>
                <div>
                    <TextField
                        id="imagen"
                        name='imagen'
                        label="Imagen"
                        type="file"
                        onChange={handleFileChange}
                        sx={{mb:3, mr:3, width:'100%'}}
                        slotProps={{
                            input:{
                                inputProps:{
                                    accept:".png, .jpeg, .webp, .jpg"
                                }
                            },
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </div>
                <Button key='buttonSubmit' variant='contained' type='submit' sx={{borderRadius: '8px'}}>Agregar</Button>
        </>
  );
}