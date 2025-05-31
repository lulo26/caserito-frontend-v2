import * as React from 'react'
import {TextField, Button, Select, MenuItem, IconButton, Stack, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseURL } from '../../../store/constant.js';
import axios from 'axios';

export default function VentasForm() {
  const [inputFields, setInputFields] = React.useState([{
      producto_id: '',
      cantidad: '',
      totalProducto: ''
    }])
  const [producto_id, setProducto_id] = React.useState([''])
  const [total, setTotal] = React.useState(0)
  const [cambio, setCambio] = React.useState(0)
  const [recibido, setRecibido] = React.useState(0)
  const [venta_id, setVenta_id] = React.useState('')

  const handleFormChange = (index, e)=>{
    e.preventDefault()
    let data = [...inputFields]
    data[index][e.target.name] = e.target.value
    setInputFields(data)
    getTotal()
  }

  const addFields = ()=>{
    let newField = {
      producto_id: '', 
      cantidad: '',
      totalProducto: ''
    }
    setInputFields([...inputFields, newField])
  }

  const removeFields = (index)=>{
    let data = [...inputFields]
    data.splice(index, 1)
    setInputFields(data)
  }

  const handleRecibidoChange = (e)=>{
    e.preventDefault()
    setRecibido(e.target.value)
    console.log(`recibido: ${recibido}`);
  }

  const getTotal = ()=>{
    let totalSum = 0
    let updateFields = [...inputFields]
    for (let i = 0; i < inputFields.length; i++) {
      if (!isNaN(parseInt(inputFields[i].cantidad))) {
        const totalProductoSum = parseInt(inputFields[i].producto_id) * parseInt(inputFields[i].cantidad) 
        totalSum += totalProductoSum 
        updateFields[i] = {...updateFields[i], totalProducto: totalProductoSum}
      }
      console.log(`total producto suma: ${inputFields[i].totalProducto}`);
    }
    if (isNaN(totalSum)){
      totalSum = 0
    }

    setInputFields(updateFields)
    setTotal(totalSum)
  
  
  }

  const getCambio = ()=>{
    let cambioSum = 0
    if (recibido > total){
      cambioSum = recibido - total
    }
    setCambio(cambioSum)
  }

  React.useEffect(()=>{
    getAllProductos();
  },[producto_id])
  
  React.useEffect(()=>{
    getCambio()
  },[recibido, total])

  const getAllProductos = () =>{
    const response = axios.get(`${baseURL}/producto`)
    response.then((res)=>{
      setProducto_id(res.data.data)
    })
  }

  return (
    <>
    <TextField
          name='venta_id'
          label="id"
          value={venta_id}
          type='number'
          hidden
          required
          sx={{display:'none'}}
        />
    <label>Productos</label>
      <div style={{width: '100%'}}>
        {inputFields.map((input, index)=>{
        return(
        <Stack key={index} direction="row" spacing={1} mb={1} mt={2}>

        <Select
          name="producto_id"
          value={input.producto_id}
          onChange={e => handleFormChange(index, e)}
          displayEmpty
          sx={{width:'90%'}}
        >
          <MenuItem disabled value="">
            <em>Seleccione el producto</em>
          </MenuItem>
          {producto_id.map((producto)=>(
            <MenuItem name='producto.id' value={producto.precio}>{producto.nombre}</MenuItem>
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
          label="total"
          type='text'
          value={input.totalProducto}
          onChange={e => handleFormChange(index, e)}
          required
          disabled
        />
          <IconButton onClick={()=>removeFields(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
            )
          })}
        
        <Button onClick={addFields} variant="outlined" sx={{mb:3, borderRadius:3, mt:1}}>Agregar productos</Button>
           
        <TextField
          label="Recibido"
          name='recibido'
          type="number"
          value={recibido}
          onChange={e =>handleRecibidoChange(e)}
          required
          sx={{mb:3, mr:3, width:'100%'}}
        />
        <TextField
          label="Total"
          name='total'
          type="text"
          disabled
          value={total}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{mb:3, mr:3, width:'100%'}}
        />
        
        <TextField
          label="Cambio"
          name='cambio'
          type="text"
          disabled
          value={cambio}
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