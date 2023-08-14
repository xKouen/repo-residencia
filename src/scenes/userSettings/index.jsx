import "bootstrap/dist/css/bootstrap.min.css";
import "./userSettings.module.scss";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import avatar from "../../img/anna.jpg";
import { SerializeForm } from "../../helpers/serializeForm";

export const UserSettings = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not saved");

  let imageUrl;
  if (auth.image !== "default.png") {
    imageUrl = "http://localhost:3000/api/user/avatar/" + auth.image;
  } else {
    imageUrl = avatar;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    //Recoge datos del formulario
    let newDataUser = SerializeForm(e.target);
    //Borra la imagen del objeto
    delete newDataUser.image;

    //Envia los datos al servidor
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/updateUser",
        {
          method: "PUT",
          body: JSON.stringify(newDataUser),
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        //Borra la contraseña del objeto de usuario en la sesión
        delete data.user.password;
        //Guarda el usuario en la sesión
        setAuth(data.user);
        //Establece el estado a guardado para mostrar alertas
        setSaved("saved");
      } else {
        setSaved("not saved");
        if (data.status === "error" && data.message === "Missing data") {
          setSaved("missing data");
        }
        if (data.status === "error" && data.message === "User already exists") {
          setSaved("user already exists");
        }
        if (data.status === "error" && data.message === "Error updating user") {
          setSaved("error updating user");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      {auth ? (
        <>
          <h1>User Settings</h1>
          {saved === "saved" ? (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Usuario actualizado correctamente
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
          {saved === "missing data" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Error!</strong> Falta información
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
          {saved === "user already exists" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Error!</strong> El usuario o correo electrónico ya está en
              uso
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
          {saved === "error updating user" ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Error!</strong> Hubo un problema al actualizar el usuario
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
          <form onSubmit={handleUpdate}>
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="name"
              id="name"
              defaultValue={auth.name}
            />
            <br />
            <label htmlFor="surname" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              name="surname"
              id="surname"
              defaultValue={auth.surname}
            />
            <br />
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              id="username"
              defaultValue={auth.username}
            />
            <br />
            <label
              htmlFor="
            email"
              className="form-label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              defaultValue={auth.email}
            />{" "}
            <br />
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={imageUrl}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
              <input type="file" name="image" id="image" />
            </Box>
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
export default UserSettings;
