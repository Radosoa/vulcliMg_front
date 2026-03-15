import React from 'react';
import './Header.css';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiGlobe } from 'react-icons/fi';

/**
 * Composant Header - Barre de navigation supérieure
 */
const Header = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Avatar avec initiale
  const renderAvatar = (user) => {
    const letter = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?';
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563eb 60%, #0891b2 100%)',
        color: '#fff',
        fontWeight: 800,
        fontSize: 20,
        boxShadow: '0 2px 8px 0 rgba(37,99,235,0.13)',
        marginRight: 10,
        border: '2.5px solid #fff',
      }}>
        {letter}
      </span>
    );
  };

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
            <h1 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiGlobe size={26} style={{ color: '#2563eb', marginBottom: -3 }} />
              Vulnérabilité Climatique
            </h1>
          </div>
        </div>
        <div className="header-info" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span className="header-date">
            {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          {/* Affichage utilisateur connecté */}
          {loading ? (
            <span className="text-muted text-small" style={{ marginLeft: 12 }}>Chargement...</span>
          ) : user ? (
            <>
              {renderAvatar(user)}
              <span style={{ fontWeight: 700, color: '#2563eb', fontSize: 16, marginRight: 10 }}>
                {user.name || user.email}
              </span>
              <button
                className="btn btn-outline btn-sm"
                style={{
                  marginLeft: 2,
                  fontWeight: 700,
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  padding: '0.5rem 1.25rem 0.5rem 0.85rem',
                  borderRadius: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  boxShadow: '0 2px 8px 0 rgba(37,99,235,0.07)',
                  transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                  background: '#fff',
                  cursor: 'pointer',
                }}
                onClick={handleLogout}
                onMouseOver={e => e.currentTarget.style.background = '#f1f5fe'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >
                <FiLogOut size={18} style={{ marginRight: 3, marginBottom: -2 }} />
                Déconnexion
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
