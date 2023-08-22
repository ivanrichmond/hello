import React from 'react';
import {
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";

import Login from './Login'

export const useAuth = () => {
    const user = {isLoggedIn: false}
    return user && user.isLoggedIn
}

export const ProtectedRoute = ({children}) => {
  // const location = useLocation()
  const isAuth = useAuth()

  return isAuth ? <Outlet/> : <Login/>
}