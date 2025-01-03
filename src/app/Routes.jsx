import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import About from './components/about/about';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default AppRoutes;