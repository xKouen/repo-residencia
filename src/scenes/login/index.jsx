import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

import { useForm } from "../../hooks/useForm";
import Imagen from "../../img/bg_22.jpg";
import { useState } from "react";

export default function Login() {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not sended");

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    let request = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    console.log(data);

    if (data.status === "success") {
      //persists the data in the browser
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");
    } else {
      setSaved("error");
      if (data.status === "error" && data.message === "Missing data") {
        setSaved("missing data");
      }
      if (data.status === "error" && data.message === "Validation failed") {
        setSaved("validation failed");
      }
      if (data.status === "error" && data.message === "User does not exist") {
        setSaved("user not found");
      }
      if (data.status === "error" && data.message === "Incorrect password") {
        setSaved("incorrect password");
      }
    }
  };
  return (
    <>
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

                  {saved === "login" ? (
                    <div className="alert alert-success" role="alert">
                      <strong>Bienvenido!</strong> Has iniciado sesión
                      correctamente.
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {saved === "error" ? (
                    <div className="alert alert-danger" role="alert">
                      <strong>Error!</strong> Error al iniciar sesión.
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {saved === "missing data" ? (
                    <div className="alert alert-danger" role="alert">
                      <strong>Error!</strong> Campos no rellenados
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {saved === "validation failed" ? (
                    <div className="alert alert-danger" role="alert">
                      <strong>Error!</strong> El formato de los datos no es
                      válido
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {saved === "user not found" ? (
                    <div className="alert alert-danger" role="alert">
                      <strong>Error!</strong> No existe ese usuario
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {saved === "incorrect password" ? (
                    <div className="alert alert-danger" role="alert">
                      <strong>Error!</strong> La contraseña es incorrecta
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <form onSubmit={loginUser}>
                    <div className="form-group first">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="your-email@gmail.com"
                        id="username"
                        name="username"
                        onChange={changed}
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Your Password"
                        id="password"
                        name="password"
                        onChange={changed}
                      />
                    </div>

                    {
                      //<div className="d-sm-flex mb-5 align-items-center">
                      //<label className="control control--checkbox mb-3 mb-sm-0"><span className="caption">Remember me</span>
                      //<input type="checkbox" checked="checked"/>
                      //<div className="control__indicator"></div>
                      //</label>
                      //<span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                      //</div>
                      //</div>
                    }
                    <input
                      type="submit"
                      value="Iniciar Sesión"
                      className="btn btn-block btn-primary"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
