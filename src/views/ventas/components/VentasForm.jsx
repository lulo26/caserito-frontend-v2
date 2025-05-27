import * as React from 'react'
import {TextField, Button, Select, MenuItem, IconButton, Stack, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseURL } from '../../../store/constant.js';
import axios from 'axios';

export default function VentasForm() {
  const [inputFields, setInputFields] = React.useState([{
      producto: '',
      cantidad: ''
    }])

  const handleFormChange = (index, event)=>{
    let data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
  }

  const addFields = ()=>{
    let newField = {
      producto: '', 
      cantidad: ''
    }

    setInputFields([...inputFields, newField])
  }

  const removeFields = (index)=>{
    let data = [...inputFields]
    data.splice(index, 1)
    setInputFields(data)
  }

  const [productos, setProductos] = React.useState([''])

  React.useEffect(()=>{
    getAllProductos();
  },[productos])
  

  const getAllProductos = () =>{
    const response = axios.get(`${baseURL}producto`)
    response.then((res)=>{
      setProductos(res.data.data)
    })
  }

  return (
    <>
      <div style={{width: '100%'}}>
        <label>Productos</label>
        {inputFields.map((input, index)=>{
        return(
        <Stack key={index} direction="row" spacing={1} mb={1} mt={2}>

        <Select
          name="producto"
          value={input.producto}
          onChange={event => handleFormChange(index, event)}
          displayEmpty
          sx={{width:'100%'}}
        >
          <MenuItem disabled value="">
            <em>Seleccione el producto</em>
          </MenuItem>
          {productos.map((producto)=>(
            <MenuItem value={producto.id}>{producto.nombre}</MenuItem>
          ))}
        </Select>
        <TextField
          name="cantidad"
          label="Cantidad"
          type='number'
          value={input.cantidad}
          onChange={event => handleFormChange(index, event)}
          required
        />
          <IconButton onClick={()=>removeFields(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
            )
          })}
        
        <Button onClick={addFields} variant="outlined" sx={{mb:3, borderRadius:3}}>Agregar otro producto</Button>
           
        <TextField
          id="recibido"
          label="Recibido"
          type="number"
          required
          sx={{mb:3, mr:3, width:'100%'}}
        />
        <TextField
          id="total"
          label="Total"
          type="text"
          disabled
          value={'$0'}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{mb:3, mr:3, width:'100%'}}
        />
        
        <TextField
          id="cambio"
          label="Cambio"
          type="text"
          disabled
          value={'$0'}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{mb:3, mr:3, width:'100%'}}
        />
        </div>
        <Button key='buttonSubmit' variant='contained' type='submit' sx={{borderRadius: '8px'}}>Agregar</Button>
    </>
  );
}