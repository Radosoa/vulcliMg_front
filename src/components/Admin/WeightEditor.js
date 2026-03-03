import React, { useState, useEffect } from 'react';
import { BIO_VARIABLES } from '../../utils/constants';
import './WeightEditor.css';

/**
 * Composant WeightEditor - Éditeur de poids des variables bioclimatiques
 * @param {Object} props - Props du composant
 * @param {Object} props.weights - Poids actuels
 * @param {Function} props.onWeightChange - Callback appelé lors du changement de poids
 */
const WeightEditor = ({ weights, onWeightChange }) => {
  const [localWeights, setLocalWeights] = useState(weights || {});
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    if (weights) {
      setLocalWeights(weights);
    }
  }, [weights]);

  useEffect(() => {
    const total = Object.values(localWeights).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    setTotalWeight(total);
  }, [localWeights]);

  const handleWeightChange = (variable, value) => {
    const newWeights = {
      ...localWeights,
      [variable]: parseFloat(value) || 0
    };
    setLocalWeights(newWeights);
    onWeightChange(newWeights);
  };

  const isValidTotal = Math.abs(totalWeight - 1.0) < 0.001;

  return (
    <div className="weight-editor">
      <div className="weight-info">
        <p>
          Ajustez les poids des variables bioclimatiques. 
          La somme des poids doit être égale à <strong>1.0</strong>
        </p>
        <div className={`total-weight ${isValidTotal ? 'valid' : 'invalid'}`}>
          Total: {totalWeight.toFixed(3)} {isValidTotal ? '✓' : '⚠️'}
        </div>
      </div>

      <div className="weight-inputs">
        {Object.entries(BIO_VARIABLES).map(([key, variable]) => (
          <div key={key} className="weight-input-group">
            <label htmlFor={`weight-${key}`}>
              <strong>{variable.label}</strong>
              <span className="variable-unit">({variable.unit})</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id={`weight-${key}`}
                value={localWeights[key] || 0}
                onChange={(e) => handleWeightChange(key, e.target.value)}
                min="0"
                max="1"
                step="0.01"
              />
              <div className="weight-bar">
                <div 
                  className="weight-bar-fill"
                  style={{ width: `${(localWeights[key] || 0) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightEditor;
