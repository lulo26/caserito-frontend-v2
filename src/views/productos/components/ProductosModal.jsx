import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiTypography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppPost from '../api/AppPost';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';

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

export default function ProductosModal() {
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


              
          <AppPost/>
        </Box>
      </Modal>
    </div>
  );
}