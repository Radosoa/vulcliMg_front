import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

/**
 * Composant Sidebar - Barre latérale de navigation
 */
const Sidebar = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    // Fermer le menu mobile après avoir cliqué sur un lien
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={handleLinkClick}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={handleLinkClick}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Administration</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <p>© 2026 Climate App</p>
      </div>
    </aside>
  );
};

export default Sidebar;
