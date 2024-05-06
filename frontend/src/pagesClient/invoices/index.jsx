import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetInvoicesQuery } from "state/api";
import Header from "componementClient/Header";
import DataGridCustomToolbar from "componementClient/DataGridCustomToolbar";
import AddButton from "componementClient/addButton";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline, HourglassEmpty, ErrorOutline } from '@mui/icons-material';


const Invoices  = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetInvoicesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const totalInvoices = data ? data.totalItems : 0;

  const formatDate = (dateString) => {
    console.log('Received dateString:', dateString);
  
    // Ensure dateString is not empty or undefined
    if (!dateString) return '';
  
    // Parse the date string
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return '';
    }
  
    // Format the date
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("fr-FR", options);
  };

  const columns = [
    /*{
      field: "_id",
      headerName: "ID Facture",
      flex: 1,
    },*/
    /*{
      field: "clientId",
      headerName: "ID Client",
      flex: 1,
    },*/
    {
      field: "clientName",
      headerName: "Client",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date de création",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
     {
      field: "dueDate",
      headerName: "Date d'échéance",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "items",
      headerName: "Produits",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "payments",
      headerName: "Montant",
      flex: 1,
      renderCell: (params) => {
        // Extract the amount from the payments array
        const paymentAmounts = params.value.map(payment => payment.amount);
        // Sum up the payment amounts
        const totalAmount = paymentAmounts.reduce((acc, curr) => acc + curr, 0);
        const textColor = theme.palette.mode === "dark" ? "cyan" : "green";
        // Display the total amount
        return (
          <span style={{ color: textColor }}>
              {totalAmount.toFixed(2)} DH
          </span>
          );
    },
  },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.value;
        let icon, backgroundColor;
  
        switch (status) {
          case 'sent':
            icon = <HourglassEmpty style={{ color: 'white', fontSize: '1rem' }} />;
            backgroundColor = 'orange';
            break;
          case 'paid':
            icon = <CheckCircleOutline style={{ color: 'white' , fontSize: '1rem' }} />;
            backgroundColor = 'green';
            break;
          case 'late':
            icon = <ErrorOutline style={{ color: 'white', fontSize: '1rem' }} />;
            backgroundColor = 'red';
            break;
          default:
            icon = null;
            backgroundColor = 'transparent';
        }
  
        return (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: backgroundColor,
              padding: '0px 0.2rem', 
              borderRadius: '4px',
            }}
          >
            {icon}
            <span style={{ marginLeft: '0.25rem', color: 'white', fontSize: '0.8rem', lineHeight: '1.8rem', fontFamily : 'Tahoma, sans-serif', }}>{status}</span>
          </div>
        );
      },
    },
  ];

  const handleAddButton = () => {
    navigate(`/ajouterFacture`);
    //console.log("Add Invoice button clicked");
  };

  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="FACTURES" subtitle="Liste entier des "   total={totalInvoices} />
      <AddButton label="Nouvelle Facture" onClick={handleAddButton} />
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
          rows={(data && data.invoices) || []}
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
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;