import React from "react";
import FlexBetween from "componementClient/FlexBetween";
import {
  DownloadOutlined,
  PersonAdd,
  CheckCircleOutline, 
  HourglassEmpty, 
  ErrorOutline, 
} from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "componementClient/BreakdownChart";
import OverviewChart from "componementClient/OverviewChart";
import { useGetDashboardClientQuery } from "state/api";
import StatBox from "componementClient/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardClientQuery();

  const formatDate = (dateString) => {
    console.log('Received dateString:', dateString);
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
      renderCell:(params) => {
        // Sum the quantities of all items in the array
        const totalQuantity = params.value.reduce((acc, curr) => acc + curr.quantity, 0);
        return totalQuantity;
      },
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
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
          TABLEAU DE BORD
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
          Bienvenue sur votre tableau de bord
      </Typography>
      </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary[400],
              color : theme.palette.secondary[50],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Télécharger Rapports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total  Clients"
          value={data && data.totalCustomers}
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Produits"
          value={data && data.totalProducts}
          icon={
            <AddShoppingCartIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Total Factures"
          value={data && data.totalInvoices}
          icon={
            <ReceiptIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Ventes (Dhs)"
          value={data && data.totalAmount.reduce((acc, curr) => acc + curr.totalAmount, 0)}
          icon={
            <MonetizationOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Factures Par Status
          </Typography>
          <BreakdownChart />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
           Répartition des factures et des informations
            par status de revenus réalisés pour cette année et ventes totales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;