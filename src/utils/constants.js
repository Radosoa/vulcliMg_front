// Configuration de l'API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Classes de vulnérabilité
export const VULNERABILITY_CLASSES = {
  LOW: { label: 'Faible', color: '#4CAF50', value: 'low' },
  MEDIUM: { label: 'Moyen', color: '#FFC107', value: 'medium' },
  HIGH: { label: 'Élevé', color: '#F44336', value: 'high' }
};

// Configuration de la carte
export const MAP_CONFIG = {
  center: [-18.8792, 47.5079], // Centre de Madagascar
  zoom: 6,
  minZoom: 5,
  maxZoom: 12
};

// Variables bioclimatiques
export const BIO_VARIABLES = {
  bio1: { label: 'Température annuelle moyenne', unit: '°C' },
  bio5: { label: 'Température maximale du mois le plus chaud', unit: '°C' },
  bio12: { label: 'Précipitations annuelles', unit: 'mm' },
  bio15: { label: 'Saisonnalité des précipitations', unit: '%' }
};
