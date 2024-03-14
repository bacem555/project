import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (user) => {
    setUserInfo(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserInfo({});
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
