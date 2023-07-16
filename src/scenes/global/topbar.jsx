import { Box, Icon, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <div style={{ backgroundColor: theme.palette.mode === "light" ? "rgba(128, 128, 128, 0.5)" : "rgba(0, 0, 0, 0.5)" }}>
      {/* Topbar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        {/* SEARCH BAR */}
        <Box display="flex" alignItems="center" flex={1} p={2}>
          {/* Imagen con borde redondeado */}
          <Box
            display="inline-block"
            borderRadius="50%"
            overflow="hidden"
            width="50px"
            height="50px"
            mr={1}
          >
            <img
              alt="ahomeeee"
              src="../../assets/ahomeeee.jpg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          {/* Texto "Ayuntamiento" */}
          <Typography variant="h6" color={theme.palette.mode === "light" ? "black" : "white"} fontWeight="bold" fontSize="24px">
            Ayuntamiento
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          width="400px" 
        >
          <Box
            display="flex"
            backgroundColor={theme.palette.mode === "light" ? "white" : colors.primary[400]}
            borderRadius="15px"
            sx={{
              border: theme.palette.mode === "light" ? "1px solid gray" : "none",
            }}
          >
            <InputBase
              sx={{
                flex: 1,
                pl: 1,
                color: theme.palette.mode === "light" ? "black" : "white",
              }}
              placeholder="Buscar elemento..."
            />
            <IconButton sx={{ p: 1, color: theme.palette.mode === "light" ? "black" : "white" }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* ICON BUTTONS */}
          <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode} sx={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
              {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <IconButton sx={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton sx={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
              <SettingsIcon />
            </IconButton>
            <IconButton sx={{ color: theme.palette.mode === "light" ? "black" : "white" }}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Topbar;
