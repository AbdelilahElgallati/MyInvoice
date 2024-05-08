import React from "react";
import { Box, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetClientsQuery, useRemoveClientMutation } from "state/api";
import Header from "componementClient/Header";
import DataGridCustomToolbar from "componementClient/DataGridCustomToolbar";
import PersonIcon from '@mui/icons-material/Person';
import FlexBetween from "componentsAdmin/FlexBetween";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const Clients  = () => {
  const theme = useTheme();
  const id = localStorage.getItem('userId')
  const { data, isLoading } = useGetClientsQuery(id);
  const [removeClient] = useRemoveClientMutation();
  const totalInvoices = data ? data.totalItems : 0;
  const columns = [
    
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
      renderCell: (params) => {
        const name = params.value;
        let icon = <PersonIcon style={{fontSize: '1rem' }} />;
        return (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0px 0.2rem', 
            }}
          >
            {icon}
            <span style={{ marginLeft: '0.25rem', fontSize: '0.8rem',}}>{name}</span>
          </div>
        );
      }
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Téléphone",
      flex: 1,
    },
    {
        field: "address",
        headerName: "Addresse",
        flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleEdit(params.row._id)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row._id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleEdit = (id) => {
    window.location.href = `/clients/edit/${id}`;
  };
  
  const handleDelete = async (id) => {
    try {
      await removeClient(id);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Box m="1.5rem 2.5rem">
      
      <FlexBetween>
      <Header title="CLIENTS" subtitle="Liste entier des "   total={totalInvoices} />
        <Link to="/ajouterClient">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Link>
      </FlexBetween>
      
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data  || []}
          columns={columns}
          // rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          paginationMode="server"
          sortingMode="server"
          components={{ Toolbar: DataGridCustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Clients;