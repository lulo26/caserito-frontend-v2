import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import FormProduct from './FormProduct';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export default function modalProducto() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Button onClick={handleOpen} variant='contained'>Crear nuevo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MuiTypography sx={{mb: 3}} variant="h4" component="h2">
            Agregar un nuevo producto
          </MuiTypography>
          <FormProduct/>
        </Box>
      </Modal>
    </div>
  );
}