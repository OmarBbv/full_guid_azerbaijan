import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5555',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request interceptor (auth token etc.) ────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach bearer token when auth is implemented
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error?.response?.data ?? error.message);
    return Promise.reject(error);
  }
);
