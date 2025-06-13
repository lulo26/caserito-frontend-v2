import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { IconLogout } from '@tabler/icons-react';

import Typography from '@mui/material/Typography';

import useConfig from 'hooks/useConfig';

import axios from 'axios';
import { ACCESS_TOKEN_NAME, baseURL } from '../../../../store/constant';
import { useNavigate } from 'react-router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutDialogue() {
  const [open, setOpen] = React.useState(false);
  const { borderRadius } = useConfig();
  const [selectedIndex] = useState(-1);
  const idUser = 0

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = ()=>{
    
    localStorage.clear()
    axios.delete(`${baseURL}/logout/${idUser}`)
    .then((response) => {

    })
    .catch((error) => console.log(error.message))
    handleClose()
    
    navigate('/pages/login')
            
  }

  return (<>
    <ListItemButton onClick={handleClickOpen} sx={{ borderRadius: `${borderRadius}px` }} selected={selectedIndex === 4}>
        <ListItemIcon>
            <IconLogout stroke={1.5} size="20px" />
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2">Salir</Typography>} />
    </ListItemButton>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Desea cerrar la sesión?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            al oprimir aceptar saldrá de la página y tendrá que volver a iniciar sesión para volver acceder
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleLogout}>Aceptar</Button>
        </DialogActions>
      </Dialog>
      </>
  );
}