import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
export const useObtenerGastos = () => {
  const { user } = useAuth();
  const [gastos, setGastos] = useState([]);
  const [ultimoGasto, setUltimoGasto] = useState(null);
  const [hayMasPorCargar, setHayMasPorCargar] = useState(false);

  const obtenerMasGastos = () => {
    db.collection("gastos")
      .where("user", "==", user.uid)
      .orderBy("fecha", "desc")
      .limit(10)
      .startAfter(ultimoGasto)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
          setGastos(
            gastos.concat(
              snapshot.docs.map((gasto) => {
                return { ...gasto.data(), id: gasto.id };
              })
            )
          );
        } else {
          setHayMasPorCargar(false);
        }
      });
  };

  useEffect(() => {
    const unsuscribe = db
      .collection("gastos")
      .where("user", "==", user.uid)
      .orderBy("fecha", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
          setHayMasPorCargar(true);
        } else {
          setHayMasPorCargar(false);
        }

        setGastos(
          snapshot.docs.map((gasto) => {
            return { ...gasto.data(), id: gasto.id };
          })
        );
      });
    return unsuscribe;
  }, [user]);

  return [gastos, obtenerMasGastos, hayMasPorCargar];
};
