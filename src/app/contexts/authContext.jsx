import React, { createContext, useState, useEffect } from 'react';
import { login as authServiceLogin, logout as authServiceLogout, getLoggedInUserId } from '../services/authService';
import users from '../../../data/users.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId) {
      const loggedInUser = users.find(user => user.id === userId);
      setUser(loggedInUser);
    }
  }, []);

  const login = (email, password) => {
    const user = authServiceLogin(email, password);
    setUser(user);
    return user;
  };

  const logout = () => {
    authServiceLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};