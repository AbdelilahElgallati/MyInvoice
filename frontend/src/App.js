// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { themeSettings } from "./theme";
// import { useSelector } from "react-redux";
// import { useMemo } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/dashboard";
// import Layout from "./pages/layout";
// import Pack from "./pages/Subscriptions";
// import Enterprises from "./pages/Entreprises";
// import Services from "./pages/Services";
// import SubscriptionPalns from "pages/SubscriptionPlan";
// import Messages from "pages/Message";
// import AddService from "pages/Services/AddService";
// import EditService from "pages/Services/EditService";
// import EnterpriseDetails from "pages/Entreprises/EntrepriseDetails";
// import Login from "components/Login/Login";
// import WelcomePage from "components/WelcomePage";
// import Register from "./components/Register/Register";
// import Model from "./components/Modele/Model";

// function App() {
//   const mode = useSelector((state) => state.global.mode);
//   const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
//   return (
//     <div className="app">
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Routes>
//             <Route path="/" element={<WelcomePage />} />
//             <Route path="/Login" element={<Login />} />
//             <Route path="/Register" element={<Register />} />
//             <Route path="/Modeles" element={<Model />} />
//             <Route element={<Layout />}>
//               {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}

//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/Subscriptions" element={<Pack />} />
//               <Route path="/Enterprises" element={<Enterprises />} />
//               <Route
//                 path="/Enterprises/Details/:id"
//                 element={<EnterpriseDetails />}
//               />
//               <Route path="/Services" element={<Services />} />
//               <Route path="/Services/new" element={<AddService />} />
//               <Route path="/Services/edit/:id" element={<EditService />} />
//               <Route
//                 path="/SubscriptionsPlans"
//                 element={<SubscriptionPalns />}
//               />
//               <Route path="/Messages" element={<Messages />} />
//             </Route>
//           </Routes>
//         </ThemeProvider>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// ---------------------------------------------------------------------------------

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Layout from "./pages/layout";
import Pack from "./pages/Subscriptions";
import Enterprises from "./pages/Entreprises";
import Services from "./pages/Services";
import SubscriptionPalns from "pages/SubscriptionPlan";
import Messages from "pages/Message";
import AddService from "pages/Services/AddService";
import EditService from "pages/Services/EditService";
import EnterpriseDetails from "pages/Entreprises/EntrepriseDetails";
import Login from "components/Login/Login";
import WelcomePage from "components/WelcomePage";
import Register from "./components/Register/Register";
import Model from "./components/Modele/Model";
import Header from "./components/Header"; // Importez le Header ici

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes />} />
          <Route path="/dashboard/*" element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function PublicRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Modeles" element={<Model />} />
      </Routes>
    </>
  );
}

function PrivateRoutes() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Subscriptions" element={<Pack />} />
          <Route path="/Enterprises" element={<Enterprises />} />
          <Route
            path="/Enterprises/Details/:id"
            element={<EnterpriseDetails />}
          />
          <Route path="/Services" element={<Services />} />
          <Route path="/Services/new" element={<AddService />} />
          <Route path="/Services/edit/:id" element={<EditService />} />
          <Route path="/SubscriptionsPlans" element={<SubscriptionPalns />} />
          <Route path="/Messages" element={<Messages />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
