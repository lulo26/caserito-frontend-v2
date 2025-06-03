import { useState } from 'react';
import Box from '@mui/material/Box';
import {TextField, Button} from '@mui/material';

export default function EditForm({ formData, handleChange, handleFileChange }) {
  return (
        <>
         <div>
                    <TextField
        required
        name="nombre"
        label="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        type="text"
        fullWidth
        sx={{ mb: 3 }}
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
        fullWidth
        multiline
        maxRows={3}
        sx={{ mb: 3 }}
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
                        label="Imagen"
                        name='imagen'
                        type="file"
                        autoComplete="current-password"
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
        </>
  );
}