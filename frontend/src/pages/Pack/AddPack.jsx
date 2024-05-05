import React, { useState } from "react";
import { TextField, useTheme, Button, Box, FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";
import Header from "componentsAdmin/Header";
import {  useGetAllServicesQuery, useAddPackMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const AddPack = () => {
  const theme = useTheme();
  const [pack, setPack] = useState({
    name: "",
    description: "",
    services: [],
    price: 0,
    startDate: new Date(),
    endDate: null,
  });
  const [addPack] = useAddPackMutation();
  const { data: servicesData } = useGetAllServicesQuery();
  const Navigate = useNavigate();

  const handleChange = (e) => {
    setPack({ ...pack, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (event) => {
    const selectedServices = event.target.value;
    setPack({ ...pack, services: selectedServices });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(pack);
      await addPack({ pack });
      Navigate("/Pack");
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
          label="Nom de pack"
          name="name"
          value={pack.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={pack.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Prix"
          name="price"
          type="number"
          value={pack.price}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="services-label">Services</InputLabel>
          <Select
            labelId="services-label"
            id="services"
            multiple
            value={pack.services}
            onChange={handleServiceChange}
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected.map((serviceId) => (
                  <Chip key={serviceId} label={servicesData.find(service => service._id === serviceId)?.ServiceName} />
                ))}
              </div>
            )}
          >
            {servicesData && servicesData.map((service) => (
              <MenuItem key={service._id} value={service._id}>
                {service.ServiceName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date de début"
          name="startDate"
          type="date"
          value={pack.startDate}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Date de fin"
          name="endDate"
          type="date"
          value={pack.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Add pack
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPack;
