import React, { useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetInvoicesQuery, useRemoveInvoiceMutation } from "state/api";
import Header from "componementClient/Header";
import DataGridCustomToolbar from "componementClient/DataGridCustomToolbar";
import AddButton from "componementClient/addButton";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline, HourglassEmpty, ErrorOutline } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Invoices  = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const id = localStorage.getItem('userId');
  const { data, isLoading } = useGetInvoicesQuery(id);
  const [removeInvoice] = useRemoveInvoiceMutation();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return '';
    }
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("fr-FR", options);
  };

  const columns = [
    {
      field: "invoiceNumber",
      headerName: "Numéro de Facture",
      flex: 1,
    },
    {
      field: "clientId",
      headerName: "Client",
      flex: 0.6,
      renderCell: (params) => params.row.clientId.name,
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
      renderCell:(params) => {
        // Sum the quantities of all items in the array
        const totalQuantity = params.value.reduce((acc, curr) => acc + curr.quantity, 0);
        return totalQuantity;
      },
    },
    {
      field: "amount",
      headerName: "Montant",
      flex: 1,
      renderCell: (params) => {
        // Extract the amount from the payments array
        const paymentAmounts = params.value;
        const textColor = theme.palette.mode === "dark" ? "cyan" : "green";
        // Display the total amount
        return (
          <span style={{ color: textColor }}>
              {paymentAmounts.toFixed(2)} DH
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

  const handleAddButton = () => {
    navigate(`/ajouterFacture`);
  };
  const handleEdit = (id) => {
    window.location.href = `/factures/edit/${id}`;
    };
  
  const handleDelete = async (id) => {
    try {
      await removeInvoice(id);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="FACTURES" subtitle="Liste entier des "   total= {data ? data.length : 0} />
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
          rows={data  || []}
          columns={columns}
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

export default Invoices;