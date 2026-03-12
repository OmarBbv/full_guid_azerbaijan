import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://52.186.174.0:5555',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request interceptor (auth token etc.) ────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => {
    const baseURL = response.config.baseURL as string;
    const transformData = (data: any) => {
      if (!data) return;
      if (Array.isArray(data)) {
        data.forEach((item) => transformData(item));
      } else if (typeof data === 'object') {
        for (const key in data) {
          if (
            ['thumbnail', 'url', 'img', 'bg', 'cover_image_url', 'author_avatar_url'].includes(key) &&
            typeof data[key] === 'string' &&
            data[key].startsWith('/')
          ) {
            data[key] = `${baseURL}${data[key]}`;
          } else {
            transformData(data[key]);
          }
        }
      }
    };

    transformData(response.data);
    return response;
  },
  (error) => {
    console.error('[API Error]', error?.response?.data ?? error.message);
    return Promise.reject(error);
  }
);
