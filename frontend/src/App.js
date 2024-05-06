import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aos from "aos";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "aos/dist/aos.css";
import WelcomePage from "components/WelcomePage";
import Register from "components/Register/Register";
import Model from "components/Modele/Model";
import Login from "components/Login/Login";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
import Pack from "pages/Pack";
import Entreprises from "pages/Entreprises";
import EnterpriseDetails from "pages/Entreprises/EntrepriseDetails";
import Services from 'pages/Services';
import AddService from "pages/Services/AddService";
import EditService from "pages/Services/EditService";
import SubscriptionPalns from "pages/SubscriptionPlan";
import Messages from "./pages/Message";
import AddPack from "pages/Pack/AddPack"
import EditPack from "pages/Pack/EditPack"
import Generateur from "components/Generator/Generateur";

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  Aos.init({
    duration: 1800,
    offset: 100,
  });
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Modeles" element={<Model />} />
        
          <Route path="/Gener" element={<Generateur/>} />
          <Route element={<LayoutWithThemeProvider theme={theme} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Pack" element={<PackWithThemeProvider theme={theme} />} />
            <Route path="/Pack/new" element={< AddPackWithThemeProvider theme={theme} />} />
            <Route path="/Pack/edit/:id" element={< EditPackWithThemeProvider theme={theme} />} />
            <Route path="/Enterprises" element={<EntreprisesWithThemeProvider theme={theme} />} />
            <Route path="/Enterprises/Details/:id" element={<EnterpriseDetailsWithThemeProvider theme={theme} />} />
            <Route path="/Services" element={<ServicesWithThemeProvider theme={theme} />} />
            <Route path="/Services/new" element={<AddServiceWithThemeProvider theme={theme} />} />
            <Route path="/Services/edit/:id" element={<EditServiceWithThemeProvider theme={theme} />} />
            <Route path="/SubscriptionsPlans" element={<SubscriptionPalnsWithThemeProvider theme={theme} />} />
            <Route path="/Messages" element={<MessagesWithThemeProvider theme={theme} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// Component that applies theme to its children
const LayoutWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout>{children}</Layout>
  </ThemeProvider>
);

// You can create similar components for other routes as well
const PackWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Pack>{children}</Pack>
  </ThemeProvider>
);

const AddPackWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AddPack>{children}</AddPack>
  </ThemeProvider>
);

const EditPackWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EditPack>{children}</EditPack>
  </ThemeProvider>
);


const EntreprisesWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Entreprises>{children}</Entreprises>
  </ThemeProvider>
);

const EnterpriseDetailsWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EnterpriseDetails>{children}</EnterpriseDetails>
  </ThemeProvider>
);

const ServicesWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Services>{children}</Services>
  </ThemeProvider>
);

const AddServiceWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AddService>{children}</AddService>
  </ThemeProvider>
);

const EditServiceWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EditService>{children}</EditService>
  </ThemeProvider>
);

const SubscriptionPalnsWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SubscriptionPalns>{children}</SubscriptionPalns>
  </ThemeProvider>
);

const MessagesWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Messages>{children}</Messages>
  </ThemeProvider>
);

export default App;