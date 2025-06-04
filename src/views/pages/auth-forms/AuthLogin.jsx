import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material'; 

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import BackToHome from '../authentication/BackToHome';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';
import { ACCESS_TOKEN_NAME, baseURL } from '../../../store/constant';

import { useNavigate } from 'react-router';

// ===============================|| JWT - LOGIN ||=============================== //

export default function AuthLogin() {
  const [responseMessage, setResponseMessage] = useState("");
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const [state, setState] = useState({
      email:'',
      password:''
    })

    const handleChange = (e)=>{
      const {id, value} = e.target
      setState(prevState =>({
        ...prevState, 
        [id] : value
      }))
    }

    const handleSubmitClick = (e)=>{
      
      e.preventDefault()
      const payload = {
        'email': state.email,
        'password': state.password
      }
      axios.post(`${baseURL}/login`,payload)
      .then(function(response){
        if(response.status == 200){
          setState(prevState =>({
            ...prevState,
            'successMesage' : 'sesión iniciada correctamente'
          }))
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.data)
          console.log(response.data.data);
          navigate('/')
          
        }
        else if(response.code === 204){
                    setResponseMessage(<Alert severity="error">El correo y la contraseña no coinciden</Alert>);
                }
                else{
                    setResponseMessage(<Alert severity="error">El correo no está registrado</Alert>);
                }
            })
        .catch(function (error) {
                console.log(error);
                setResponseMessage(<Alert severity="error">Error al iniciar sesión</Alert>);
            
      })
    }

    const navigate = useNavigate();

  return (
    <>
    <BackToHome/>
    <form action='submit'>
        <InputLabel htmlFor="email">Correo</InputLabel>
        <OutlinedInput 
        id="email" 
        type="email" 
        name="email"
        value={state.email}
        onChange={handleChange}
        sx={{mb:3, mr:3, width:'100%'}}
        />

        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={state.password}
          onChange={handleChange}
          sx={{mb:3, mr:3, width:'100%'}}
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
          label="Password"
        />
      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
          color="secondary" 
          fullWidth size="large" 
          type="submit" 
          variant="contained" 
          onClick={handleSubmitClick}>
            Iniciar
          </Button>
        </AnimateButton>
        {responseMessage && <p>{responseMessage}</p>}
      </Box>
      </form>
    </>
  );
}
