import React, { useState, useEffect } from 'react';
import { getVulnerabilityZones, getVulnerabilityStats } from '../../services/api';
import StatsCards from './StatsCards';
import FilterPanel from './FilterPanel';
import MapView from './MapView';
import VulnerabilityBarChart from '../Charts/VulnerabilityBarChart';
import VulnerabilityPieChart from '../Charts/VulnerabilityPieChart';
import './Dashboard.css';
import { FiAlertTriangle } from 'react-icons/fi';

/**
 * Composant Dashboard - Page principale
 */
const Dashboard = () => {
  const [zones, setZones] = useState(null);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Charger les zones et les statistiques en parallèle
      const [zonesData, statsData] = await Promise.all([
        getVulnerabilityZones(filters),
        getVulnerabilityStats()
      ]);
      
      setZones(zonesData);
      setStats(statsData);
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError('Impossible de charger les données. Vérifiez que l\'API est accessible.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading && !zones) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Tableau de bord - Vulnérabilité Climatique</h2>

      {error && (
        <div className="error-message">
          <p><FiAlertTriangle size={20} /> {error}</p>
        </div>
      )}

      <StatsCards stats={stats} />

      <FilterPanel onFilterChange={handleFilterChange} />

      <MapView zones={zones} />

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Distribution de la Vulnérabilité</h3>
          <VulnerabilityBarChart data={stats} />
        </div>

        <div className="chart-container">
          <h3>Répartition des Classes</h3>
          <VulnerabilityPieChart data={stats} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
