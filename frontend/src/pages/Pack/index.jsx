import React, { useState } from "react";
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
import { useGetPacksQuery, useRemovePackMutation } from "state/api";
import { Link } from "react-router-dom";
import FlexBetween from "componentsAdmin/FlexBetween";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";

const Pack = ({
  _id,
  name,
  description,
  services,
  price,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate()
  if(!localStorage.getItem('userId')) {
    navigate('/');
  }
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [removePack] = useRemovePackMutation();
  const handleDelete = async (id) => {
    try {
      await removePack(id);
    } catch (error) {
      console.log(error);
    }
  };
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
          onClick={() => window.location.href = `/Pack/edit/${_id}`}
        >
          Update
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={() => handleDelete(_id)}
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
                <ListItemText
                  primary={service.serviceId.ServiceName}
                />
              </ListItem>
            ))}
          </List>
          <Typography>
            Période: {new Date(startDate).toLocaleDateString()} -{" "}
            {new Date(endDate).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};


const Packs = () => {
  const { data, isLoading} = useGetPacksQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  


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
      {data || !isLoading ? (
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
          {data.map(
            ({
              _id,
              name,
              description,
              services,
              price,
              startDate,
              endDate,
            }) => (
              <Pack
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                startDate={startDate}
                endDate={endDate}
                services={services}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
}

export default Packs;