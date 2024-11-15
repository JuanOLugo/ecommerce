import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectectRoute from "./components/ProtectedRoute/ProtectectRoute";
import ProtectedRouteSession from "./components/ProtectedRoute/ProtectedRouteSession";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <>
      <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition: true }}>
        
        <Routes>
          <Route path="/" element={<Navigate to={"/public"}/>}/>
          {/* Publics routes*/}
          <Route path="/public" element={<h1>Ruta publica</h1>} />

          {/* Protected Route*/}
          <Route element={<ProtectectRoute />}>
            <Route path="/comprar" element={<h1>Comprar</h1>} />
          </Route>

          <Route element={<ProtectedRouteSession />}>
            <Route path="/login" element={<Auth/>} />
          </Route>

          {/* No found */}
          <Route path="*" element={<h1>Ruta no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
