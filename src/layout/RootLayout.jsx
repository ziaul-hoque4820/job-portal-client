import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/shared/Footer'
import NavBar from '../pages/shared/NavBar'

function RootLayout() {
  return (
    <div>
        <NavBar/>
        <Outlet />
        <Footer />
    </div>
  )
}

export default RootLayout