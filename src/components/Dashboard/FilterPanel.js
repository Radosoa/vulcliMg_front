import React, { useState, useEffect } from 'react';
import { getRegions } from '../../services/api';
import { VULNERABILITY_CLASSES } from '../../utils/constants';
import './FilterPanel.css';
import { FiFilter } from 'react-icons/fi';

/**
 * Composant FilterPanel - Panneau de filtres
 * @param {Object} props - Props du composant
 * @param {Function} props.onFilterChange - Callback appelé lors du changement de filtre
 */
const FilterPanel = ({ onFilterChange }) => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegions();
  }, []);

  const loadRegions = async () => {
    try {
      const data = await getRegions();
      setRegions(data);
    } catch (error) {
      console.error('Erreur lors du chargement des régions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    setSelectedRegion(value);
    onFilterChange({ region: value, vulnerability_class: selectedClass });
  };

  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);
    onFilterChange({ region: selectedRegion, vulnerability_class: value });
  };

  const handleReset = () => {
    setSelectedRegion('');
    setSelectedClass('');
    onFilterChange({ region: '', vulnerability_class: '' });
  };

  return (
    <div className="filter-panel">
      <h3><FiFilter size={20} /> Filtres</h3>
      
      <div className="filter-group">
        <label htmlFor="region-filter">Région</label>
        <select
          id="region-filter"
          value={selectedRegion}
          onChange={handleRegionChange}
          disabled={loading}
        >
          <option value="">Toutes les régions</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="class-filter">Classe de Vulnérabilité</label>
        <select
          id="class-filter"
          value={selectedClass}
          onChange={handleClassChange}
        >
          <option value="">Toutes les classes</option>
          {Object.values(VULNERABILITY_CLASSES).map((vClass) => (
            <option key={vClass.value} value={vClass.value}>
              {vClass.label}
            </option>
          ))}
        </select>
      </div>

      <button 
        className="reset-button" 
        onClick={handleReset}
        disabled={!selectedRegion && !selectedClass}
      >
        Réinitialiser
      </button>
    </div>
  );
};

export default FilterPanel;
