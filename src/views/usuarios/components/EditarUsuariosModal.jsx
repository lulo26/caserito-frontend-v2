import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UsuariosForm from './UsuariosForm';

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

export default function EditarProductosModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Button onClick={handleOpen} variant='contained' size='small' sx={{borderRadius: '8px'}}>Editar producto</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MuiTypography sx={{mb: 3}} variant="h4" component="h2">
            Editar producto
          </MuiTypography>
          <UsuariosForm/>
          <Button variant='contained' sx={{borderRadius: '8px'}}>Agregar</Button>
          <Button onClick={handleClose} variant='contained' sx={{bgcolor: 'secondary.main', ml:3, borderRadius: '8px'}}>Cerrar</Button>
        </Box>
      </Modal>
    </div>
  );
}