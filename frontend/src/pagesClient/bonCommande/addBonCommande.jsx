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
  Grid,
} from "@mui/material";
import Header from "componentsAdmin/Header";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useGetProductsQuery, useGetAllTaxEntrepriseQuery, useGetFournisseursQuery, useAddBonCommandeMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const AddBonCommande = () => {
  const navigate = useNavigate();

  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const theme = useTheme();
  const id = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [bonCommande, setBonCommande] = useState({
    userId: localStorage.getItem("userId") || "",
    fournisseurId: "",
    dueDate: new Date().toISOString().split('T')[0], // Formatted date for the date input
    items: [{ productId: "", quantity: 0 }],
    taxes: [{ taxId: "" }],
    amount: 0,
  });
  const [addBonCommande] = useAddBonCommandeMutation();
  const { data: fournisseursData } = useGetFournisseursQuery(id);
  const { data: productsData } = useGetProductsQuery(id);
  const { data: taxData } = useGetAllTaxEntrepriseQuery(id);

  const handleChange = (e) => {
    setBonCommande({ ...bonCommande, [e.target.name]: e.target.value });
  };

  const handleProductAdd = () => {
    setBonCommande({
      ...bonCommande,
      items: [...bonCommande.items, { productId: "", quantity: 0 }],
    });
  };

  const handleTaxAdd = () => {
    setBonCommande({
      ...bonCommande,
      taxes: [...bonCommande.taxes, { taxId: "" }],
    });
  };

  const handleProductChange = (index, productId) => {
    const updatedItems = [...bonCommande.items];
    updatedItems[index].productId = productId;
    setBonCommande({ ...bonCommande, items: updatedItems });
  };

  const handleTaxChange = (index, taxId) => {
    const updatedTaxes = [...bonCommande.taxes];
    updatedTaxes[index].taxId = taxId;
    setBonCommande({ ...bonCommande, taxes: updatedTaxes });
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...bonCommande.items];
    updatedItems[index].quantity = parseInt(quantity);
    setBonCommande({ ...bonCommande, items: updatedItems });
  };

  const handleFournisseurChange = (event) => {
    setBonCommande({ ...bonCommande, fournisseurId: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let amount = bonCommande.items.reduce(
        (acc, item) => {
          const product = productsData.find((product) => product._id === item.productId);
          return acc + (product ? product.price * item.quantity : 0);
        },
        0
      );
      console.log("amount : ", amount);
      const taxes = bonCommande.taxes.reduce(
        (acc, item) => {
          const tax = taxData.find((taxe) => taxe._id === item.taxId);
          return acc + (tax ? tax.TaksValleur : 0);
        },
        0
      );
      console.log('taxes : ', taxes);
      amount = amount * (1 + taxes / 100);
      console.log('final amount : ', amount);
      await addBonCommande({ bonCommande: { ...bonCommande, amount } });
      console.log(bonCommande);
      navigate(`/${userName}/bon-commandes`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="AJOUTER DES BON DE COMMANDE" subtitle="Ajout d'une nouvelle bon de commande" />
      <Box m="1.5rem auto" fullWidth border={`2px solid ${theme.palette.primary.main}`} borderRadius="0.5rem" p="1rem">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Date d'échéance"
                name="dueDate"
                type="date"
                value={bonCommande.dueDate}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="fournisseur-label">Sélectionnez Un Fournisseur</InputLabel>
                <Select
                  labelId="fournisseur-label"
                  id="fournisseur-select"
                  value={bonCommande.fournisseurId}
                  onChange={handleFournisseurChange}
                  fullWidth
                  required
                >
                  {fournisseursData &&
                    fournisseursData.map((fournisseur) => (
                      <MenuItem key={fournisseur._id} value={fournisseur._id}>
                        {fournisseur.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleProductAdd}
                startIcon={<AddShoppingCartIcon />}
                fullWidth
              >
                Ajouter produit
              </Button>
            </Grid>
            {bonCommande.items.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id={`product-label-${index}`}>Vos Produits</InputLabel>
                    <Select
                      labelId={`product-label-${index}`}
                      id={`product-select-${index}`}
                      value={item.productId}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      fullWidth
                      required
                    >
                      {productsData &&
                        productsData.map((product) => (
                          <MenuItem key={product._id} value={product._id}>
                            {product.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Quantité"
                    name={`quantity-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                  />
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleTaxAdd}
                startIcon={<AddShoppingCartIcon />}
                fullWidth
              >
                Ajouter de tax
              </Button>
            </Grid>
            {bonCommande.taxes.map((tax, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id={`tax-label-${index}`}>Vos Taxes</InputLabel>
                    <Select
                      labelId={`tax-label-${index}`}
                      id={`tax-select-${index}`}
                      value={tax.taxId}
                      onChange={(e) => handleTaxChange(index, e.target.value)}
                      fullWidth
                      required
                    >
                      {taxData &&
                        taxData.map((taxe) => (
                          <MenuItem key={taxe._id} value={taxe._id}>
                            {taxe.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Ajouter le bon de commande
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddBonCommande;
