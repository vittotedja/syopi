import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'

import { useAuth } from './Context'

const PrivateRoutes = () => {
  const { user } = useAuth()
  console.log(user)
  if (user) {
    return (
      <Outlet />
    )
  }
  else {
    return (
      <Navigate to="/login" />
    )
  }
}

export default PrivateRoutes