import React, { useState } from "react";
import Boton from "../elements/Boton";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "../elements/ElementosFormulario";
import agregarGasto from "../firebase/agregarGasto";
import { ReactComponent as IconoPlus } from "../img/plus.svg";
import DatePicker from "./DatePicker";
import SelectCategorias from "./SelectCategorias";
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import { useAuth } from "../context/AuthContext";
import Alerta from "../elements/Alerta";
const FormularioGasto = () => {
  const { user } = useAuth();
  const [inputs, setInputs] = useState({
    descripcion: "",
    cantidad: "",
    categoria: "Hogar",
    fecha: new Date(),
  });
  const [centinelAlert, setCentinelAlert] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { descripcion, cantidad, categoria, fecha } = inputs;

  const submitForm = (e) => {
    e.preventDefault();
    if (descripcion !== "" || cantidad !== "") {

      agregarGasto({
        descripcion,
        categoria,
        cantidad: parseFloat(cantidad).toFixed(2),
        fecha: getUnixTime(fecha),
        user: user.uid,
      })
        .then(() => {
          setCentinelAlert(true);
          setAlerta({ tipo: "exito", mensaje: "Todo salio bien gaaa" });
        })
        .catch((err) => {
          setCentinelAlert(true);
          setAlerta({ tipo: "error", mensaje: err });
        });
    } else {
      setCentinelAlert(true);
      setAlerta({ tipo: "error", mensaje: "Completa todos los campos gaaaa" });
    }
  };

  return (
    <Formulario onSubmit={submitForm}>
      <ContenedorFiltros>
        <SelectCategorias setInputs={setInputs} inputs={inputs} />
        <DatePicker setInputs={setInputs} inputs={inputs} />
      </ContenedorFiltros>

      <Input
        type="text"
        name="descripcion"
        id="descripcion"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => {
          setInputs({ ...inputs, [e.target.name]: e.target.value });
        }}
      />
      <InputGrande
        type="text"
        name="cantidad"
        id="valor"
        placeholder="$ 0.00"
        value={cantidad}
        onChange={(e) => {
          setInputs({
            ...inputs,
            [e.target.name]: e.target.value.replace(/[^0-9.]/g, ""),
          });
        }}
      />
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          Agregar Gasto <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        centinelAlert={centinelAlert}
        setCentinelAlert={setCentinelAlert}
      />
    </Formulario>
  );
};

export default FormularioGasto;
