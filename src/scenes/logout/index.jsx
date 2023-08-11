import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    //Vaciamos el storage
    localStorage.clear();

    //Seteamos valores globales a vacio
    setAuth({});

    //Redireccionamos al login
    navigate("/login");
  });

  return <div>logout</div>;
};
export default Logout;
