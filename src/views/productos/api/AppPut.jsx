import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-router";
import { useNavigate } from "react-router";

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

import EditForm from "../components/EditForm";
import { baseURL } from "../../../store/constant";
import { RestorePageOutlined } from "@mui/icons-material";

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

export default function AppPost({ IDproducto }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    stock: '',
    precio: '',
    imagen: null,
  });

  const handleOpen = () => {
    setOpen(true);
    getProducto();
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imagen: e.target.files[0] || null }))
    
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = new FormData();

  // Append other fields
  payload.append('nombre', formData.nombre);
  payload.append('descripcion', formData.descripcion);
  payload.append('stock', formData.stock);
  payload.append('precio', formData.precio);

  // Only append image if a file is selected
  if (formData.imagen instanceof File) {
    payload.append('imagen', formData.imagen);
  }

  try {
    const response = await axios.post(
      `${baseURL}/producto/${IDproducto}?_method=PUT`,
      payload,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    setResponseMessage(<Alert severity="success">Producto editado exitosamente</Alert>);
    navigate(0);
  } catch (error) {
    setResponseMessage(<Alert severity="error">Error al editar el producto</Alert>);
  }
};



  const getProducto = async () => {
    try {
      const response = await axios.get(`${baseURL}/producto/${IDproducto}`);
      const producto = response.data.data;
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        stock: producto.stock || '',
        precio: producto.precio || '',
        imagen: null,
      });
    } catch (error) {
      console.error("Error fetching producto:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small" sx={{ borderRadius: '8px' }}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
          <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}>
            <DialogTitle>Editar producto</DialogTitle>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          </Stack>
          <DialogContent>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <EditForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />
            <Button type="submit" variant="contained">Guardar</Button>
          </Form>
          {responseMessage && <Box mt={2}>{responseMessage}</Box>}
          </DialogContent>
      </Dialog>
    </div>
  );
};