import React from "react";
import Header from "../../components/header";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { auth } = useAuth();
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
};

export default Dashboard;
