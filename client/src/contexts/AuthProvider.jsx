import { createContext, useContext, useMemo } from "react";
import { redirect } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    redirect("/login");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    //TODO: fix warning: React Hook useMemo has missing dependencies: 'login' and 'logout'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
    // eslint-disable-next-line
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};