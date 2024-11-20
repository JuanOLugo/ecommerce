import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Authentication } from "../../Utils/Auth.connection";
import { UserContext } from "../../Context/UserContex";

function ProtectectRoute() {
  const USER = localStorage.getItem("USER");

  return !USER ? <Navigate to={"/login"} /> : <Outlet />;
}

export default ProtectectRoute;
