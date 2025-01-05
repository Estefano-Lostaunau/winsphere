import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/authContext';

import Home from './components/home/home';
import About from './components/about/about';
import NotFound from './components/notfound/notfound';
import { Roulette } from './components/roulette/Roulette';
import Register from './components/register/register';
import Login from './components/login/login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roulette/*" element={<RouletteRoutes />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();
  
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }

function RouletteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Roulette />} />
      <Route
        path="panel"
        element={
          <PrivateRoute>
            <Roulette />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;