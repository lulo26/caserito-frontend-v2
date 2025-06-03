import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-router";

import { 
  Stack, 
  IconButton, 
  Modal, 
  Button, 
  Box,
  Alert 
} from '@mui/material';

import MuiTypography from '@mui/material/Typography' 

import CloseIcon from '@mui/icons-material/Close';

import ProductosForm from "../components/ProductosForm";
import { baseURL } from "../../../store/constant";

const style = {
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
};

export default function AppPost() {
    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Post request
    const productoURL = baseURL + '/producto'
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        try {
      const response = await axios.post(productoURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseMessage('Producto agregado exitosamente');
    } catch (error) {
      setResponseMessage('Error al agregar producto');
    }
  };

    return (   
    <div>
    <Button onClick={handleOpen} variant='contained' sx={{borderRadius: '8px'}}>Crear nuevo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 3,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <MuiTypography variant="h4" component="h2">
                Agregar un nuevo producto
              </MuiTypography>

              <IconButton aria-label="Close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
          </Stack>              
            <Form noValidate autoComplete='off' onSubmit={handleSubmit} >
               <ProductosForm/>
            </Form>
            {responseMessage && <p>{responseMessage}</p>}
        </Box>
      </Modal>
    </div>

    );
};