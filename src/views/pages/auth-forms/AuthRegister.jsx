import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Alert } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { baseURL } from '../../../store/constant';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                  setResponseMessage(<Alert severity="success">Usuario creado.</Alert>);
                  navigate('/')
              })
              .catch((err) => {
                  setResponseMessage(<Alert severity="error">Hubo un error al crear el usuario.</Alert>);
              });
      };

  return (
    <>     
    <form action='submit' onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={{ xs: 0, sm: 2 }}>
          <TextField
            fullWidth
            id='name'
            label="Nombre"
            margin="normal"
            name="nombre"
            type="text"
            sx={{ ...theme.typography.customInput }}
          />
      </Grid>
      <Grid container spacing={{ xs: 0, sm: 2 }}>
          <TextField
            fullWidth
            id='email'
            label="Correo electrónico"
            margin="normal"
            name="email"
            type="email"
            sx={{ ...theme.typography.customInput }}
          />
      </Grid>
            <Grid container spacing={{ xs: 0, sm: 2 }}>
          <TextField
            fullWidth
            id='password'
            label="Contraseña"
            margin="normal"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
            sx={{ ...theme.typography.customInput }}
          />
      </Grid>
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Registrarse
          </Button>
        </AnimateButton>
        {responseMessage && <p>{responseMessage}</p>}
      </Box>
      </form>
    </>
  );
}
