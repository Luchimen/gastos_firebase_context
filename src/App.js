import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EditarGasto } from "./components/EditarGasto";
import { GastosPorCategoria } from "./components/GastosPorCategoria";
import { Home } from "./components/Home";
import { ListaDeGastos } from "./components/ListaDeGastos";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Contenedor from "./elements/Contenedor";
import { Helmet } from "react-helmet";
import favicon from "./img/logo.png";
import { Fondo } from "./elements/Fondo";
import RutaPrivada from "./components/RutaPrivada";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <AuthProvider>
        <Router>
          <Contenedor>
            <Switch>
              <Route path="/iniciar-sesion" component={Login} />
              <Route path="/registro" component={Register} />
              <RutaPrivada path="/categorias">
                <GastosPorCategoria />
              </RutaPrivada>
              <RutaPrivada path="/lista-gastos">
                <ListaDeGastos />
              </RutaPrivada>
              <RutaPrivada path="/editar/:id">
                <EditarGasto />
              </RutaPrivada>
              <RutaPrivada path="/">
                <Home />
              </RutaPrivada>
            </Switch>
          </Contenedor>
        </Router>
      </AuthProvider>

      <Fondo />
    </>
  );
};
