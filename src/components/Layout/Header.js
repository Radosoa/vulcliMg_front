import React from 'react';
import './Header.css';

/**
 * Composant Header - Barre de navigation supérieure
 */
const Header = ({ onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="menu-toggle-icon"></span>
          </button>
          <div className="header-logo">
            <h1>🌍 Vulnérabilité Climatique</h1>
          </div>
        </div>
        <div className="header-info">
          <span className="header-date">
            {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
