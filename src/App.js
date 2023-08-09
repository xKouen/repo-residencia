import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Programs from "./scenes/programs";
import Periods from "./scenes/periods";
import Login from "./scenes/login";
import Users from "./scenes/users";
import { AuthProvider } from "./context/authProvider";

function App() {
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
