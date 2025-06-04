import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid2';

// project imports
import TotalVendido from './TotalVendido';
import TotalProductos from './TotalProductos';
import TotalGanancias from './TotalGanancias';

import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <TotalVendido isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
            <TotalProductos isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
       <TotalGanancias/> 
      </Grid>
    </Grid>
  );
}
