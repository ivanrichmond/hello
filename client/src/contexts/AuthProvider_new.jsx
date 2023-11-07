import { createContext, useCallback, useContext, useState } from "react";

// import { useLocalStorage } from "../hooks/useLocalStorage";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = useCallback((response) => {
    setUser(user)
  }, [user])

  const logout = useCallback((response) => {
    setUser(null)
  }, [])

  const value = {user, login, logout}
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};