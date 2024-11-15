import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRouteSession() {
    const USER = localStorage.getItem("USER")
  return USER ? <Navigate to={"/public"}/> : <Outlet/>
}

export default ProtectedRouteSession