import { useEffect, useState } from "react";
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

export default function AppPost({IDproducto}) {
    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true)
      getProductos()     
    };
    const handleClose = () => setOpen(false);
    

    // Post request
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    const [response, setResponse] = useState([])
    const [producto, setProducto] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        let field = e.target

        const editedProduct = {
            nombre: field.nombre.value,
            descripcion: field.descripcion.value,
            stock: field.stock.value,
            precio: field.precio.value,
            imagen: field.imagen.value,
        };

        // Make POST request to send data
        axios.put(`${baseURL}/producto/${IDproducto}`, editedProduct)
            .then((response) => {
                setResponseMessage(<Alert severity="success">Producto Editado.</Alert>);
            })
            .catch((err) => {
                setResponseMessage(<Alert severity="error">Hubo un error al editar el producto.</Alert>);
            });
    };

    const getOneProducto = ()=>{
        return axios.get(`${baseURL}/producto/${IDproducto}`)
    }   
   
    useEffect(()=>{
         getProductos()
    }, [producto]) 

    const getProductos = ()=>{
        const response =  getOneProducto()
        response.then((res) =>{
          setProducto(res.data.data)
        })
    }
    
    return (   
    <div>
    <Button onClick={handleOpen} variant='contained' size='small' sx={{borderRadius: '8px'}}>Editar</Button>
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
                Editar producto
              </MuiTypography>

              <IconButton aria-label="Close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
          </Stack>              
            <Form noValidate autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
               <EditForm
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                stock={producto.stock}
                precio={producto.precio}
               />
            </Form>
            {responseMessage && <p>{responseMessage}</p>}
        </Box>
      </Modal>
    </div>

    );
};