import React, { createContext, useState, useEffect } from 'react';
import { login as authServiceLogin, logout as authServiceLogout, getLoggedInUserId } from '../services/authService';
import users from '../../../data/users.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId) {
      const loggedInUser = users.find(u => u.id === userId);
      setUser(loggedInUser || null);
    }
    setLoading(false);
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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);