import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "../elements/Header";
import Boton from "../elements/Boton";
import { auth } from "../firebase/firebaseConfig";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "../elements/ElementosFormulario";
import { ReactComponent as SvgLogin } from "../img/login.svg";
import styled from "styled-components";
import Alerta from "../elements/Alerta";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /**100px */
  margin-bottom: 1.25rem; /**20px */
`;

export const Login = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [centinelAlert, setCentinelAlert] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { email, password } = inputs;

  const submitForm = async (e) => {
    e.preventDefault();
    setCentinelAlert(false);
    setAlerta({});
    //Comprobando que los campos sean correctos
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(email)) {
      setCentinelAlert(true);
      setAlerta({
        tipo: "error",
        mensaje: "Error errro no hay sistema",
      });
      return;
    }
    if (email === "" || password === "") {
      setCentinelAlert(true);
      setAlerta({
        tipo: "error",
        mensaje: "Llenar datos gaaaaaaa",
      });
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setCentinelAlert(true);

      let mensaje;
      switch (error.code) {
        case "auth/wrong-password":
          mensaje = "La contraseña no es correcta chico!";
          break;
        case "auth/user-not-found":
          mensaje = "Tu cuenta no existe gaaaa";
          break;
        default:
          mensaje = "Hubo un error al intentar ingresar la cuenta.";
          break;
      }
      setAlerta({
        tipo: "error",
        mensaje,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesion</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to="/registro">Todavia no registrado?</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={submitForm}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo electronico"
          value={email}
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        />

        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Ingresar
          </Boton>
        </ContenedorBoton>
      </Formulario>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        centinelAlert={centinelAlert}
        setCentinelAlert={setCentinelAlert}
      />
    </>
  );
};
