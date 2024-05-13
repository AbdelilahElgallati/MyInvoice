import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "componentsAdmin/Navbar";
import Sidebar from "componentsAdmin/Sidebar";
import { useGetEntrepriseQuery } from 'state/api';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [entreprise, setEntreprise] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    logo: "",
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetEntrepriseQuery(userId);
  useEffect(()=>{
    if(data) {
      setEntreprise(data)
    }
  },[data])
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user = {entreprise || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar  
          user = {entreprise || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;