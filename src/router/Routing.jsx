import { Route, Routes } from "react-router-dom";
import Programs from "../scenes/programs";
import Periods from "../scenes/periods";
import Login from "../scenes/login/index";
import Logout from "../scenes/logout";
import Users from "../scenes/users";
import Settings from "../scenes/userSettings";
import AdminSettings from "../scenes/adminSettings";
import { AuthProvider } from "../context/authProvider";
import Topbar from "../components/topbar/topbar";
import Sidebar from "../components/sidebar/sidebar";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import PantallaDashboard from "../pantallas/dashboard/index";

export const Routing = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PantallaDashboard />} />
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
          <Route
            path="/settings"
            element={
              <>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Settings />
                      </main>
                    </div>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <>
                <ColorModeContext.Provider value={colorMode}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <AdminSettings />
                      </main>
                    </div>
                  </ThemeProvider>
                </ColorModeContext.Provider>
              </>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default Routing;
