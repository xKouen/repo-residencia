import React, { useState } from "react";
import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField as MuiTextField, Snackbar, Alert as MuiAlert } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Styles from "./programs.module.scss";
import Header from "../../components/header";
import { mockDataPrograms } from "../../data/mockDataPrograms";

const Programs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programData, setProgramData] = useState({
    name: "",
    responsible: "",
    annualGoal: "",
    percentage: "",
  });
  const [mockData, setMockData] = useState(mockDataPrograms);
  const [error, setError] = useState(""); // Estado para el mensaje de error

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleClearFields();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveData = () => {
    // Verifica que haya datos ingresados en el modal antes de guardarlos
    if (
      programData.name &&
      programData.responsible &&
      programData.annualGoal &&
      programData.percentage
    ) {
      // Genera un nuevo ID para el nuevo programa
      const newId = mockDataPrograms.length + 1;
  
      // Crea un nuevo objeto con los datos ingresados y el nuevo ID
      const newProgram = {
        id: newId,
        name: programData.name,
        responsible: programData.responsible,
        annualGoal: programData.annualGoal,
        percentage: programData.percentage,
      };
  
      // Agrega el nuevo programa al array mockDataPrograms
      setMockData((prevData) => [...prevData, newProgram]);
  
      // Limpia el formulario del modal
      handleClearFields();
      // Cierra el modal
      handleCloseModal();
    } else {
      // Si faltan datos en el formulario, muestra un mensaje de error
      setError("Falta completar datos en el formulario");
    }
  };

  const handleClearFields = () => {
    setProgramData({
      name: "",
      responsible: "",
      annualGoal: "",
      percentage: "",
    });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Programa", flex: 1 },
    { field: "responsible", headerName: "Responsable", flex: 1 },
    { field: "annualGoal", headerName: "Meta Anual", flex: 1 },
    { field: "percentage", headerName: "Porcentaje", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Programas" subtitle="Lista de programas activos" />

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
      
      <DataGrid  rows={mockData} columns={columns} />
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
          AGREGAR PROGRAMA
        </Button>
      </Box>
      {/* Modal para agregar programas */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle sx={{ gap: "30px" }}>Agregar Programa</DialogTitle>
        <DialogContent
          className={Styles.dialog}
        >
          <MuiTextField
            onChange={handleChange}
            name="name"
            value={programData.name}
            size="small"
            label="Programa"
          />
          <MuiTextField
            onChange={handleChange}
            name="responsible"
            value={programData.responsible}
            size="small"
            label="Responsable"
          />
          <MuiTextField
            onChange={handleChange}
            name="annualGoal"
            value={programData.annualGoal}
            size="small"
            label="Meta Anual"
          />
          <MuiTextField
            onChange={handleChange}
            name="percentage"
            value={programData.percentage}
            size="small"
            label="Porcentaje"
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
      
      {/* Snackbar para mostrar el mensaje de error */}
      <Snackbar className={Styles.err}
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError("")}
       
      >
        <MuiAlert
          onClose={() => setError("")}
          severity="error"
          variant="filled"
          elevation={6}
        >
          {error}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Programs;
