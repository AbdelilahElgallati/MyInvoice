import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Avatar,
  Input,
} from "@mui/material";
import {
  useGetPacksQuery,
  useAddDemandeMutation,
} from "state/api";
import Header from "componentsAdmin/Header";

const Profil = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const id = localStorage.getItem("userId");
  const theme = useTheme();
  const [AddDemande] = useAddDemandeMutation();
  const [pack, setPack] = useState(null);
  const [demande, setDemande] = useState({
    userId: id,
    packId: "",
    nombreAnnee: "",
    status: "en attent",
    amount: 0,
  })
  const [enterpriseMotPasse, setEnterpriseMotPasse] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  
  // hadi
  const { data, isLoading } = useGetPacksQuery();

  useEffect(() => {
    if (data) {
      setPack(data);
    }
  }, [data]);

  

  const handleFieldChange = (field, value) => {
    setDemande((prevDemande) => ({
      ...prevDemande,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    console.log("les informations de demande :", demande);
    event.preventDefault();
    try {
      await AddDemande({ demande  });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Box m="2rem 2.5rem">
      <Header
        title="Entreprise Detail"
        subtitle="Les détails de l'entreprise"
      />
      <Typography marginTop={"20px"}>
        Les informations générale de compte
      </Typography>
      <Box
        fullWidth
        border={`1px solid ${theme.palette.primary.main}`}
        margin="normal"
        borderRadius="0.5rem"
        p="1rem"
      >
        <form
          onSubmit={handleSubmit}
          sx={{
            mt: "2rem",
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={`http://localhost:3001/Images/${enterpriseDetails.logo}`}
              alt={enterpriseDetails.name}
              sx={{ width: 70, height: 70 }}
            />
            <Box ml={2}>
              <Input
                id="icon-input"
                type="file"
                name="logo"
                fullWidth
                onChange={handleIconChange}
                accept="image/*"
              />
            </Box>
          </Box>
          <TextField
            label="Nom d'entreprise"
            variant="outlined"
            fullWidth
            value={enterpriseDetails.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email d'entreprise"
            variant="outlined"
            fullWidth
            value={enterpriseDetails.email}
            margin="normal"
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
          <TextField
            label="Numéro de téléphone d'entreprise"
            variant="outlined"
            fullWidth
            value={enterpriseDetails.phone}
            margin="normal"
            onChange={(e) => handleFieldChange("phone", e.target.value)}
          />
          <TextField
            label="Adresse d'entreprise"
            variant="outlined"
            fullWidth
            value={enterpriseDetails.address}
            margin="normal"
            onChange={(e) => handleFieldChange("address", e.target.value)}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Modifier
            </Button>
          </Box>
        </form>
      </Box>
      <Typography marginTop={"20px"}>Changement de mot de passe</Typography>
      <Box
        fullWidth
        border={`1px solid ${theme.palette.primary.main}`}
        margin="normal"
        borderRadius="0.5rem"
        p="1rem"
      >
        <form
          onSubmit={handleChangePassword}
          sx={{
            mt: "2rem",
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <TextField
            label="Mot de passe actuelle"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            margin="normal"
            onChange={(e) =>
              handleFieldPasswordChange("oldPassword", e.target.value)
            }
          />
          <TextField
            label="Nouveau mot de passe"
            variant="outlined"
            fullWidth
            name="passwordConf"
            type="password"
            margin="normal"
            onChange={(e) =>
              handleFieldPasswordChange("newPassword", e.target.value)
            }
          />
          <TextField
            label="Confirmation de mot de pass"
            variant="outlined"
            fullWidth
            name="passwordNew"
            type="password"
            margin="normal"
            onChange={(e) =>
              handleFieldPasswordChange("confirmPassword", e.target.value)
            }
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Modifier
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Profil;
