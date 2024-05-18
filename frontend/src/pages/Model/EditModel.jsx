import React, { useState, useEffect } from "react";
import { TextField, useTheme, Button, Box, FormControl, InputLabel, Input } from "@mui/material";
import Header from "componentsAdmin/Header";
import { useGetOneModelQuery, useUpdateModelMutation, useRemoveModelMutation } from "state/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditModel = () => {
  const navigate = useNavigate()
  if(!localStorage.getItem('userId')) {
    navigate('/');
  }
  const theme = useTheme();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState([]);
  const {id} = useParams();
  const {data: model} = useGetOneModelQuery(id);
  const [updateModel] = useUpdateModelMutation();
  const [removeModel] = useRemoveModelMutation();
  const Navigate = useNavigate();

  useEffect(() => {
    if (model) {
      setName(model.name)
      setDescription(model.description)
      setIcon(model.icon)
    }
  }, [model]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIcon(reader.result);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const model = {
      name,
      description,
      icon,
    };
    try {
      const { data } = await updateModel({ id, model });
      if (data.success) {
        toast.success("La modification de model se passe correctement");
        Navigate("/models");
      } else {
        toast.error(
          "La modification de model ne s'est pas passé correctement : " + data.error
        );
      }
    } catch (error) {
      toast.error("Erreur lors de la modification de model : " + error.message);
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await removeModel(id);
      navigate("/models");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADD MODELS" subtitle="Ajout d'un nouveau model" />
      <form onSubmit={handleSubmit} sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }} >
        <TextField
          label="Nom de model"
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
        <FormControl fullWidth margin="normal" >
          <InputLabel htmlFor="icon-input" >Icon</InputLabel>
          <Input
            id="icon-input"
            type="file"
            name="icon"
            onChange={handleImage}
            accept="image/*"
          />
        </FormControl>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Edit model
          </Button>
          <Button type="button" onClick={handleDelete} aria-label="delete" sx={{ ml: 2 }} variant="contained" color="primary">
            Supprimer le model
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditModel;
