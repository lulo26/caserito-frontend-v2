import React, { useState } from "react";
import {Button, Box, Dialog, Stack, IconButton, Alert, DialogTitle, DialogContent} from '@mui/material';
import { Form } from 'react-router';
import MuiTypography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import VentasForm from './VentasForm';
import { baseURL } from "../../../store/constant";

/* const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '0',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
}; */

export default function VentasModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [venta_id, setVenta_id] = useState('');
  const [producto_id, setProducto_id] = useState('')
  const [precio, setPrecio] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [total, setTotal] = useState("");
  const [totalProducto, setTotalProducto] = useState("")
  const [Recibido, setRecibido] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  
      const handleSubmit = (e) => {
          e.preventDefault();
          let field = e.target
  
          const newVenta = {
              total: field.total.value,
              recibido: field.recibido.value,
          };
  
          // Make POST request to send data
          axios.post(`${baseURL}/venta`, newVenta)
              .then((response) => {
                  setResponseMessage(<Alert severity="success">Venta Agregada.</Alert>);
              })
              .catch((err) => {
                  setResponseMessage(<Alert severity="error">Hubo un error al agregar la venta.</Alert>);
              });

              const NewItem = {
          venta_id: field.venta_id.value,
          producto_id: field.producto_id.value,
          precio: field.producto_id.value,
          cantidad: field.cantidad.value,
          total: field.totalProducto.value
        }

        axios.post(`${baseURL}/items`, NewItem)
              .then((response) => {
                  setResponseMessage(<Alert severity="success">Venta Agregada.</Alert>);
              })
              .catch((err) => {
                  setResponseMessage(<Alert severity="error">Hubo un error al agregar la venta.</Alert>);
              });
      };

      /* const handleSubmitItems = (e)=>{
        e.preventDefault();
        let field = e.target

        const NewItem = {
          venta_id: field.venta_id.value,
          producto_id: field.producto_id.value,
          precio: field.precio.value,
          cantidad: field.cantidad.value,
          total: field.totalProducto.value
        }

        axios.post(`${baseURL}items`, NewItem)
              .then((response) => {
                  setResponseMessage(<Alert severity="success">Venta Agregada.</Alert>);
              })
              .catch((err) => {
                  setResponseMessage(<Alert severity="error">Hubo un error al agregar la venta.</Alert>);
              });
      } */

  return (
    <div>
    <Button onClick={handleOpen} variant='contained' sx={{borderRadius: '8px'}}>Agregar</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Realizar venta</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
          <VentasForm/>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
          </DialogContent>
      </Dialog>
    </div>
  );
}