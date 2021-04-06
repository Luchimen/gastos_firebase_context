import React from "react";
import { ReactComponent as IconoCerrarSesion } from "../img/log-out.svg";
import Boton from "./Boton";
import { auth } from "../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";

export const BotonCerrarSesion = () => {
  const history = useHistory();

  const closeSession = async () => {
    try {
      await auth.signOut();
      history.push("/iniciar-sesion");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Boton iconoGrande as="button" onClick={closeSession}>
        <IconoCerrarSesion />
      </Boton>
    </div>
  );
};
