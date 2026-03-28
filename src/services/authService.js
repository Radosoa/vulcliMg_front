import apiClient from './api';

export const login = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  // On attend que le backend renvoie { token: '...' } ou {access_token: '...'}
  const token = response.data.token || response.data.access_token || (response.data.data && response.data.data.token);
  if (token) {
    localStorage.setItem('auth_token', token);
  }
  return response.data;
};

export const register = async (payload) => {
  const response = await apiClient.post('/register', payload);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
};

export const isAuthenticated = () => {
  try {
    return !!localStorage.getItem('auth_token');
  } catch (e) {
    return false;
  }
};
