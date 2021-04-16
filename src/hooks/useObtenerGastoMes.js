import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from "../context/AuthContext";

export const useObtenerGastoMes = () => {
  const [gastos, setGastos] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const inicioDeMes = getUnixTime(startOfMonth(new Date()));
    const finDeMes = getUnixTime(endOfMonth(new Date()));

    if (user) {
      const unsuscribe = db
        .collection("gastos")
        .orderBy("fecha", "desc")
        .where("fecha", ">=", inicioDeMes)
        .where("fecha", "<=", finDeMes)
        .where("user", "==", user.uid)
        .onSnapshot((snapshot) => {
          setGastos(
            snapshot.docs.map((documento) => {
              return { ...documento.data(), id: documento.id };
            })
          );
        });
      return unsuscribe;
    }
    //UseEffcet tiene que retornar una funcion que se va a ejecutar cuando se desmonta el componente
    //En este caso el unsusctribe cancela la conexion a firestore
  }, [user]);

  return gastos;
};
