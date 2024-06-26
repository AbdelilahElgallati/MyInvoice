// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardActions,
//   CardContent,
//   Collapse,
//   Button,
//   Typography,
//   useTheme,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
// } from "@mui/material";
// import Header from "componentsAdmin/Header";
// import { Link } from "react-router-dom";
// import FlexBetween from "componentsAdmin/FlexBetween";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useUpdatePackMutation } from "state/api";

// const Pack = ({
//   _id,
//   name,
//   description,
//   services,
//   price,
//   startDate,
//   endDate,
// }) => {
//   const navigate = useNavigate();
//   if (!localStorage.getItem("userId")) {
//     navigate("/");
//   }
//   const theme = useTheme();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [updatePack] = useUpdatePackMutation();
//   const handleDelete = async (id) => {
//     try {
//       const thisPack = packs.find((pack) => pack._id === id);
//       if (thisPack) {
//         thisPack.active = false;
//         await updatePack({ id, PackData: thisPack });
//         // Mettre à jour l'état avec une nouvelle copie du tableau packs sans le pack supprimé
//         setPacks(packs.filter((pack) => pack._id !== id));
//       }
//       // window.location.reload(); // Vous n'avez pas besoin de recharger la page ici
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Card
//       sx={{
//         backgroundImage: "none",
//         backgroundColor: theme.palette.background.alt,
//         borderRadius: "0.55rem",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h5" component="div">
//           {name}
//         </Typography>
//         <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
//           ${Number(price).toFixed(2)}
//         </Typography>
//         <Typography variant="body2">{description}</Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           variant="primary"
//           size="small"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           See More
//         </Button>
//         <Button
//           variant="primary"
//           size="small"
//           onClick={() => (window.location.href = `/Pack/edit/${_id}`)}
//         >
//           Update
//         </Button>
//         <Button
//           variant="primary"
//           size="small"
//           onClick={() => handleDelete(_id)}
//         >
//           Delete
//         </Button>
//       </CardActions>
//       <Collapse
//         in={isExpanded}
//         timeout="auto"
//         unmountOnExit
//         sx={{
//           color: theme.palette.neutral[300],
//         }}
//       >
//         <CardContent>
//           <Typography>Services:</Typography>
//           <List dense>
//             {services.map((service, index) => (
//               <ListItem key={index}>
//                 <ListItemText primary={service.serviceId.ServiceName} />
//               </ListItem>
//             ))}
//           </List>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// };

// const Packs = () => {
  
//   const [packs, setPacks] = useState([]);
//   // hadi
//   useEffect(() => {
//     const fetchPacks = async () => {
//       try {
//         const response = await axios.get("https://my-invoice-api.vercel.app/Pack/");
//         setPacks(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchPacks();
//   }, []);
//   const isNonMobile = useMediaQuery("(min-width: 1000px)");
 

//   return (
//     <Box m="1.5rem 2.5rem">
//       <FlexBetween>
//         <Header title="PACKS" subtitle="Liste de packs." />
//         <Link to="/Pack/new">
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AddOutlinedIcon />}
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Add
//           </Button>
//         </Link>
//       </FlexBetween>
//       {packs.length > 0 ? (
//         <Box
//           mt="20px"
//           display="grid"
//           gridTemplateColumns="repeat(3, minmax(0, 1fr))"
//           justifyContent="space-between"
//           rowGap="20px"
//           columnGap="1.33%"
//           sx={{
//             "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//           }}
//         >
//           {packs.map(
//             ({
//               _id,
//               name,
//               description,
//               services,
//               price,
//             }) => (
//               <Pack
//                 key={_id}
//                 _id={_id}
//                 name={name}
//                 description={description}
//                 price={price}
//                 services={services}
//               />
//             )
//           )}
//         </Box>
//       ) : (
//         <>Loading...</>
//       )}
//     </Box>
//   );
// };

// export default Packs;

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import Header from "componentsAdmin/Header";
import { Link } from "react-router-dom";
import FlexBetween from "componentsAdmin/FlexBetween";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUpdatePackMutation } from "state/api";

const Pack = ({
  _id,
  name,
  description,
  services,
  price,
  startDate,
  endDate,
  handleDelete, // Passer la fonction de suppression en tant que prop
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <Button
          variant="primary"
          size="small"
          component={Link}
          to={`/Pack/edit/${_id}`}
        >
          Update
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={() => handleDelete(_id)} // Utiliser la fonction de suppression
        >
          Delete
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Services:</Typography>
          <List dense>
            {services.map((service, index) => (
              <ListItem key={index}>
                <ListItemText primary={service.serviceId.ServiceName} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Packs = () => {
  const [packs, setPacks] = useState([]);
  // const navigate = useNavigate();
  const [updatePack] = useUpdatePackMutation();

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await axios.get("https://my-invoice-api.vercel.app/Pack/");
        setPacks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPacks();
  }, []);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const handleDelete = async (id) => {
    try {
      const thisPack = packs.find((pack) => pack._id === id);
      if (thisPack) {
        thisPack.active = false;
        await updatePack({ id, pack: thisPack });
        // Mettre à jour l'état avec une nouvelle copie du tableau packs sans le pack supprimé
        setPacks(packs.filter((pack) => pack._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="PACKS" subtitle="Liste de packs." />
        <Link to="/Pack/new">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Link>
      </FlexBetween>
      {packs.length > 0 ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {packs.map(
            ({
              _id,
              name,
              description,
              services,
              price,
            }) => (
              <Pack
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                services={services}
                handleDelete={handleDelete} // Passer la fonction de suppression
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Packs;

