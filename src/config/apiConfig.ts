import axios from 'axios';
import { localRedirect } from 'utils';

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com/';
const refreshEndpoint = process.env.REACT_APP_API_REFRESH_URL || 'localhost';
const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use(config => {
  // const accessToken = JSON.parse(document.cookie);
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      originalRequest._retry = true;
      try {
        localStorage.removeItem('accessToken');
        localRedirect('/admin/login');
      } catch (refreshError) {
        console.log('Refresh token failed', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
