import React from "react";
import { Helmet } from "react-helmet";
import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from "../elements/Header";
import Boton from "../elements/Boton";
import { BotonCerrarSesion } from "../elements/BotonCerrarSesion";
import FormularioGasto from "./FormularioGasto";
import BarraTotalGastado from "./BarraTotalGastado";
export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista-gastos">Lista de gastos</Boton>
            <BotonCerrarSesion />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
      <FormularioGasto />
      <BarraTotalGastado/>
    </>
  );
};
