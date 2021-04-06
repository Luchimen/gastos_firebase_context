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
import { ReactComponent as SvgLogin } from "../img/registro.svg";
import styled from "styled-components";
import Alerta from "../elements/Alerta";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /**100px */
  margin-bottom: 1.25rem; /**20px */
`;

export const Register = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const [centinelAlert, setCentinelAlert] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { email, password, password2 } = inputs;

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
    if (email === "" || password === "" || password2 === "") {
      setCentinelAlert(true);
      setAlerta({
        tipo: "error",
        mensaje: "Llenar datos gaaaaaaa",
      });
      return;
    }
    if (password !== password2) {
      setCentinelAlert(true);
      setAlerta({
        tipo: "error",
        mensaje: "Contraseñas diferentes gaaaaa",
      });
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      setCentinelAlert(true);

      let mensaje;
      switch (error.code) {
        case "auth/invalid-password":
          mensaje = "La contraseña tiene que ser de al menos 6 caracteres.";
          break;
        case "auth/email-already-in-use":
          mensaje =
            "Ya existe una cuenta con el correo electrónico proporcionado.";
          break;
        case "auth/invalid-email":
          mensaje = "El correo electrónico no es válido.";
          break;
        default:
          mensaje = "Hubo un error al intentar crear la cuenta.";
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
        <title>Crear Cuenta</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
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
        <Input
          type="password"
          name="password2"
          placeholder="Repetir Contraseña"
          value={password2}
          onChange={(e) =>
            setInputs({ ...inputs, [e.target.name]: e.target.value })
          }
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Crear Cuenta
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
