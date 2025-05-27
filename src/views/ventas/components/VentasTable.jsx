import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid'
import { baseURL } from '../../../store/constant';
import Loader from "../../../ui-component/Loader";
import Loading from "../../productos/components/Loading";
import axios from "axios";

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'total', headerName: 'Total', width: 300 },
  { field: 'recibido', headerName: 'Recibido', width: 200 },
  { field: 'created_at', headerName: 'Fecha', width: 600 }
]

export default function VentasTable() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([])
  
    useEffect(() => {
          // Make GET request to fetch data
      axios.get(`${baseURL}venta`)
        .then((response) => {
          setTableData(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
    console.log(tableData);
    
      if (loading) return (<><Loader/> <Loading/></>);
      if (error) return <div>Error: {error}</div>;

/*   const rows = [
    data.data.map((post) =>(createData(post.id, post.total, post.recibido, post.created_at)) )
  ]; */
  return (
      <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
      />
    </div>
  );
}
