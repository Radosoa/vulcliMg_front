import React from 'react';
import './StatsCards.css';

/**
 * Composant StatsCards - Cartes statistiques
 * @param {Object} props - Props du composant
 * @param {Object} props.stats - Statistiques à afficher
 */
const StatsCards = ({ stats }) => {
  if (!stats) {
    return (
      <div className="stats-cards">
        <div className="stat-card loading">Chargement...</div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Zones',
      value: stats.totalZones || 0,
      icon: '📍',
      color: '#667eea'
    },
    {
      title: 'Vulnérabilité Élevée',
      value: stats.highVulnerability || 0,
      icon: '⚠️',
      color: '#F44336'
    },
    {
      title: 'Vulnérabilité Moyenne',
      value: stats.mediumVulnerability || 0,
      icon: '⚡',
      color: '#FFC107'
    },
    {
      title: 'Vulnérabilité Faible',
      value: stats.lowVulnerability || 0,
      icon: '✅',
      color: '#4CAF50'
    }
  ];

  return (
    <div className="stats-cards">
      {cards.map((card, index) => (
        <div key={index} className="stat-card" style={{ borderLeftColor: card.color }}>
          <div className="stat-icon">{card.icon}</div>
          <div className="stat-info">
            <h3>{card.title}</h3>
            <p className="stat-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
