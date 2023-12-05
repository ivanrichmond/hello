import { createContext, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'react-router-dom';

import { designateCurrentUser } from '../data/usersSlice.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    useSelector(state => state.users.currentUser)
  )
  const dispatch = useDispatch()

  // call this function to find out if the currentUser is logged in, without
  // getting the entire currentUser object.
  const isLoggedIn = () => {
    return !!currentUser
  }

  // call this function when you want to authenticate the currentUser
  const login = async (data) => {
    setCurrentUser(data);
    dispatch(designateCurrentUser(data))
  };

  // call this function to sign out logged in currentUser
  const logout = () => {
    setCurrentUser(null);
    dispatch(designateCurrentUser(null))
    redirect("/login");
  };

  const value = {
    currentUser,
    isLoggedIn,
    login,
    logout,
    setCurrentUser
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};