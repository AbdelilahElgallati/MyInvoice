import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetProductsQuery } from "state/api";
import Header from "componementClient/Header";
import DataGridCustomToolbar from "componementClient/DataGridCustomToolbar";
import AddButton from "componementClient/addButton";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Products  = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const id = localStorage.getItem('userId')
  console.log("id : ", id)
  const { data, isLoading } = useGetProductsQuery(id);
  console.log("data : ", data)
  const totalInvoices = data ? data.totalItems : 0;
  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID Produit",
    //   flex: 1,
    // },
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
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
        field: "categoryId",
        headerName: "ID Catégorie",
        flex: 1,
    },
    {
        field: "quantity",
        headerName: "Quantité",
        flex: 1,
    },
    {
        field: "price",
        headerName: "Prix",
        flex: 1,
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
  ];

  const handleAddbutton = () => {
    navigate(`/ajouterProduit`);
    //console.log("Add Invoice button clicked");
  };


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUITS" subtitle="Liste entier des "   total={totalInvoices} />
      <AddButton label="Nouveau Produit" onClick={handleAddbutton} />
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
          rows={(data && data.products) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          // onSortModelChange={(newSortModel) => setSort(newSortModel[0])}
          components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { searchInput, setSearchInput, setSearch},
          // }}
        />
      </Box>
    </Box>
  );
};

export default Products;