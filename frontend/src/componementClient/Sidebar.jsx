import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/LogoImage.jpg";

const navItems = [
  {
    text: "Tableau de bord",
    title: "dashboardClient",
    icon: <HomeOutlined />,
  },
  {
    text: "Côté Client",
    title: "",
    icon: null,
  },
  {
    text: "Factures",
    title: "factures",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Produits",
    title: "produits",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Clients",
    title: "clients",
    icon: <Groups2Outlined />,
  },
  {
    text: "Ventes",
    title: "",
    icon: null,
  },
  {
    text: "Apercu",
    title: "apercu",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Quotidien",
    title: "quotidien",
    icon: <TodayOutlined />,
  },
  {
    text: "Mensuel",
    title: "mensuel",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Paramètres",
    title: "",
    icon: null,
  },
  {
    text: "Profil",
    title: "",
    icon: <AdminPanelSettingsOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                 { /*<Typography variant="h4" fontWeight="bold">
                    ECOMVISION
        </Typography>*/}
                   <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="150px"
                sx={{ objectFit: "cover" }}
              />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, title }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3.25rem", fontWeight : 'bold'}}>
                      {text}
                    </Typography>
                  );
                }
                const lcTitle = title.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcTitle}`);
                        setActive(lcTitle);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcTitle
                            ? theme.palette.secondary[400]
                            : "transparent",
                        color:
                          active === lcTitle
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color:
                            active === lcTitle
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcTitle && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;