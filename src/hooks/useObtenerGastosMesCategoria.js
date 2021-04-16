import { useState, useEffect } from "react";
import { useObtenerGastoMes } from "../hooks/useObtenerGastoMes";

const useObtenerGastosMesCategoria = () => {
  const [gastosPorCategoria, setGastosPorCategoria] = useState([]);
  const gastos = useObtenerGastoMes();

  useEffect(() => {
    const sumaGastos = gastos.reduce(
      (objetoResultante, objetoActual) => {
        const categoriaActual = objetoActual.categoria;
        const cantidadActual = objetoActual.cantidad;
        objetoResultante[categoriaActual] += cantidadActual;
        return objetoResultante;
      },
      {
        comida: 0,
        "cuentas y pagos": 0,
        Hogar: 0,
        transporte: 0,
        ropa: 0,
        "salud e higiene": 0,
        compras: 0,
        diversion: 0,
      }
    );

    setGastosPorCategoria(
      Object.keys(sumaGastos).map((elemento) => {
        return {
          categoria: elemento,
          cantidad: sumaGastos[elemento],
        };
      })
    );
  }, [gastos, setGastosPorCategoria]);

  // console.log(sumaGastos);
  return gastosPorCategoria;
};

export default useObtenerGastosMesCategoria;
