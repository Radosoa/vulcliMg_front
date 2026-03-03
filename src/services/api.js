import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Instance Axios configurée
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
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
 * Service pour récupérer les poids des variables bioclimatiques
 * @returns {Promise} Poids actuels
 */
export const getBioWeights = async () => {
  try {
    const response = await apiClient.get('/bio-weights');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service pour mettre à jour les poids des variables bioclimatiques
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

export default apiClient;
