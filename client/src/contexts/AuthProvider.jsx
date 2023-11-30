import { createContext, useContext } from "react";
import { redirect } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  // call this function to find out if the currentUser is logged in, without
  // getting the entire currentUser object.
  const isLoggedIn = () => {
    return !!currentUser
  }

  // call this function when you want to authenticate the currentUser
  const login = async (data) => {
    setCurrentUser(data);
  };

  // call this function to sign out logged in currentUser
  const logout = () => {
    setCurrentUser(null);
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