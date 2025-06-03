import React, { useState } from "react";
import {Button, Box, Modal, Stack, IconButton, Alert} from '@mui/material';
import { Form } from 'react-router';
import MuiTypography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import { useNavigate } from "react-router";

import UsersForm from "./UsersForm";
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

export default function UsersModal() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  
      const handleSubmit = (event) => {
          event.preventDefault();
          let field = event.target
  
          const newUser = {
              name: field.name.value,
              email: field.email.value,
              password: field.password.value
          };
  
          // Make POST request to send data
          axios.post(`${baseURL}/user`, newUser)
              .then((response) => {
                  setResponseMessage(<Alert severity="success">Usuario Agregado.</Alert>);
                  navigate(0)
              })
              .catch((err) => {
                  setResponseMessage(<Alert severity="error">Hubo un error al agregar el usuario.</Alert>);
              });
              
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
                Agregar un nuevo usuario
              </MuiTypography>

              <IconButton aria-label="Close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
          </Stack>  
          <form noValidate autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
          <UsersForm/>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </Box>
      </Modal>
    </div>
  );
}