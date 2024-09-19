import http from '../utils/helpers/http';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const END_POIND_API_AUTH = '/auth';

const authServices = {
  register: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API_AUTH}/register`, requestBody);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },
  login: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API_AUTH}/login`, requestBody);
      localStorage.setItem('access_token', data.accessToken);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },
  getUserData: async (access_token) => {
    if (!access_token) {
      return;
    }

    try {
      const response = await http.get(`${END_POIND_API_AUTH}/access`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  logout: async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return;
      await http.post(`${END_POIND_API_AUTH}/logout`);
      localStorage.removeItem('access_token');
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }
};

http.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await http.post(`${URL_API_AUTH}/refreshToken`);
        console.log(data);

        const newAccessToken = data.accessToken;
        localStorage.setItem('access_token', newAccessToken);
        http.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return http(originalRequest);
      } catch (refreshError) {
        console.error('Không thể làm mới token:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default authServices;
