import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import editarGasto from "../firebase/editarGasto";
const FormularioGasto = ({ gasto }) => {
  const { user } = useAuth();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    descripcion: "",
    cantidad: "",
    categoria: "Hogar",
    fecha: new Date(),
  });
  const [centinelAlert, setCentinelAlert] = useState(false);
  const [alerta, setAlerta] = useState({});
  const { descripcion, cantidad, categoria, fecha } = inputs;

  useEffect(() => {
    //Comprobamos si hay algun gasto
    //De ser asi establecemos todo el state con los valores del gasto
    if (gasto) {
      console.log(gasto.data());
      console.log(gasto.id);
      //Comprobamos que el gasto sea del usuario actual
      //Verificamos que el uid guardado en el gasto del uid del usuario
      if (gasto.data().user === user.uid) {
        setInputs({
          descripcion: gasto.data().descripcion,
          cantidad: gasto.data().cantidad,
          categoria: gasto.data().categoria,
          fecha: fromUnixTime(gasto.data().fecha),
        });
      } else {
        history.push("/lista-gastos");
      }
    }
  }, [gasto, user, history]);

  const submitForm = (e) => {
    e.preventDefault();
    if (descripcion !== "" || cantidad !== "") {
      if (gasto) {
        editarGasto({
          id: gasto.id,
          descripcion,
          categoria,
          cantidad: parseFloat(cantidad).toFixed(2),
          fecha: getUnixTime(fecha),
        }).then(() => {
          history.push("/lista-gastos");
        });
      } else {
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
      }
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
          {gasto ? "Editar Gasto" : "Agregar Gasto"}
          <IconoPlus />
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
