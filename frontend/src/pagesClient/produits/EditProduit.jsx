import React, { useState, useEffect } from "react";
import {
  TextField,
  useTheme,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import Header from "componentsAdmin/Header";
import { useGetAllCategoriesQuery, useUpdateProduitMutation, useGetOneProduitQuery, useRemoveProduitMutation } from "state/api";
import { useNavigate, useParams } from "react-router-dom";

const EditProduit = () => {
  const { id } = useParams();
  const { data: produitData } = useGetOneProduitQuery(id);
  const { data: categorieData } = useGetAllCategoriesQuery();
  const [produit, setProduit] = useState({
    categoryId: "",
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (produitData) {
      setProduit(produitData);
    }
  }, [produitData]);

  const theme = useTheme();
  const Navigate = useNavigate();
  const [editProduit] = useUpdateProduitMutation();
  const [removeProduit] = useRemoveProduitMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit((prevProduit) => ({
      ...prevProduit,
      [name]: name === "quantity" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleCategoryChange = (event) => {
    setProduit({ ...produit, categoryId: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await editProduit({ id, ProduitData: produit });
      Navigate("/produits");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await removeProduit(id);
      Navigate("/produits");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="EDIT PRODUCT" subtitle="Modification d'un produit" />
      <form
        onSubmit={handleSubmit}
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <TextField
          label="Nom de pack"
          name="name"
          value={produit.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={produit.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Prix"
          name="price"
          type="number"
          value={produit.price}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Quantité"
          name="quantity"
          type="number"
          value={produit.quantity}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="categories-label">Catégorie</InputLabel>
          <Select
            labelId="categories-label"
            id="category-select"
            value={produit.categoryId}
            onChange={handleCategoryChange}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selected && (
                  <Chip
                    key={selected}
                    label={
                      categorieData.find((category) => category._id === selected)?.categoryName || ""
                    }
                  />
                )}
              </div>
            )}
          >
            {categorieData &&
              categorieData.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.categoryName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Modifier le produit
          </Button>
          <Button
            onClick={handleDelete}
            aria-label="delete"
            sx={{ ml: 2 }}
            variant="contained"
            color="primary"
          >
            Supprimer le produit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditProduit;