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
  useGetEntrepriseDetailQuery,
  useUpdateEntrepriseMutation,
  useChangePasswordEntrepriseMutation,
} from "state/api";
import Header from "componentsAdmin/Header";

const Profil = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("userId")) {
    navigate("/");
  }
  const id = localStorage.getItem("userId");
  const theme = useTheme();
  const [enterpriseDetails, setEnterpriseDetails] = useState(null);
  const [changePassword] = useChangePasswordEntrepriseMutation(id);
  const [enterpriseMotPasse, setEnterpriseMotPasse] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [logo, setLogo] = useState(null);
  const [updateEntreprise] = useUpdateEntrepriseMutation();
  // hadi
  const { data, isLoading } = useGetEntrepriseDetailQuery(
    localStorage.getItem("userId")
  );

  useEffect(() => {
    if (data) {
      setEnterpriseDetails(data);
    }
  }, [data]);

  if (isLoading || !enterpriseDetails) {
    return <Typography>Loading...</Typography>;
  }

  const handleFieldChange = (field, value) => {
    setEnterpriseDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleFieldPasswordChange = (field, value) => {
    setEnterpriseMotPasse((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    console.log("Détails de l'entreprise modifiés :", enterpriseDetails);
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", enterpriseDetails.name);
      formData.append("email", enterpriseDetails.email);
      formData.append("phone", enterpriseDetails.phone);
      formData.append("address", enterpriseDetails.address);
      if (logo) {
        formData.append("logo", logo);
      }
      const id = localStorage.getItem("userId");
      await updateEntreprise({ id, entreprise: formData });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChangePassword = (event) => {
  //   event.preventDefault();
  
  //   console.log("Mot de passe de l'entreprise modifié :", enterpriseMotPasse);
  //   try {
  //     if (
  //       enterpriseMotPasse.newPassword === enterpriseMotPasse.confirmPassword
  //     ) {
  //       console.log(enterpriseMotPasse)
  //       const res = changePassword({ id, enterpriseMotPasse : enterpriseMotPasse });
  //       console.log(res)
  //       if (res.data.message === "Password changed successfully") {
  //         localStorage.removeItem("userId");
  //         localStorage.removeItem("token");
  //         navigate("/");
  //       } else {
  //         console.log("message : ", res.data.message);
  //       }
  //     } else {
  //       console.log("Passwords don't match");
  //     }
  //   } catch (err) {
  //     console.log("err : ", err);
  //   }
  // };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    console.log("Mot de passe de l'entreprise modifié :", enterpriseMotPasse);
    try {
      if (enterpriseMotPasse.newPassword === enterpriseMotPasse.confirmPassword) {
        const { data, error } = await changePassword({ id, enterpriseMotPasse: enterpriseMotPasse });
        if (data) {
          console.log("Message :", data.message);
          if (data.message === "Password changed successfully") {
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            navigate("/");
          } else {
            console.log("Message :", data.message);
          }
        } else if (error) {
          console.log("Erreur :", error);
        }
      } else {
        console.log("Passwords don't match");
      }
    } catch (err) {
      console.log("Erreur :", err);
    }
  };
  

  const handleIconChange = (e) => {
    setLogo(e.target.files[0]);
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
