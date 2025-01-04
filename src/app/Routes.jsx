import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import About from './components/about/about';
import NotFound from './components/notfound/notfound';
import { Roulette } from './components/roulette/Roulette';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roulette" element={<Roulette />} />
      <Route path="/roulette/panel" element={<Roulette />} />
      <Route path="/about" element={<About />} />
      <Route path="/roulette/*" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;