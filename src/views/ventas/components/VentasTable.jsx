import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid'
import { baseURL } from '../../../store/constant';
import Loader from "../../../ui-component/Loader";
import Loading from "../../productos/components/Loading";
import axios from "axios";
import { Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"
import DownloadIcon from "@mui/icons-material/Download"

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable';


export default function VentasTable() {

  const [ventaProductos, setVentaProductos] = useState([])
  const [ventaId, setVentaId] = useState(null)
  const [total, setTotal] = useState(null)
  const [productos, setProductos] = useState([])

  const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'total', headerName: 'Total', width: 300 },
  { field: 'recibido', headerName: 'Recibido', width: 200 },
  { field: 'created_at', headerName: 'Fecha', width: 300 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 200,
    renderCell: (params) => (
        <Button
          variant='outlined'
          size="small"
          onClick={() => handleClickOpen(params.row.id, params.row.total)}
          color='secondary'
          startIcon={<InfoIcon/>}
        >
          Ver detalles
        </Button>
    ),
  },
]

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([])
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
          // Make GET request to fetch data
      axios.get(`${baseURL}/venta`)
        .then((response) => {
          setTableData(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });

        if (ventaId !== null) {
          getItems();
        }
    }, [ventaId, total]);
    
      if (loading) return (<><Loader/> <Loading/></>);
      if (error) return <div>Error: {error}</div>;
      
        const handleClickOpen = (id, total) => {
          setVentaId(id)
          setTotal(total)
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
        const getItems = () => {
  Promise.all([
    axios.get(`${baseURL}/items`),
    axios.get(`${baseURL}/producto`)
  ])
    .then(([itemsRes, productosRes]) => {
      const allItems = itemsRes.data.data;
      const allProductos = productosRes.data.data;

      // 1. Filter items by selected ventaId
      const filteredItems = allItems.filter(item => item.venta_id === ventaId);

      // 2. Enrich each item with its matching producto
      const enrichedItems = filteredItems.map(item => {
        const producto = allProductos.find(p => p.id === item.producto_id);
        return {
          ...item,
          nombre: producto ? producto.nombre : 'Producto no encontrado'
        };
      });

      setVentaProductos(enrichedItems);
    })
    .catch((error) => {
      console.error("Error trayendo los datos:", error);
    });
};
/*   const rows = [
    data.data.map((post) =>(createData(post.id, post.total, post.recibido, post.created_at)) )
  ]; */

  const downloadPdf = () => {
  const doc = new jsPDF();

  doc.text("Informe de ventas", 20, 20);

  // Format headers for autoTable
  const tableColumn = columns
    .filter(col => col.field !== 'actions') // Remove 'actions' column
    .map(col => col.headerName);

  // Format rows
  const tableRows = tableData.map((row) =>
    columns
      .filter(col => col.field !== 'actions') // Same here
      .map(col => row[col.field])
  );

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
  });

  doc.save('informe_ventas.pdf');
};

  return (<>
      <div style={{ height: '100%', width: '100%' }}>
        <Button sx={{mb:1}} endIcon={<DownloadIcon/>} variant="outlined" onClick={downloadPdf}>Descargar informe</Button>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
      />
    </div>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Detalles de la venta"}
        </DialogTitle>
        <DialogContent>

            <Typography variant='h3' color='primary'>Productos</Typography>
{ventaProductos.map((producto) =><Card variant="outlined" sx={{ width:'100%', mt:1 }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {producto.nombre}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          Unidades vendidas: {producto.cantidad}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          Total vendido: {producto.total}
        </Typography>
      </Box>
    </Card>)}
    

   <Typography variant='h3' sx={{mt:3}}> Total Venta: {total} </Typography>
        </DialogContent>
      </Dialog>
  </>);
}
