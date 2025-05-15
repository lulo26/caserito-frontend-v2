import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import EditarProductosModal from './EditarProductosModal';

export default function ProductosCard({nombre, descripcion,stock,precio,imagen}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={descripcion}
        height="140"
        image={imagen}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Descripción: {descripcion}
        </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt:3}}>
          Cantidad: {stock}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Precio: ${precio}
        </Typography>
      </CardContent>
      <CardActions>
        <EditarProductosModal/>
        <Button variant='contained' size="small" color='error' sx={{borderRadius: '8px'}}>Eliminar</Button>
      </CardActions>
    </Card>
  );
}