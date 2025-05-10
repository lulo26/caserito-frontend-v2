import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';


export default function FormProduct() {
  return (
    <>
        <FormControl fullWidth label="Outlined" variant="outlined">
             <InputLabel >Nombre</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Password"
          />
        </FormControl>
    </>
  );
}