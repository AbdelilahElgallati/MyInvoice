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
import Header from "components/Header";
import { useGetPacksQuery } from "state/api";

const Pack = ({
  _id,
  name,
  description,
  services,
  price,
  startDate,
  endDate,
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
      <Header title="PACKS" subtitle="Liste de packs." />
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