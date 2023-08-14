import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js";
import "./login.module.scss";

import Imagen from "../../img/bg_22.jpg";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "El nombre de usuario es muy corto")
    .max(30, "El nombre de usuario es muy largo")
    .required("Campo requerido"),
  password: Yup.string()
    .min(8, "La contraseña tiene que contener al menos 8 caracteres")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe contener al menos una mayúscula y un número"
    )
    .required("Campo requerido"),
});

export default function Login() {
  const { auth } = useAuth();
  const { setAuth } = useAuth();

  const [loginStatus, setLoginStatus] = useState("not sended");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.status === "success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          setLoginStatus("login");

          setAuth(data.user);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setLoginStatus("error");
          if (data.status === "error" && data.message === "Missing data") {
            setLoginStatus("missing data");
          }
          if (data.status === "error" && data.message === "Validation failed") {
            setLoginStatus("validation failed");
          }
          if (
            data.status === "error" &&
            data.message === "User does not exist"
          ) {
            setLoginStatus("user not found");
          }
          if (
            data.status === "error" &&
            data.message === "Incorrect password"
          ) {
            setLoginStatus("incorrect password");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <>
      {!auth._id ? (
        <div className="half">
          <div
            className="bg order-1 order-md-2"
            style={{ backgroundImage: `url(${Imagen})` }}
          ></div>
          <div className="contents order-2 order-md-1">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-6">
                  <div className="form-block">
                    <div className="text-center mb-5">
                      <h3>Iniciar Sesión</h3>
                      <p className="mb-4">
                        Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                        consectetur adipisicing.
                      </p>
                    </div>

                    {loginStatus === "login" ? (
                      <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Bienvenido!</strong> Has iniciado sesión
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {loginStatus === "error" ? (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Error!</strong> Error al iniciar sesión
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {loginStatus === "missing data" ? (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Error!</strong> Campos no rellenados
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {loginStatus === "validation failed" ? (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Error!</strong> El formato de los datos no es
                        válido
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {loginStatus === "user not found" ? (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Error!</strong> No existe ese usuario
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {loginStatus === "incorrect password" ? (
                      <div
                        className="alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Error!</strong> La contraseña es incorrecta
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group first">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Usuario"
                          id="username"
                          name="username"
                          autoComplete="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                        />
                        <div className="error">
                          {formik.touched.username && formik.errors.username}
                        </div>
                        <div className="form-group last mb-3">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                          <div className="error">
                            {formik.touched.password && formik.errors.password}
                          </div>
                        </div>
                        <input
                          type="submit"
                          value="Iniciar Sesión"
                          className="btn btn-block btn-primary"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
