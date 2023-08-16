import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Header from "../../components/header";
import { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
});

export const AdminSettings = () => {
  //Hook que trae la info de autenticacion
  const { auth } = useAuth();
  //Obtiene el token de la session para usar en la petición fetch
  const token = localStorage.getItem("token");
  //Estado para saber si se ha guardado el periodo
  const [saved, setSaved] = useState("not saved");
  //Estado para guardar los periodos de la petición
  const [data, setData] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState({ name: "" });
  const [loadingPeriods, setLoadingPeriods] = useState(true);

  //Petición para obtener los periodos de la base de datos
  const getPeriods = useCallback(async () => {
    if (auth && auth.role === "Admin") {
      try {
        const response = await fetch(
          "http://localhost:3000/api/period/getAllPeriods",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        //Obtiene la respuesta de la petición y la convierte a json
        const data = await response.json();

        //Si la respuesta es correcta, se guardan los datos en el estado setData
        if (data.status === "success") {
          setData(data.periods);
          setLoadingPeriods(false);
        } else {
          setLoadingPeriods(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [auth, token]);

  const getCurrentPeriod = useCallback(async () => {
    if (auth && auth.role === "Admin") {
      try {
        const response = await fetch(
          "http://localhost:3000/api/period/getPeriodShowed",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        //Obtiene la respuesta de la petición y la convierte a json
        const data = await response.json();
        //Si la respuesta es correcta, se guardan los datos en el estado setData
        if (data.status === "success") {
          setCurrentPeriod(data.period[0]);
          setLoadingPeriods(false);
        } else {
          setLoadingPeriods(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [auth, token]);

  //Funcion para cargar los periodos en el select justo al cargar la página
  useEffect(() => {
    const fetchPeriods = async () => {
      await getPeriods();
      await getCurrentPeriod();
    };

    fetchPeriods();
  }, [getPeriods, getCurrentPeriod]);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/period/updatePeriodShowed/",
          {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          setSaved("saved");
        } else {
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  if (loadingPeriods) {
    <div>Cargando...</div>;
  } else {
    return (
      <>
        {auth && auth.role === "Admin" ? (
          <>
            <Header title={"Configuración de administrador"} />
            <h2> Periodo a mostrar en página principal </h2>
            {saved === "saved" ? (
              <div
                className="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <strong>Completado!</strong> Periodo guardado con éxito.
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            ) : (
              ""
            )}
            <h5>Current Period: {currentPeriod.name}</h5>
            <form onSubmit={formik.handleSubmit}>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                {data.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="btn btn-info">
                Guardar
              </button>
            </form>
            <br />
          </>
        ) : (
          <Navigate to="/" />
        )}
      </>
    );
  }
};
export default AdminSettings;
