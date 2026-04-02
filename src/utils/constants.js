// Configuration de l'API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Classes de vulnérabilité
export const VULNERABILITY_CLASSES = {
  VERY_LOW: { value: 'very_low', color: '#1a9850', label: 'Très faible' },
  LOW:      { value: 'low',      color: '#a6d96a', label: 'Faible'      },
  MEDIUM:   { value: 'medium',   color: '#ffffbf', label: 'Moyen'       },
  HIGH:     { value: 'high',     color: '#fdae61', label: 'Élevé'       },
  VERY_HIGH:{ value: 'very_high',color: '#d7191c', label: 'Très élevé'  },
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
