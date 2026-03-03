import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

/**
 * Composant Layout - Structure principale de l'application
 */
const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-layout">
      <Header onMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="main-container">
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        <main className="content">
          <Outlet />
        </main>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu} aria-hidden="true" />
      )}
    </div>
  );
};

export default Layout;
