import React, { useState } from "react";
import {Button, 
  Box, 
  Dialog, 
  Alert, 
  DialogTitle, 
  DialogContent, 
  DialogContentText,
  DialogActions,
  Slide} from '@mui/material';
import axios from 'axios';
import MuiTypography from '@mui/material/Typography'
import VentasForm from './VentasForm';
import { baseURL } from "../../../store/constant";

import { useNavigate } from "react-router";

export default function VentasModal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [inputFields, setInputFields] = useState([{ producto_id: '', cantidad: '', totalProducto: '' }]);
  const [productoList, setProductoList] = useState([]);
  const [total, setTotal] = useState(0);
  const [recibido, setRecibido] = useState(0);
  const [cambio, setCambio] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");


  const handleErrOpen = () => setOpenErr(true);
  const handleErrClose = () => setOpenErr(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(`${baseURL}/producto`);
      setProductoList(res.data.data);
    } catch (err) {
      console.error("Error fetching productos:", err);
    }
  };

  React.useEffect(() => {
    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, create the sale
      const ventaRes = await axios.post(`${baseURL}/venta`, {
        total,
        recibido
      });

      console.log(ventaRes.data.data);
      

      const venta_id = ventaRes.data.data.id; // Make sure your API returns this

      // Then, add each item with the venta_id
      for (const item of inputFields) {
        const producto = productoList.find(p => p.id === parseInt(item.producto_id));
        if (!producto) continue;
        
        const cantidadVendida = parseInt(item.cantidad)
        const nuevoStock = producto.stock - cantidadVendida
        

        await axios.post(`${baseURL}/items`, {
          venta_id,
          producto_id: producto.id,
          precio: producto.precio,
          cantidad: item.cantidad,
          total: item.totalProducto
        });

        await axios.post(`${baseURL}/producto/${producto.id}`, {
        stock: nuevoStock
      });
      }

         

      setResponseMessage(<Alert severity="success">Venta y productos agregados correctamente.</Alert>);
      navigate(0);
    } catch (error) {
      console.error("Error saving venta or items:", error);
      setResponseMessage(<Alert severity="error">Hubo un error al guardar la venta.</Alert>);
    }
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const isEmpty = (obj)=>{
        let test = obj === undefined
        console.log(test);
        return test;
    }

  return (
    <>
      <Button  onClick={!isEmpty(productoList) ? handleOpen : handleErrOpen} variant="contained" sx={{ borderRadius: '8px' }}>
        Agregar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Realizar venta</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <VentasForm
              inputFields={inputFields}
              setInputFields={setInputFields}
              total={total}
              setTotal={setTotal}
              recibido={recibido}
              setRecibido={setRecibido}
              cambio={cambio}
              setCambio={setCambio}
              productoList={productoList}
            />
            <Button variant="contained" type="submit" sx={{ borderRadius: '8px' }}>
              Agregar
            </Button>
          </form>
          {responseMessage && <Box mt={2}>{responseMessage}</Box>}
        </DialogContent>
      </Dialog>

      <Dialog
              open={openErr}
              slots={{
                transition: Transition,
              }}
              keepMounted
              onClose={handleErrClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle variant="h3">{"Faltan productos"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <MuiTypography variant="h5">Para realizar una venta debe crear productos primero.</MuiTypography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleErrClose}>okay</Button>
              </DialogActions>
            </Dialog>
    </>
  );
}
