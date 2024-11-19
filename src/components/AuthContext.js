import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Inicialmente falso
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true); // Cambia a true al iniciar sesión
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persistencia opcional
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user"); // Limpia la persistencia
  };

  const checkLoginStatus = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, checkLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
