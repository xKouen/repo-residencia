import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from "./components/topbar/topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./components/sidebar/sidebar";
import { useState } from "react";

import Programs from "./scenes/programs";
import Users from "./scenes/users";
import Login from "./scenes/login";
import Periods from "./scenes/periods";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/periods" element={<Periods />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
