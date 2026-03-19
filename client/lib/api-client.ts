import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555';

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const transformData = (data: any) => {
      if (!data) return;
      if (Array.isArray(data)) {
        data.forEach(item => transformData(item));
      } else if (typeof data === 'object') {
        // Fallback for missing thumbnail from images or gallery
        if (!data.thumbnail && data.images && Array.isArray(data.images) && data.images.length > 0) {
          data.thumbnail = data.images[0].url || data.images[0].image_url;
        }
        if (!data.thumbnail && data.gallery_urls && Array.isArray(data.gallery_urls) && data.gallery_urls.length > 0) {
          data.thumbnail = data.gallery_urls[0];
        }

        for (const key in data) {
          const value = data[key];
          if (['thumbnail', 'url', 'img', 'bg', 'cover_image_url', 'author_avatar_url', 'image_url'].includes(key) && typeof value === 'string') {
            if (value.startsWith('/') || value.startsWith('uploads/')) {
              const cleanPath = value.startsWith('/') ? value : `/${value}`;
              data[key] = `${baseURL}${cleanPath}`;
            }
          } else if (key === 'gallery_urls' && Array.isArray(value)) {
            data[key] = value.map((u: string) => {
              if (typeof u === 'string' && (u.startsWith('/') || u.startsWith('uploads/'))) {
                const cleanPath = u.startsWith('/') ? u : `/${u}`;
                return `${baseURL}${cleanPath}`;
              }
              return u;
            });
          } else {
            transformData(value);
          }
        }
      }
    };

    transformData(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
