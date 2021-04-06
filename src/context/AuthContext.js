import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";

//Aqui estamos creando la variable del contexto
const AuthContext = React.createContext();

//Creando el hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  //Efecto para ejecutar la comprobacion una sola vez
  useEffect(() => {
    //Comprobando si hay un usuario
    const cancelarSuscripcion = auth.onAuthStateChanged((usuario) => {
      setUser(usuario);
      setLoading(false);
    });

    return cancelarSuscripcion;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
