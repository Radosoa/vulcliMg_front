import React, { useState, useEffect } from 'react';
import { getBioWeights, updateBioWeights, recalculateVulnerabilityIndex } from '../../services/api';
import WeightEditor from './WeightEditor';
import './Admin.css';
import { FiSave, FiRefreshCw, FiInfo, FiCheckCircle,FiAlertTriangle } from 'react-icons/fi';

/**
 * Composant Admin - Page d'administration
 */
const Admin = () => {
  const [weights, setWeights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeights();
    // eslint-disable-next-line
  }, []);

  const loadWeights = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBioWeights();
      setWeights(data);
    } catch (err) {
      setError('Impossible de charger les poids. Vérifiez que l\'API est accessible.');
      // Les valeurs par défaut sont déjà gérées dans getBioWeights
      setWeights({ bio1: 0.25, bio5: 0.25, bio12: 0.25, bio15: 0.25 });
    } finally {
      setLoading(false);
    }
  };

  const handleWeightChange = (newWeights) => {
    setWeights(newWeights);
    setMessage(null);
  };

  const handleSaveWeights = async () => {
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      await updateBioWeights(weights);
      setMessage({ type: 'success', text: 'Poids sauvegardés avec succès !' });
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError('Erreur lors de la sauvegarde des poids.');
    } finally {
      setSaving(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    setError(null);
    setMessage(null);

    try {
      await recalculateVulnerabilityIndex();
      setMessage({ 
        type: 'success', 
        text: 'Recalcul terminé avec succès ! Les données ont été mises à jour.' 
      });
    } catch (err) {
      console.error('Erreur lors du recalcul:', err);
      setError('Erreur lors du recalcul de l\'indice de vulnérabilité.');
    } finally {
      setRecalculating(false);
    }
  };

  const isValidWeights = () => {
    if (!weights) return false;
    const total = Object.values(weights).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    return Math.abs(total - 1.0) < 0.001;
  };

  if (loading) {
    return (
      <div className="admin">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Chargement de la configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <h2 className="admin-title">⚙️ Administration</h2>
      
      <p className="admin-description">
        Configurez les poids des variables bioclimatiques utilisées pour calculer l'indice de vulnérabilité climatique.
      </p>

      {error && (
        <div className="message error-message">
          <p><FiAlertTriangle size={20} /> {error}</p>
        </div>
      )}

      {message && (
        <div className={`message ${message.type}-message`}>
          <p>
            {message.type === 'success' ? <FiCheckCircle size={20} /> : <FiInfo size={20}/>} {message.text}
          </p>
        </div>
      )}

      <WeightEditor 
        weights={weights} 
        onWeightChange={handleWeightChange}
      />

      <div className="admin-actions">
        <button 
          className="save-button"
          onClick={handleSaveWeights}
          disabled={saving || !isValidWeights()}
        >
          {saving ? (
            <>
              <span className="button-loader"></span>
              Sauvegarde en cours...
            </>
          ) : (
            <><FiSave size={20} />Sauvegarder les poids</>
          )}
        </button>

        <button 
          className="recalculate-button"
          onClick={handleRecalculate}
          disabled={recalculating || !isValidWeights()}
        >
          {recalculating ? (
            <>
              <span className="button-loader"></span>
              Recalcul en cours...
            </>
          ) : (
            <><FiRefreshCw size={20} />Recalculer l'indice de vulnérabilité</>
          )}
        </button>
      </div>

      <div className="admin-info">
        <div className='titre-info'> <h3><FiInfo size={30}/> Information</h3></div>

        
        <ul>
          <li>Les poids doivent totaliser exactement 1.0 (100%)</li>
          <li>Sauvegardez les poids avant de recalculer l'indice</li>
          <li>Le recalcul peut prendre plusieurs minutes selon le volume de données</li>
          <li>Les modifications affecteront tous les calculs de vulnérabilité</li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
