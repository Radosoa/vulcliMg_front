import apiClient from './api';

export const fetchUser = async () => {
  try {
    const response = await apiClient.get('/user');
    if (typeof response.data === 'object') {
      return response.data;
    }
    // Si la réponse n'est pas du JSON, lever une erreur explicite
    throw new Error('Réponse inattendue du serveur');
  } catch (err) {
    // Optionnel : log ou retour null pour éviter le crash
    return null;
  }
};
