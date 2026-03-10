import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    // const baseURL = response.config.baseURL as string;
    const transformData = (data: any) => {
      if (!data) return;
      if (Array.isArray(data)) {
        data.forEach(item => transformData(item));
      } else if (typeof data === 'object') {
        for (const key in data) {
          if (['thumbnail', 'url', 'img', 'bg', 'cover_image_url', 'author_avatar_url'].includes(key) && typeof data[key] === 'string' && data[key].startsWith('/')) {
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
    return Promise.reject(error);
  }
);
