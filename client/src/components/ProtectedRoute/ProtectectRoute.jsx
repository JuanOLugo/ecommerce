import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectectRoute() {
    const USER = localStorage.getItem("USER")
  return !USER ? <Navigate to={"/login"}/> : <Outlet/>
}

export default ProtectectRoute