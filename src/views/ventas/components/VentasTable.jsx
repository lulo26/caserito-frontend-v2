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
import logo2 from './logo2.png'; 


export default function VentasTable() {

  const [selectedVenta, setSelectedVenta] = useState(null);
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
  
/*     useEffect(() => {
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
    }, [ventaId, total]); */

useEffect(() => {
  Promise.all([
    axios.get(`${baseURL}/venta`),
    axios.get(`${baseURL}/items`),
    axios.get(`${baseURL}/producto`)
  ])
    .then(([ventasRes, itemsRes, productosRes]) => {
      const ventas = ventasRes.data.data;
      const items = itemsRes.data.data;
      const productos = productosRes.data.data;

      const enrichedVentas = ventas.map(venta => {
        const relatedItems = items
          .filter(item => item.venta_id === venta.id)
          .map(item => {
            const producto = productos.find(p => p.id === item.producto_id);
            return {
              ...item,
              nombre: producto ? producto.nombre : 'Producto no encontrado'
            };
          });

        return {
          ...venta,
          productos: relatedItems
        };
      });

      setTableData(enrichedVentas);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);


    
      if (loading) return (<><Loader/> <Loading/></>);
      if (error) return <div>Error: {error}</div>;
      
        const handleClickOpen = (id) => {
          const venta = tableData.find(v => v.id === id);
          setSelectedVenta(venta);
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
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const newdat = today.toLocaleDateString("es-ES", options);
  doc.setFontSize(10);
  doc.text(newdat, 10, 5);

  const img = new Image();
  img.src = logo2;

  img.onload = () => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginBottom = 10;

    let pageCount = 1;
    let y = 50;

    doc.addImage(img, 'PNG', 10, 5, 30, 30);

    // Title styling
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(219, 105, 181); // Pink
    doc.text("Caserito postres", 40, 20);

    // Subtitle
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0);
    doc.text("Reporte de Ventas", 40, 26);

    tableData.forEach((venta, index) => {
  const formattedDate = new Date(venta.created_at).toLocaleString("es-ES", {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
      });
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.setFont(undefined, 'bold');
      doc.text(`Número de venta: ${venta.id}`, 10, y);
      doc.setFont(undefined, 'normal');
      doc.text(`Total: $${venta.total} | Recibido: $${venta.recibido}`, 10, y + 6);
      doc.text(`Fecha: ${formattedDate}`, 10, y + 12);

      y += 18;

      if (venta.productos.length > 0) {
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text("Productos:", 10, y);
        y += 6;

        autoTable(doc, {
          startY: y,
          head: [['Producto', 'Cantidad', 'Total']],
          body: venta.productos.map(p => [p.nombre, p.cantidad, p.total]),
          theme: 'grid',
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: [219, 105, 181],
            textColor: 255
          },
          margin: { left: 10 },
          didDrawPage: function (data) {
            // Footer
            const str = `Página ${doc.internal.getNumberOfPages()}`;
            doc.setFontSize(10);
            doc.text(str, pageWidth / 2, pageHeight - marginBottom, { align: 'center' });
          },
        });

        y = doc.lastAutoTable.finalY + 10;
      }

      // Page break if needed
      if (y > 270) {
        doc.addPage();
        y = 20;
        pageCount++;
      }
    });

    // Save PDF
    doc.save('informe_ventas.pdf');
  };
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

<Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
  <DialogTitle>Detalles de la venta</DialogTitle>
  <DialogContent>
    <Typography variant='h3' color='primary'>Productos</Typography>

    {selectedVenta?.productos.map((producto) => (
      <Card variant="outlined" sx={{ width: '100%', mt: 1 }} key={producto.id}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
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
      </Card>
    ))}

    <Typography variant='h3' sx={{ mt: 3 }}>
      Total Venta: {selectedVenta?.total}
    </Typography>
  </DialogContent>
</Dialog>

  </>);
}
