import React, { useState } from "react";
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
import { useGetAllCategoriesQuery, useAddProduitMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const AddProduit = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const theme = useTheme();
  const [produit, setProduit] = useState({
    userId: localStorage.getItem("userId") || "",
    categoryId: "",
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  });
  const [AddProduit] = useAddProduitMutation();
  const { data: categorieData } = useGetAllCategoriesQuery();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit({ ...produit, [name]: name === "quantity" || name === "price" ? parseFloat(value) : value });
  };

  const handleCategoryChange = (event) => {
    setProduit({ ...produit, categoryId: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(produit);
      await AddProduit({ produit });
      Navigate("/produits");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADD PRODUCT" subtitle="Ajout d'un nouveau produit" />
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
          label="Quantity"
          name="quantity"
          type="number"
          value={produit.quantity}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        {/* // <FormControl fullWidth margin="normal">
         //   <InputLabel id="categies-label">Categorie</InputLabel>
        //   <Select 
        //     labelId="categies-label"
        //     id="categieId"
        //     value={produit.categoryId}
        //     onChange={handleChange}
        //     renderValue={(selected) => (
        //       <div style={{ display: "flex", flexWrap: "wrap" }}>
        //         {selected.map((categoryId) => (
        //           <Chip
        //             key={categoryId}
        //             label={
        //               categorieData.find(
        //                 (category) => category._id === categoryId
        //               )?.categoryName
        //             }
        //           />
        //         ))}
        //       </div>
        //     )}
        //   >
        //     {categorieData &&
        //       categorieData.map((category) => (
        //         <MenuItem key={category._id} value={category._id}>
        //           {category.categoryName}
        //         </MenuItem>
        //       ))}
        //   </Select>
        // </FormControl> */}
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
            Add product
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduit;
