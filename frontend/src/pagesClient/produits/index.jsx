import React from "react";
import { Box, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProductsQuery, useRemoveProduitMutation } from "state/api";
import Header from "componementClient/Header";
import DataGridCustomToolbar from "componementClient/DataGridCustomToolbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlexBetween from "componentsAdmin/FlexBetween";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Products  = () => {
  const theme = useTheme();
  const id = localStorage.getItem('userId')
  const { data, isLoading } = useGetProductsQuery(id);
  const totalInvoices = data ? data.totalItems : 0;
  const [removeProduit] = useRemoveProduitMutation();
  const columns = [
    {
      field: "name",
      headerName: "Nom",
      flex: 0.7,
      renderCell: (params) => {
        const name = params.value;
        let icon = <ShoppingCartIcon style={{fontSize: '1rem' }} />;
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
    },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
        field: "categoryName",
        headerName: "Catégorie",
        flex: 0.6,
    },
    {
        field: "quantity",
        headerName: "Quantité",
        flex: 0.5,
    },
    {
        field: "price",
        headerName: "Prix",
        flex: 0.5,
        renderCell: (params) => {
            const textColor = theme.palette.mode === "dark" ? "cyan" : "green";
            // Display the total amount
            return (
              <span style={{ color: textColor }}>
                  {params.value.toFixed(2)} DH
              </span>
              );
        },
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
    window.location.href = `/produits/edit/${id}`;
  };
  
  const handleDelete = async (id) => {
    try {
      await removeProduit(id);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Box m="1.5rem 2.5rem">
      
      <FlexBetween>
        <Header title="PRODUITS" subtitle="Liste entier des "   total={totalInvoices} />        
        <Link to="/ajouterProduit">
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
      {/* <AddButton label="Nouveau Produit"  /> */}
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
          rows={(data && data.productsEnt) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
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

// test add .

export default Products;