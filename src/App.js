import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Programs from "./scenes/programs";
import Periods from "./scenes/periods";
import Login from "./scenes/login";
import Users from "./scenes/users";
import { AuthProvider } from "./context/authProvider";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  console.log(auth);
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/periods" element={<Periods />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
