import * as React from 'react';
import {Button, Box, Modal, Stack, IconButton} from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

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

export default function UsuariosModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <UsuariosForm/>
          <Button variant='contained' sx={{borderRadius: '8px'}}>Agregar</Button>
          <Button onClick={handleClose} variant='contained' sx={{bgcolor: 'secondary.main', ml:3, borderRadius: '8px'}}>Cerrar</Button>
        </Box>
      </Modal>
    </div>
  );
}