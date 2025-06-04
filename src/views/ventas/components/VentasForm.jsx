import * as React from 'react'
import {TextField, Button, Select, MenuItem, IconButton, Stack, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseURL } from '../../../store/constant.js';
import axios from 'axios';

export default function VentasForm({ inputFields, setInputFields, total, setTotal, recibido, setRecibido, cambio, setCambio, productoList }) {

  const handleFormChange = (index, e)=>{
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
    getTotal(data);
  };

  const addFields = ()=>{
    setInputFields([...inputFields, { producto_id: '', cantidad: '', totalProducto: '' }]);
  };

  const removeFields = (index)=>{
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const getTotal = (fields) => {
    let totalSum = 0;
    const updatedFields = fields.map((field, i) => {
      const selectedProduct = productoList.find(p => p.id === parseInt(field.producto_id));
      const cantidad = parseInt(field.cantidad);
      if (selectedProduct && !isNaN(cantidad)) {
        const totalProducto = selectedProduct.precio * cantidad;
        totalSum += totalProducto;
        return { ...field, totalProducto };
      }
      return { ...field, totalProducto: '' };
    });
    setInputFields(updatedFields);
    setTotal(totalSum);
  };

  React.useEffect(()=>{
    const cambioCalc = recibido - total;
    setCambio(cambioCalc > 0 ? cambioCalc : 0);
  }, [recibido, total]);

  return (
    <>
      {inputFields.map((input, index) => (
        <Stack key={index} direction="row" spacing={1} mb={1} mt={2}>
          <Select
            name="producto_id"
            value={input.producto_id}
            onChange={e => handleFormChange(index, e)}
            displayEmpty
            sx={{ width: '90%' }}
          >
            <MenuItem disabled value="">
              <em>Seleccione el producto</em>
            </MenuItem>
            {productoList.map(producto => (
              <MenuItem key={producto.id} value={producto.id}>
                {producto.nombre} - ${producto.precio} - cant: {producto.stock}
              </MenuItem>
            ))}
          </Select>
          <TextField
            name="cantidad"
            label="Cantidad"
            type='number'
            value={input.cantidad}
            onChange={e => handleFormChange(index, e)}
            required
          />
          <TextField
            name="totalProducto"
            label="Total"
            type="text"
            value={input.totalProducto}
            disabled
          />
          <IconButton onClick={() => removeFields(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}

      <Button onClick={addFields} variant="outlined" sx={{ mb: 3, borderRadius: 3, mt: 1 }}>
        Agregar productos
      </Button>

      <TextField
        label="Recibido"
        name='recibido'
        type="number"
        value={recibido}
        onChange={e => setRecibido(parseFloat(e.target.value))}
        required
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Total"
        name='total'
        type="text"
        disabled
        value={total}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Cambio"
        name='cambio'
        type="text"
        disabled
        value={cambio}
        fullWidth
        sx={{ mb: 2 }}
      />
    </>
  );
}