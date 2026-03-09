import axios from 'axios';

// const baseURL = 'http://localhost:5555';
const baseURL = 'https://full-guid-azerbaijan-1.onrender.com';

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
          if (['thumbnail', 'url', 'img', 'bg'].includes(key) && typeof data[key] === 'string' && data[key].startsWith('/')) {
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
