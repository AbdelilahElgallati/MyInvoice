import React, { useState } from "react";
import { TextField, useTheme, Button, Box } from "@mui/material";
import Header from "componentsAdmin/Header";
import { useAddTaksMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const navigate = useNavigate()
  if(!localStorage.getItem('userId')) {
    navigate('/');
  }
  const theme = useTheme();
  const [Taks, setTaks] = useState({
    userId: localStorage.getItem("userId") || "",
    TaksValleur : 0,
  });
  const [addTaks] = useAddTaksMutation();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setTaks({ ...Taks, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(Taks);
      await addTaks({ Taks });
      Navigate("/Taks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
    <Header title="ADD SERVICES" subtitle="Ajout d'un nouveau pack" />
    <form onSubmit={handleSubmit} sx={{
      backgroundImage: "none",
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.55rem",
    }} >
      <TextField
        label="Taks Valleur"
        name="TaksValleur"
        value={Taks.TaksValleur} // Update this to use the correct state
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        type="number" // Ensure the input is a number
      />
      
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Add Taks
        </Button>
      </Box>
    </form>
  </Box>
  
  );
};

export default AddClient;

