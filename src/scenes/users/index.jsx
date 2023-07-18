import React, { useState } from "react";
import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField as MuiTextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/header";
import SelectUser from "../../components/selectUser"; // Make sure you have the correct path to the SelectUser component

const User = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleClearFields();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveData = () => {
    console.log("Datos guardados:", userData);
    handleCloseModal();
  };
  const handleClearFields = () => {
    setUserData({
      name: "",
      phone: "",
      email: "",
      role: "",
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
    <Box m="20px">
   
    <Header title="Usuarios" subtitle="Lista de usuarios activos" />
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
      
      <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
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
        <DialogTitle sx={{ gap: "30px" }}>Agregar Usuario</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            minWidth: "300px",
            maxWidth: "500px", // Ancho máximo del contenido del modal
            minHeight: "200px", // Altura mínima del contenido del modal
          }}
        >
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
          <SelectUser value={userData.role} onChange={handleChange} />
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
    </Box>
  );
};

export default User;