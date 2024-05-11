import React, { useState, useEffect } from "react";
import {
  TextField,
  Input,
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
import {
  useGetAllServicesQuery,
  useGetOnePackQuery,
  useRemovePackMutation,
  useUpdatePackMutation,
} from "state/api";
import { useNavigate, useParams } from "react-router-dom";

const EditPack = () => {
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();
  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const theme = useTheme();
  const [pack, setPack] = useState({
    name: "",
    description: "",
    services: [],
    price: 0,
    startDate: "",
    endDate: "",
  });
  const { id } = useParams();
  const { data: packData } = useGetOnePackQuery(id);
  const [updatePack] = useUpdatePackMutation();
  const [removePack] = useRemovePackMutation();
  const { data: serviceData } = useGetAllServicesQuery();

  const handleIconChange = (e) => {
    setLogo(e.target.files[0]);
  };

  useEffect(() => {
    if (packData) {
      const formattedStartDate = formatDate(packData.startDate);
      const formattedEndDate = formatDate(packData.endDate);
      setPack({
        name: packData.name || "",
        description: packData.description || "",
        services: packData.services.map((service) => service.serviceId) || [],
        price: packData.price || 0,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }
  }, [packData]);

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
      const formData = new FormData();
      formData.append("name", pack.name);
      formData.append("description", pack.description);
      formData.append("price", pack.price);
      formData.append("startDate", pack.startDate);
      formData.append("endDate", pack.endDate);
      const serviceObjects = pack.services.map((serviceId) => ({ serviceId }));
      formData.append("services", JSON.stringify(serviceObjects));
      if (logo) {
        formData.append("logo", logo);
      }
      await updatePack({ id, pack: formData });
      navigate("/packadmin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await removePack(id);
      navigate("/packadmin");
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="EDIT PACK" subtitle="Modification de pack" />
      <form
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
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
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selected.map((serviceId) => {
                  const selectedService = serviceData?.find(
                    (service) => service._id === serviceId
                  );
                  return (
                    <Chip
                      key={serviceId}
                      label={
                        selectedService
                          ? selectedService.ServiceName
                          : "Service introuvable"
                      }
                    />
                  );
                })}
              </div>
            )}
          >
            {serviceData &&
              serviceData.map((service) => (
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
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="icon-input">Icon</InputLabel>
          <Input
            id="icon-input"
            type="file"
            name="logo"
            onChange={handleIconChange}
            accept="image/*"
          />
        </FormControl>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Modifier le pack
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            aria-label="delete"
            sx={{ ml: 2 }}
            variant="contained"
            color="primary"
          >
            Supprimer le pack
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditPack;
