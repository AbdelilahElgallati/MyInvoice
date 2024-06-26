/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetOnePackQuery,
  useGetBonLivraisonDetailsQuery,
  useUpdateBonLivraisonMutation,
} from "state/api";
import Header from "componementClient/Header";
import DataGridCustomToolbar from "componementClient/DataGridCustomToolbar";
import FlexBetween from "componentsAdmin/FlexBetween";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleOutline,
  HourglassEmpty,
  ErrorOutline,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";
const BonLivraison = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const packId = localStorage.getItem("packId");
  const id = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const formPdf = "6630fdb21c1fec2176ead2c1";
  const { data: packData } = useGetOnePackQuery(packId);
  const [bonLivraison, setbonLivraison] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generatePdf, setGeneratePdf] = useState(false);

  useEffect(() => {
    if (packData) {
      setGeneratePdf(
        packData.services.some((service) => service.serviceId === formPdf)
      );
      
    }
  }, [packData]);

  // hadi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-invoice-api.vercel.app/BonLivraison/List/${id}`);
        setbonLivraison(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      navigate("/");
    }
  }, [id, navigate]);
  const [updateBonLivraison] = useUpdateBonLivraisonMutation();
 
  
  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const [idBonLivraison, setIdBonLivraison] = useState("");
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return "";
    }
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("fr-FR", options);
  };

  const columns = [
    {
      field: "_id",
      headerName: "Numéro de bon de livraison",
      flex: 1,

      renderCell: (params) => (
        <span
          style={{
            display: "inline-block",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "gray",
            borderRadius: "4px",
            padding: "5px 10px",
            lineHeight: "1",
          }}
        >
          #{params.value}
        </span>
      ),
    },
    {
      field: "bonCommandeId",
      headerName: "Numéro de commande",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            display: "inline-block",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "gray",
            borderRadius: "4px",
            padding: "5px 10px",
            lineHeight: "1",
          }}
        >
          #{params.row.bonCommandeId._id}
        </span>
      ),
    },
    {
      field: "dateLivraison",
      headerName: "Date de livraison",
      flex: 0.7,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "amount",
      headerName: "Montant",
      flex: 0.5,
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
      flex: 0.8,
      renderCell: (params) => {
        const status = params.value;
        let icon, backgroundColor;

        switch (status) {
          case "attent de confirmation":
            icon = (
              <HourglassEmpty style={{ color: "white", fontSize: "1rem" }} />
            );
            backgroundColor = "orange";
            break;
          case "confirmé":
            icon = (
              <CheckCircleOutline
                style={{ color: "white", fontSize: "1rem" }}
              />
            );
            backgroundColor = "green";
            break;
          case "attent de reception":
            icon = (
              <ErrorOutline style={{ color: "white", fontSize: "1rem" }} />
            );
            backgroundColor = "red";
            break;
          default:
            icon = null;
            backgroundColor = "transparent";
        }

        return (
          <span
            style={{
              display: "inline-block",
              alignItems: "center",
              color: "white",
              backgroundColor: backgroundColor,
              borderRadius: "4px",
              padding: "5px 10px",
              lineHeight: "1",
            }}
          >
            {icon} {status}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => handleDetails(params.row._id)}
            aria-label="details"
          >
            <InfoIcon />
          </IconButton>
          <IconButton
            onClick={() => handleEdit(params.row._id)}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleEmail(params.row._id)}
            aria-label="email"
          >
            <EmailIcon />
          </IconButton>
          { generatePdf === true ? (
            <IconButton
              onClick={() => handlePrint(params.row._id)}
              aria-label="print"
            >
              <PrintIcon />
            </IconButton>
          ) : (
            ""
          )}
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

  const { data: bonLivraisonDetail } =
    useGetBonLivraisonDetailsQuery(idBonLivraison);

  const handleDetails = (id) => {
    window.location.href = `/${userName}/bon-livraison/details/${id}`;
  };

  const handlePrint = (id) => {
    navigate(`/${userName}/bon-livraison/imprimer/${id}`);
  };

  const handleEmail = (id) => {
    navigate(`/bon-livraison/email/${id}`);
  };

  const handleEdit = (id) => {
    window.location.href = `/${userName}/bon-livraison/edit/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      const thisBon = bonLivraison.find((b) => b._id === id) 
      if(thisBon) {
        thisBon.active = false
        await updateBonLivraison({id, BonLivraisonData: thisBon})
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="BON DE LIVRAISON"
          subtitle="Liste des bon de livraison "
          total={bonLivraison ? bonLivraison.length : 0}
        />
        <Link to={`/${userName}/bon-livraison/new`}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Ajoute de bon de livraison
          </Button>
        </Link>
      </FlexBetween>{" "}
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
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={bonLivraison}
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

export default BonLivraison;
