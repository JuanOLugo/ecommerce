import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectectRoute from "./components/ProtectedRoute/ProtectectRoute";
import ProtectedRouteSession from "./components/ProtectedRoute/ProtectedRouteSession";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/Logout";
import Home from "./components/Public Routes/Home";
import ProtectedRouteObserver from "./components/ProtectedRoute/ProtectedRouteObserver";
import RouteForNavbar from "./components/ProtectedRoute/RouteForNavbar";

function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Routes>
          <Route element={<ProtectedRouteObserver />}>
            <Route path="/" element={<Navigate to={"/public"} />} />

            <Route element={<RouteForNavbar />}>
              {/* Publics routes*/}
              <Route path="/public" element={<Home />} />

              {/* Protected Routes*/}
              <Route element={<ProtectectRoute />}>
                <Route path="/comprar" element={<h1>Comprar</h1>} />
                <Route path="/carrito" element={<h1>Carrito</h1>} />
                <Route path="/buy" element={<h1>Vender</h1>} />
                <Route path="/logout/:token" element={<Logout />} />
              </Route>
            </Route>

            <Route element={<ProtectedRouteSession />}>
              <Route path="/login" element={<Auth />} />
            </Route>

            {/* No found */}
            <Route path="*" element={<h1>Ruta no encontrada</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
