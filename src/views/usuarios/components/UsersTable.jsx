import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid'
import { baseURL } from '../../../store/constant';
import Loader from "../../../ui-component/Loader";
import Loading from "../../productos/components/Loading";
import axios from "axios";
import { Stack, Button, colors } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router";



export default function UsersTable() {
  const navigate = useNavigate();

  const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Nombre', width: 200 },
  { field: 'email', headerName: 'Correo', width: 300 },
  { field: 'created_at', headerName: 'Fecha creación', width: 300 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 200,
    renderCell: (params) => (
        <Button
          variant='contained'
          size="small"
          onClick={() => handleDelete(params.row.id)}
          color='error'
        >
          Eliminar
        </Button>
    ),
  },
]

  const handleDelete = (id) => {
    axios.delete(`${baseURL}/user/${id}`)
    .then((response) => navigate(0))
    .catch((error) => console.log(error.message))

  };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([
    ])
  
    useEffect(() => {
          // Make GET request to fetch data
      axios.get(`${baseURL}/user`)
        .then((response) => {
          setTableData(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
      

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
