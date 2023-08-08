import React from "react";
import { Navigate, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Navigate to="/login" state={{ from: location }} />
        )
      }
    />
  );
}

export default PrivateRoute;
