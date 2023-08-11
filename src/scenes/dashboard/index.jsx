import React from "react";
import Header from "../../components/header";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./dashboard.module.scss";

const Dashboard = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return (
      <>
        <Header title="Cargando..." />

        <div id="loader">
          <div id="d1"></div>
          <div id="d2"></div>
          <div id="d3"></div>
          <div id="d4"></div>
          <div id="d5"></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {auth._id ? (
          <Box>
            <Header title="Transparencia presupuestal" />
          </Box>
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  }
};

export default Dashboard;
