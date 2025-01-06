import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AppRoutes from './Routes';
import { AuthProvider } from './contexts/authContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main id="top">
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;