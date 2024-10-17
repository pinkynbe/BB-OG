import React, { createContext, useState, useContext, useEffect } from "react";
import UserService from "./components/service/UserService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    UserService.isAuthenticated()
  );
  const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

  const updateAuthStatus = () => {
    setIsAuthenticated(UserService.isAuthenticated());
    setIsAdmin(UserService.isAdmin());
  };

  useEffect(() => {
    updateAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, updateAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
