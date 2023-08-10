import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const Periods = () => {
  const { auth } = useAuth();
  return <>{auth._id ? <div>Periodos</div> : <Navigate to="/login" />}</>;
};

export default Periods;
