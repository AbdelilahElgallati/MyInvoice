import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, IconButton } from "@mui/material";
import {  useUpdateCategorieMutation } from "state/api";
import Header from "componentsAdmin/Header";
import { DataGrid } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import FlexBetween from "componentsAdmin/FlexBetween";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Categories = () => {
  const navigate = useNavigate();
  if(!localStorage.getItem('userId')) {
    navigate('/');
  }
  const theme = useTheme();
  const id = localStorage.getItem('userId');
  const userName = localStorage.getItem("userName");
  const [Categorie, setCategorie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // hadi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-invoice-api.vercel.app/Categorie/Entreprise/${id}`);
        setCategorie(response.data);
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
  const [updateCategorie] = useUpdateCategorieMutation();

  const columns = [
    {
      field: "categoryName",
      headerName: "Categorie",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
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
    window.location.href = `/${userName}/categories/edit/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      const thisCategorie = Categorie.find((c) => c._id === id)
      if(thisCategorie) {
        thisCategorie.active = false
        await updateCategorie({id, categorie: thisCategorie})
      }
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="CATEGORY" subtitle="Liste de categories" />
        <Link to={`/${userName}/categories/new`}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Ajoute de catégorie
          </Button>
        </Link>
      </FlexBetween>

      <Box
        mt="40px"
        height="75vh"
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
          loading={isLoading }
          getRowId={(row) => row._id}
          rows={Categorie|| []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Categories;
