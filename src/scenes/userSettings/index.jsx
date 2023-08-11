import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./userSettings.module.scss";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const UserSettings = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth ? (
        <>
          <h1>User Settings</h1>
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            id="name"
          />
          <br />
          <label htmlFor="surname" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Apellido"
            id="surname"
          />
          <br />
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="username"
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
            placeholder="Email"
          />{" "}
          <br />
          <button type="button" className="btn btn-info">
            Guardar
          </button>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default UserSettings;
