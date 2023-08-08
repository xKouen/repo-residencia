import React, { useState, useEffect } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";

import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/header";
import "react-pro-sidebar/dist/css/styles.css";
import SelectUser from "../../components/selectUser";
import Styles from "./users.module.scss";

const User = () => {
  const [themee, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    accessLevel: "",
  });
  const [error, setError] = useState(""); // Estado para el mensaje de error en la tabla
  const [modalError, setModalError] = useState(""); // Estado para el mensaje de error en el modal
  const [mockData, setMockData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedRole, setSelectedRole] = useState("");
  useEffect(() => {
    // Carga los datos almacenados en localStorage cuando el componente se monta
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setMockData(JSON.parse(storedData));
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleChangeSelectUser = (selectedValue) => {
    setSelectedRole(selectedValue); // Actualizar el estado de "selectedRole"
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleClearFields();
    setModalError(""); // Limpiar el mensaje de error al cerrar el modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveData = () => {
    if (
      userData.name &&
      userData.phone &&
      userData.email &&
      selectedRole &&
      userData.accessLevel
    ) {
      const newUser = {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        role: selectedRole,
        accessLevel: userData.accessLevel,
      };

      setMockData((prevData) => [...prevData, newUser]);

      localStorage.setItem("userData", JSON.stringify([...mockData, newUser]));

      handleClearFields();
      handleCloseModal();
      setModalError("");
      setError("");
    } else {
      setModalError("Falta completar campos en el formulario");
    }
  };

  const handleClearFields = () => {
    setUserData({
      name: "",
      phone: "",
      email: "",
      role: "",
      accessLevel: "",
    });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "phone",
      headerName: "Numero de telefono",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Nivel de acceso",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "usuario" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themee}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Box m="20px">
              <Header title="Usuarios" subtitle="Lista de usuarios" />

              <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                  // Aquí mantén los estilos de la tabla sin modificar los colores
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                }}
              >
                <DataGrid rows={mockData} columns={columns} />
                {/* Botón flotante para abrir el modal */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenModal}
                  sx={{
                    position: "fixed",
                    display: "flex",
                    flexDirection: "row",
                    top: "150px",
                    right: "25px",
                    borderRadius: "8px", // Hace el botón redondo
                    backgroundColor: "#3E4396", // Color rojo
                    color: "#fff", // Color del texto en el botón
                    width: "100px", // Ancho del botón
                    height: "50px", // Alto del botón
                    alignItems: "flex-start", // Centra el contenido verticalmente
                    fontSize: "12px", // Tamaño del texto en el botón
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Agrega una sombra al botón
                    cursor: "pointer", // Cambia el cursor al pasar sobre el botón
                    border: "1px", //Borde del botón
                    "&:hover": {
                      backgroundColor: "#2E7C67",
                    },
                  }}
                >
                  AGREGAR USUARIO
                </Button>
              </Box>
              {/* Modal para agregar usuarios */}
              <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <div className={Styles.titles}>Agregar Usuario</div>
                {modalError && (
                  <DialogContent className={Styles.mensajeDeError}>
                    {modalError}
                  </DialogContent>
                )}
                <DialogContent className={Styles.dialog}>
                  <MuiTextField
                    onChange={handleChange}
                    name="name"
                    value={userData.name}
                    size="small"
                    label="Nombre"
                  />
                  <MuiTextField
                    onChange={handleChange}
                    name="phone"
                    value={userData.phone}
                    size="small"
                    label="Telefono"
                  />
                  <MuiTextField
                    onChange={handleChange}
                    name="email"
                    value={userData.email}
                    size="small"
                    label="Email"
                  />
                  <SelectUser
                    value={userData.role}
                    onChange={handleChangeSelectUser}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveData} color="primary">
                    Guardar
                  </Button>
                </DialogActions>
              </Dialog>

              {error && <div>{error}</div>}
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default User;
