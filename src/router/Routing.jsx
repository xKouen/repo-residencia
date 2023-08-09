import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../scenes/dashboard";
import Programs from "../scenes/programs";
import Periods from "../scenes/periods";
import Login from "../scenes/login";
import Users from "../scenes/users";
import { AuthProvider } from "../context/authProvider";
import Topbar from "../components/topbar/topbar";
import Sidebar from "../components/sidebar/sidebar";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";

export const Routing = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Dashboard />
                      </main>
                    </div>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Users />
                      </main>
                    </div>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </>
            }
          />
          <Route
            path="/programs"
            element={
              <>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Programs />
                      </main>
                    </div>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </>
            }
          />
          <Route
            path="/periods"
            element={
              <>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Periods />
                      </main>
                    </div>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default Routing;
