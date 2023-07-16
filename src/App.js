import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from "./scenes/global/topbar";
import  Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/sidebar";

/*
import { Users } from "./scenes/users";
import { Programs } from "./scenes/programs";
*/
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/users" element={<Users />} /> */}
              {/* <Route path="/programs" element={<Programs />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
