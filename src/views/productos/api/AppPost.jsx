import React, { useState } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router";
import { Navigate } from "react-router";

import { 
  Stack, 
  IconButton, 
  Modal, 
  Button, 
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent
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
    const navigate = useNavigate();

    // Post request
    const productoURL = baseURL + '/producto'
    const [responseMessage, setResponseMessage] = useState("");

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        try {
      const response = await axios.post(productoURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setResponseMessage(<Alert severity="success">Producto agregado exitosamente</Alert>);
      navigate(0)
    } catch (error) {
      setResponseMessage(<Alert severity="error">Error al agregar el producto</Alert>);
    }
    
  };

    return (   
    <div>
    <Button onClick={handleOpen} variant='contained' sx={{borderRadius: '8px'}}>Crear nuevo</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 3,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <DialogTitle>
                Agregar un nuevo producto
              </DialogTitle>

              <IconButton aria-label="Close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
          </Stack>   
          <DialogContent>           
            <Form noValidate autoComplete='off' onSubmit={handleSubmit} >
               <ProductosForm/>
            </Form>
            {responseMessage && <p>{responseMessage}</p>}
            </DialogContent>
      </Dialog>
    </div>

    );
};