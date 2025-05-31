import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <Alert color="error">Error 404 - ésta página no existe!</Alert>;
    }

    if (error.status === 401) {
      return <Alert color="error">Error 401 - No tiene autorización para ver este contenido</Alert>;
    }

    if (error.status === 503) {
      return <Alert color="error">Error 503 - Parece que el servidor está caído</Alert>;
    }

    if (error.status === 418) {
      return <Alert color="error">Error 418 - Contact administrator</Alert>;
    }
  }

  return <Alert color="error">Under Maintenance</Alert>;
}
