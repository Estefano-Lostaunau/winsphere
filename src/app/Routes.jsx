import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import About from './components/about/about';
import NotFound from './components/notfound/notfound'; // Asegúrate de tener un componente NotFound
import { Roulette } from './components/roulette/Roulette';
import AdminPanel from './components/admin-panel/AdminPanel';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roulette" element={<Roulette />} />
      <Route path="/panel" element={<AdminPanel />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;