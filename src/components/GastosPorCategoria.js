import React from "react";
import { Header, Titulo } from "../elements/Header";
import { BtnRegresar } from "../elements/BtnRegresar";
import { Helmet } from "react-helmet";
import BarraTotalGastado from "./BarraTotalGastado";
import { useObtenerGastoMes } from "../hooks/useObtenerGastoMes";
import useObtenerGastosMesCategoria from "../hooks/useObtenerGastosMesCategoria";
import {
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Valor,
  ElementoLista,
} from "../elements/ElementosLista";
import IconoCategoria from "../elements/IconoCategoria";
import convertirAMoneda from "../funciones/convertirAMoneda";
export const GastosPorCategoria = () => {
  const gastosPorCategoria = useObtenerGastosMesCategoria();
  console.log(gastosPorCategoria);
  return (
    <>
      <Helmet>
        <title>Gastos por categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Gastos por categoria</Titulo>
      </Header>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria>
                <IconoCategoria nombre={elemento.categoria} />
                {elemento.categoria}
              </Categoria>
              <Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>
      <BarraTotalGastado />
    </>
  );
};
