import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField,Input,useTheme,Button,Box,FormControl,InputLabel,Select,MenuItem,Chip} from "@mui/material";
import Header from "componentsAdmin/Header";
import {useGetAllServicesQuery, useGetOnePackQuery, useRemovePackMutation, useUpdatePackMutation } from "state/api";
import { toast } from "react-toastify";

const EditPack = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const theme = useTheme();
  const [logo, setLogo] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);
  const [price, setPrice] = useState(0);
  const { id } = useParams();
  const { data: packData } = useGetOnePackQuery(id);
  const [updatePack] = useUpdatePackMutation();
  const [removePack] = useRemovePackMutation();
  const { data: serviceData } = useGetAllServicesQuery();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogo(reader.result);
    };
  };

  useEffect(() => {
    if (packData) {
      setName(packData.name);
      setDescription(packData.description);
      setPrice(packData.price);
      setServices(packData.services.map(service => service.serviceId));
      setLogo({
        public_id: packData.logo.public_id,
        url: packData.logo.url
      });
    }
  }, [packData]);

  const handleServiceChange = (event) => {
    setServices(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedServices = services.map(serviceId => ({ serviceId }));
    const pack = {
      name,
      description,
      price,
      services: formattedServices,
      logo: logo.length > 0 ? logo : "",
    };
    try {
      const { data } = await updatePack({ id, pack });
      if (data.success) {
        toast.success("La modification de pack se passe correctement");
        navigate("/packadmin");
      } else {
        toast.error(
          "La modification de pack ne s'est pas passé correctement : " +
            data.message
        );
      }
    } catch (error) {
      toast.error("Erreur lors de la modification de pack : " + error.message);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Prix"
          name="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
            value={services}
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
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="icon-input">Icon</InputLabel>
          <Input
            id="icon-input"
            type="file"
            name="logo"
            onChange={handleImage}
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