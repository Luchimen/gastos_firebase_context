import React from "react";
import { Header, Titulo } from "../elements/Header";
import { BtnRegresar } from "../elements/BtnRegresar";
import { Helmet } from "react-helmet";
import BarraTotalGastado from "./BarraTotalGastado";
import FormularioGasto from "./FormularioGasto";
import { useParams } from "react-router-dom";
import useObtenerGasto from "../hooks/useObtenerGasto";

export const EditarGasto = () => {
  const { id } = useParams();
  const [gasto] = useObtenerGasto(id);
  return (
    <>
      <Helmet>
        <title>Editar gasto</title>
      </Helmet>

      <Header>
        <BtnRegresar ruta="/lista-gastos" />
        <Titulo>Editar gasto</Titulo>
      </Header>
      <FormularioGasto gasto={gasto} />
      <BarraTotalGastado />
    </>
  );
};
