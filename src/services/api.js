import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Instance Axios configurée
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête pour ajouter le token automatiquement
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si le serveur retourne 401 on supprime le token local pour forcer la déconnexion
    if (error?.response?.status === 401) {
      try {
        localStorage.removeItem('auth_token');
      } catch (e) {}
    }
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

/**
 * Service pour récupérer les zones vulnérables
 * @param {Object} filters - Filtres optionnels { region, vulnerability_class }
 * @returns {Promise} Données des zones
 */
export const getVulnerabilityZones = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.region) params.append('region', filters.region);
    if (filters.vulnerability_class) params.append('vulnerability_class', filters.vulnerability_class);
    
    const response = await apiClient.get(`/vulnerability-zones?${params.toString()}`);
    // console.log("API zones:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service pour récupérer les régions de Madagascar
 * @returns {Promise} Liste des régions
 */
export const getRegions = async () => {
  try {
    const response = await apiClient.get('/regions');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service pour récupérer les statistiques de vulnérabilité
 * @returns {Promise} Statistiques
 */
export const getVulnerabilityStats = async () => {
  try {
    const response = await apiClient.get('/vulnerability-stats');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service pour récupérer les poids des variables bioclimatiques de l'utilisateur authentifié
 * @returns {Promise} Poids actuels ou valeurs par défaut si aucun poids n'existe
 */
export const getBioWeights = async () => {
  try {
    const response = await apiClient.get('/bio-weights');
    // Si l'API retourne null, undefined ou un objet vide, retourner les valeurs par défaut
    if (!response.data || Object.keys(response.data).length === 0) {
      return { bio1: 0.25, bio5: 0.25, bio12: 0.25, bio15: 0.25 };
    }
    return response.data;
  } catch (error) {
    // Si 404 ou aucune donnée, retourner les valeurs par défaut
    if (error?.response?.status === 404) {
      return { bio1: 0.25, bio5: 0.25, bio12: 0.25, bio15: 0.25 };
    }
    throw error;
  }
};

/**
 * Service pour mettre à jour les poids des variables bioclimatiques de l'utilisateur authentifié
 * @param {Object} weights - Nouveaux poids { bio1, bio5, bio12, bio15 }
 * @returns {Promise} Résultat de la mise à jour
 */
export const updateBioWeights = async (weights) => {
  try {
    const response = await apiClient.put('/bio-weights', weights);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service pour recalculer l'indice de vulnérabilité
 * @returns {Promise} Résultat du recalcul
 */
export const recalculateVulnerabilityIndex = async () => {
  try {
    const response = await apiClient.post('/vulnerability-recalculate');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service pour récupérer le PNG de vulnérabilité
 * @returns {Promise} URL du PNG
 */
export const getVulnerabilityPng = async () => {
  const response = await apiClient.get('/vulnerability-png', {
    responseType: 'blob',
  });
  return URL.createObjectURL(response.data);
};



export default apiClient;
