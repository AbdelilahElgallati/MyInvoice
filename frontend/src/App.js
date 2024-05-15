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
import Services from "pages/Services";
import AddService from "pages/Services/AddService";
import EditService from "pages/Services/EditService";
import SubscriptionPalns from "pages/SubscriptionPlan";
import Messages from "./pages/Message";
import AddPack from "pages/Pack/AddPack";
import EditPack from "pages/Pack/EditPack";
import Generateur from "components/Generator/Generateur";

import DashboardClient from "pagesClient/dashboard";
import Invoices from "pagesClient/invoices";
import Products from "pagesClient/produits";
import Clients from "pagesClient/clients";

import AddInvoice from "pagesClient/invoices/addInvoice";
import AddProduct from "pagesClient/produits/addProduct";
import AddClient from "pagesClient/clients/addClient";
import EditInvoice from "pagesClient/invoices/editInvoice";
import DetailsInvoice from "pagesClient/invoices/detailsInvoice";
import PrintInvoice from "pagesClient/invoices/printInvoice";
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
import EditSubscription from "pages/SubscriptionPlan/EditSubscriptionPlan";
import DarkMode from "components/DarkMode";
import Models from "pages/Model";
import AddModel from "pages/Model/AddModel";
import EditModel from "pages/Model/EditModel";

import Fournisseurs from "pagesClient/fournisseur";
import AddFournisseur from "pagesClient/fournisseur/addFournisseur";
import EditFournisseur from "pagesClient/fournisseur/EditFournisseur";

import ForgoutPass from "components/Login/ForgoutPass";
import Apropos from "components/Apropos";
import ResetPassword from "components/Login/ResetPassword";

import BonCommandes from "pagesClient/bonCommande";
import AddBonCommande from "pagesClient/bonCommande/addBonCommande";
import EditBonCommande from "pagesClient/bonCommande/editBonCommande";
import DetailsBonCommande from "pagesClient/bonCommande/detailsBonCommande";
import PrintBonCommande from "pagesClient/bonCommande/printBonCommande";

import Devis from "pagesClient/devis";
import AddDevi from "pagesClient/devis/addDevi";
import EditDevi from "pagesClient/devis/editDevi";
import DetailsDevi from "pagesClient/devis/detailsDevi";
import PrintDevi from "pagesClient/devis/printDevi";

import BonLivraison from "pagesClient/bonLivraison";
import AddBonLivraison from "pagesClient/bonLivraison/addBonLivraison";
import EditBonLivraison from "pagesClient/bonLivraison/editBonLivraison";
import DetailsBonLivraison from "pagesClient/bonLivraison/detailsBonLivraison";
import PrintBonLivraison from "pagesClient/bonLivraison/printBonLivraison";

import Demandes from 'pages/Demande'
import AddDemande from 'pagesClient/Demande/AddDemande'

import Profil from "pagesClient/profil";

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
          <Route path="/ForgoutPass" element={<ForgoutPass />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />}/>
          <Route path="/Register" element={<Register />} />
          <Route path="/Modeles" element={<Model />} />
          <Route path="/Gener" element={<Generateur />} />
          <Route path="/pack" element={<Abonement />} />
          <Route path="/DarkMode" element={<DarkMode />} />
          <Route path="/Apropos" element={<Apropos />} />
          <Route path="/factures/imprimer/:id" element={<PrintInvoice />} />
          <Route path="/bon-commandes/imprimer/:id" element={<PrintBonCommande />} />
          <Route path="/bon-livraison/imprimer/:id" element={<PrintBonLivraison />} />
          <Route path="/devis/imprimer/:id" element={<PrintDevi />} />

          <Route element={<AddThemeProvider theme={theme} pages={Layout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/PackAdmin" element={<AddThemeProvider theme={theme} pages={Pack} />} />
            <Route path="/Pack/new" element={<AddThemeProvider theme={theme} pages={AddPack} />} />
            <Route path="/Pack/edit/:id" element={<AddThemeProvider theme={theme} pages={EditPack} />} />
            <Route path="/Enterprises" element={<AddThemeProvider theme={theme} pages={Entreprises} />}/>
            <Route path="/Enterprises/Details/:id" element={<AddThemeProvider pages={EnterpriseDetails} theme={theme} />}/>
            <Route path="/Services" element={<AddThemeProvider theme={theme} pages={Services} />}/>
            <Route path="/Services/new" element={<AddThemeProvider theme={theme} pages={AddService} />}/>
            <Route path="/Services/edit/:id" element={<AddThemeProvider theme={theme} pages={EditService} />}/>
            <Route path="/models" element={<AddThemeProvider theme={theme} pages={Models} />}/>
            <Route path="/Models/new" element={<AddThemeProvider theme={theme} pages={AddModel} />}/>
            <Route path="/Models/edit/:id" element={<AddThemeProvider theme={theme} pages={EditModel} />}/>
            <Route path="/SubscriptionsPlans" element={<AddThemeProvider theme={theme} pages={SubscriptionPalns} />}/>
            <Route path="/SubscriptionsPlans/edit/:id" element={<AddThemeProvider theme={theme} pages={EditSubscription} />}/>
            <Route path="/Messages" element={<AddThemeProvider theme={theme} pages={Messages} />}/>
            <Route path="/Demandes" element={<AddThemeProvider theme={theme} pages={Demandes} />}/>
          </Route>

          <Route element={<AddThemeProvider theme={theme} pages={LayoutClient} />}>
            {/* générale */}
            <Route path="/dashboardClient"element={  <AddThemeProvider theme={theme} pages={DashboardClient} />}/>
            <Route path="/profil" element={<AddThemeProvider theme={theme} pages={Profil} />}/>
            <Route path="/add-demande" element={<AddThemeProvider theme={theme} pages={AddDemande} />}/>
            {/* facture */}
            <Route  path="/factures" element={<AddThemeProvider theme={theme} pages={Invoices} />}/>
            <Route path="/ajouterFacture" element={<AddThemeProvider theme={theme} pages={AddInvoice} />}/>
            <Route path="/factures/edit/:id" element={<AddThemeProvider theme={theme} pages={EditInvoice} />}/>
            <Route path="/factures/details/:id" element={   <AddThemeProvider theme={theme} pages={DetailsInvoice} /> }/>
            {/* produit */}
            <Route path="/produits" element={<AddThemeProvider theme={theme} pages={Products} />}/>
            <Route path="/ajouterProduit" element={<AddThemeProvider theme={theme} pages={AddProduct} />}/>
            <Route path="/produits/edit/:id" element={<AddThemeProvider theme={theme} pages={EditProduit} />}/>
            {/* client */}
            <Route path="/clients" element={<AddThemeProvider theme={theme} pages={Clients} />}/>
            <Route path="/ajouterClient" element={<AddThemeProvider theme={theme} pages={AddClient} />}/>
            <Route path="/clients/edit/:id" element={<AddThemeProvider theme={theme} pages={EditClient} />}/>
            {/* statistique */}
            <Route path="/apercu" element={<AddThemeProvider theme={theme} pages={Overview} />}/>
            <Route path="/quotidien" element={<AddThemeProvider theme={theme} pages={Daily} />}/>
            <Route path="/mensuel" element={<AddThemeProvider theme={theme} pages={Monthly} />}/>
            {/* categorie */}
            <Route path="/categories" element={<AddThemeProvider theme={theme} pages={Categories} />}/>
            <Route path="/categories/new" element={<AddThemeProvider theme={theme} pages={AddCategorie} />}  />
            <Route path="/categories/edit/:id" element={<AddThemeProvider theme={theme} pages={EditCategorie} />}/>
            {/* fournisseur */}
            <Route path="/fournisseurs" element={<AddThemeProvider theme={theme} pages={Fournisseurs} />}/>
            <Route path="/fournisseurs/new" element={   <AddThemeProvider theme={theme} pages={AddFournisseur} /> }/>
            <Route path="/fournisseurs/edit/:id" element={   <AddThemeProvider theme={theme} pages={EditFournisseur} /> }/>
            {/* bon de commande */}
            <Route path="/bon-commandes" element={<AddThemeProvider theme={theme} pages={BonCommandes} />}/>
            <Route path="/bon-commandes/new" element={   <AddThemeProvider theme={theme} pages={AddBonCommande} /> }/>
            <Route path="/bon-commandes/edit/:id" element={   <AddThemeProvider theme={theme} pages={EditBonCommande} /> }/>
            <Route path="/bon-commandes/details/:id" element={   <AddThemeProvider theme={theme} pages={DetailsBonCommande} /> }/>
            {/* bon de livraison */}
            <Route path="/bon-livraison" element={<AddThemeProvider theme={theme} pages={BonLivraison} />}/>
            <Route path="/bon-livraison/new" element={   <AddThemeProvider theme={theme} pages={AddBonLivraison} /> }/>
            <Route path="/bon-livraison/edit/:id" element={   <AddThemeProvider theme={theme} pages={EditBonLivraison} /> }/>
            <Route path="/bon-livraison/details/:id" element={   <AddThemeProvider theme={theme} pages={DetailsBonLivraison} /> }/>
            {/* devis */}
            <Route path="/devis" element={<AddThemeProvider theme={theme} pages={Devis} />}/>
            <Route path="/devis/new" element={<AddThemeProvider theme={theme} pages={AddDevi} />}/>
            <Route path="/devis/edit/:id" element={<AddThemeProvider theme={theme} pages={EditDevi} />}/>
            <Route path="/devis/details/:id" element={<AddThemeProvider theme={theme} pages={DetailsDevi} />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const AddThemeProvider = ({ theme, children, pages }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {React.createElement(pages, null, children)}
  </ThemeProvider>
);

export default App;