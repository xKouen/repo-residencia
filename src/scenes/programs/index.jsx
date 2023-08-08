import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Styles from "./programs.module.scss";
import Header from "../../components/header";
import "react-pro-sidebar/dist/css/styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";

const Programs = () => {
  const [themee, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const getRowId = (row) => row.name;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programData, setProgramData] = useState({
    name: "",
    responsible: "",
    annualGoal: "",
    percentage: "",
  });
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");
  const [mockData, setMockData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const iconColor = theme.palette.mode === "dark" ? "white" : "black";

  const handleOpenModal = () => {
    setIsEditMode(false); // Establecer el modo de edición como falso al abrir el modal
    setIsModalOpen(true);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("programData");
    if (storedData) {
      setMockData(JSON.parse(storedData));
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    handleClearFields();
    setModalError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveData = () => {
    if (
      programData.name &&
      programData.responsible &&
      programData.annualGoal &&
      programData.percentage
    ) {
      const programIndex = mockData.findIndex(
        (program) => program.name === programData.name
      );

      if (programIndex !== -1) {
        // El programa ya existe pues lo actualizamo xd
        const updatedData = [...mockData];
        updatedData[programIndex] = {
          name: programData.name,
          responsible: programData.responsible,
          annualGoal: programData.annualGoal,
          percentage: programData.percentage,
        };

        setMockData(updatedData);
        localStorage.setItem("programData", JSON.stringify(updatedData));
      } else {
        // El programa no existe en la lista se agrega
        const newProgram = {
          name: programData.name,
          responsible: programData.responsible,
          annualGoal: programData.annualGoal,
          percentage: programData.percentage,
        };

        setMockData((prevData) => [...prevData, newProgram]);
        localStorage.setItem(
          "programData",
          JSON.stringify([...mockData, newProgram])
        );
      }

      handleClearFields();
      handleCloseModal();
      setModalError("");
    } else {
      setModalError("Falta completar campos en el formulario");
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

  const handleEditProgram = (id) => {
    const programToEdit = mockData.find((program) => program.name === id);
    if (programToEdit) {
      setProgramData({
        name: programToEdit.name,
        responsible: programToEdit.responsible,
        annualGoal: programToEdit.annualGoal,
        percentage: programToEdit.percentage,
      });
      setIsEditMode(true); // Establecer el modo de edición como verdadero
      setIsModalOpen(true);
    }
  };

  const handleDeleteProgram = (id) => {
    const updatedData = mockData.filter((program) => program.name !== id);
    setMockData(updatedData);
    localStorage.setItem("programData", JSON.stringify(updatedData));
  };

  const actions = [
    {
      icon: (
        <Tooltip title="Editar">
          <EditIcon />
        </Tooltip>
      ),
      onClick: (id) => handleEditProgram(id),
    },
    {
      icon: (
        <Tooltip title="Eliminar">
          <DeleteIcon />
        </Tooltip>
      ),
      onClick: (id) => handleDeleteProgram(id),
    },
  ];

  const columns = [
    { field: "name", headerName: "Programa", flex: 1 },
    { field: "responsible", headerName: "Responsable", flex: 1 },
    { field: "annualGoal", headerName: "Meta Anual", flex: 1 },
    { field: "percentage", headerName: "Porcentaje", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <div className={Styles.icons}>
            <IconButton
              color="primary"
              style={{ color: iconColor }} // Cambia el color del ícono según el tema
              onClick={() => actions[0].onClick(row.name)}
            >
              {actions[0].icon}
            </IconButton>
            <IconButton
              color="secondary"
              style={{ color: iconColor }} // Cambia el color del ícono según el tema
              onClick={() => actions[1].onClick(row.name)}
            >
              {actions[1].icon}
            </IconButton>
          </div>
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
              <Header title="Programas" subtitle="Transparencia presupuestal" />

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
                <DataGrid
                  rows={mockData}
                  columns={columns}
                  getRowId={getRowId}
                />
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
                <div className={Styles.titles}>
                  {isEditMode ? "Editar Programa" : "Agregar Programa"}
                </div>
                {modalError && (
                  <DialogContent className={Styles.mensajeDeError}>
                    {modalError}
                  </DialogContent>
                )}
                <DialogContent className={Styles.dialog}>
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

              {/* Mostrar el mensaje de error en la tabla si existe */}
              {error && <div>{error}</div>}
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Programs;
