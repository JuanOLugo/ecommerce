import React from 'react'
import Navbar from '../Items/Navbar'
import { Outlet } from 'react-router-dom'

function RouteForNavbar() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default RouteForNavbar