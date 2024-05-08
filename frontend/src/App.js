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

import DashboardClient from "pagesClient/dashboard";
import Invoices from 'pagesClient/invoices'
import Products from "pagesClient/produits";
import Clients from "pagesClient/clients";

import AddInvoice from "pagesClient/invoices/addInvoice";
import AddProduct from "pagesClient/produits/addProduct";
import AddClient from "pagesClient/clients/addClient";

import Overview from "pagesClient/overview";
import Daily from "pagesClient/daily";
import Monthly from "pagesClient/monthly";
import LayoutClient from "pagesClient/layout";
import Abonement from "components/Pack/Abonement";
import EditProduit from "pagesClient/produits/EditProduit";
import EditClient from "pagesClient/clients/EditClient";
import Categories from "pagesClient/categorie";
import AddCategorie from "pagesClient/categorie/addCategorie";
import EditCategorie from "pagesClient/categorie/EditCategorie";
import EditSubscription from "pages/SubscriptionPlan/EditSubscriptionPlan"
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
          <Route path="/pack" element={<Abonement/>} />
          <Route element={<LayoutWithThemeProvider theme={theme} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/PackAdmin" element={<PackWithThemeProvider theme={theme} />} />
            <Route path="/Pack/new" element={< AddPackWithThemeProvider theme={theme} />} />
            <Route path="/Pack/edit/:id" element={< EditPackWithThemeProvider theme={theme} />} />
            <Route path="/Enterprises" element={<EntreprisesWithThemeProvider theme={theme} />} />
            <Route path="/Enterprises/Details/:id" element={<EnterpriseDetailsWithThemeProvider theme={theme} />} />
            <Route path="/Services" element={<ServicesWithThemeProvider theme={theme} />} />
            <Route path="/Services/new" element={<AddServiceWithThemeProvider theme={theme} />} />
            <Route path="/Services/edit/:id" element={<EditServiceWithThemeProvider theme={theme} />} />
            <Route path="/SubscriptionsPlans" element={<SubscriptionPalnsWithThemeProvider theme={theme} />} />
            <Route path="/SubscriptionsPlans/edit/:id" element={<EditSubscriptionPalnsWithThemeProvider theme={theme} />} />
            <Route path="/Messages" element={<MessagesWithThemeProvider theme={theme} />} />
          </Route>

          <Route element={<LayoutClientWithThemeProvider theme={theme} />}>
            <Route path="/dashboardClient" element={<DachboardClientWithThemeProvider theme={theme} />} />
            <Route path="/factures" element={<InvoiceWithThemeProvider theme={theme} />} />
            <Route path="/produits" element={<ProductWithThemeProvider theme={theme} />} />
            <Route path="/produits/edit/:id" element={<EditProductWithThemeProvider theme={theme} />} />
            <Route path="/clients" element={<ClientsWithThemeProvider theme={theme} />} />
            <Route path="/clients/edit/:id" element={<EditClientsWithThemeProvider theme={theme} />} />
            <Route path="/apercu" element={<ApercuWithThemeProvider theme={theme} />} />
            <Route path="/quotidien" element={<QuotidienWithThemeProvider theme={theme} />} />
            <Route path="/mensuel" element={<MensuelWithThemeProvider theme={theme} />} />
            <Route path="/ajouterFacture" element={<AddInvoiceWithThemeProvider theme={theme} />} />
            <Route path="/ajouterProduit" element={<AddProductWithThemeProvider theme={theme} />} />
            <Route path="/ajouterClient" element={<AddClientWithThemeProvider theme={theme} />} />
            <Route path="/categories" element={<CategoriesWithThemeProvider theme={theme} />} />
            <Route path="/categories/new" element={<NewCategoriesWithThemeProvider theme={theme} />} />
            <Route path="/categories/edit/:id" element={<EditCategoriesWithThemeProvider theme={theme} />} />
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


const CategoriesWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Categories>{children}</Categories>
  </ThemeProvider>
);

const NewCategoriesWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AddCategorie>{children}</AddCategorie>
  </ThemeProvider>
);

const EditCategoriesWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EditCategorie>{children}</EditCategorie>
  </ThemeProvider>
);

const LayoutClientWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LayoutClient>{children}</LayoutClient>
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

const EditSubscriptionPalnsWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EditSubscription>{children}</EditSubscription>
  </ThemeProvider>
);

const MessagesWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Messages>{children}</Messages>
  </ThemeProvider>
);


// Entreprise

const DachboardClientWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <DashboardClient>{children}</DashboardClient>
  </ThemeProvider>
);

const InvoiceWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Invoices>{children}</Invoices>
  </ThemeProvider>
);

const ProductWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Products>{children}</Products>
  </ThemeProvider>
);

const EditProductWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EditProduit>{children}</EditProduit>
  </ThemeProvider>
);

const ClientsWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Clients>{children}</Clients>
  </ThemeProvider>
);

const EditClientsWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <EditClient>{children}</EditClient>
  </ThemeProvider>
);


const ApercuWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Overview>{children}</Overview>
  </ThemeProvider>
);

const QuotidienWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Daily>{children}</Daily>
  </ThemeProvider>
);

const MensuelWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Monthly>{children}</Monthly>
  </ThemeProvider>
);

const AddInvoiceWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AddInvoice>{children}</AddInvoice>
  </ThemeProvider>
);

const AddProductWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AddProduct>{children}</AddProduct>
  </ThemeProvider>
);

const AddClientWithThemeProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AddClient>{children}</AddClient>
  </ThemeProvider>
);
export default App;