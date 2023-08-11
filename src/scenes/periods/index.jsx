import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Header from "../../components/header";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
});

export const Periods = () => {
  //Obtiene la info de autenticacion
  const { auth } = useAuth();
  //Consigue el token de la session para usar en la petición fetch
  const token = localStorage.getItem("token");

  const [saved, setSaved] = React.useState("not saved");

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await fetch(
          "http://localhost:3000/api/period/registerPeriod",
          {
            method: "POST",
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
          setSaved("not saved");
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <>
      {auth._id ? (
        <>
          <Header title={"Periodos"} />
          <h5>
            <p>
              En este apartado podrás crear los periodos que se usarán para
              crear los programas presupuestarios, esto para agilizar el proceso
              de creación de estos.
            </p>
          </h5>
          <label htmlFor="name" className="form-label">
            Nombre de periodo
          </label>
          {saved === "saved" ? (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>Guardado!</strong> Periodo agregado correctamente
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
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de periodo"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : (
              ""
            )}
            <br />
            <button type="submit" className="btn btn-info">
              Guardar
            </button>
          </form>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Periods;
