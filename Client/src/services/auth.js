import http from '../utils/http'
import { showToastError, showToastSuccess } from '../configs/toastConfig'
import URL_API from '../utils/api'


const authServices = {
    register: async (requestBody) => {
        try {
            const { data } = await http.post(`${URL_API.Auth}/register`, requestBody)
            showToastSuccess(data.message)
            return data
        } catch (error) {
            showToastError(error.response.data.message);
        }
    },
    login: async (requestBody) => {
        try {
            const { data } = await http.post(`${URL_API.Auth}/login`, requestBody)
            localStorage.setItem("access_token", data.accessToken)
            showToastSuccess(data.message)
            return data
        } catch (error) {
            showToastError(error.response.data.message);
        }
    },
    getUserData: async (access_token) => {
        if (!access_token) {
            return;
        }

        try {
            const response = await http.get(`${URL_API.Auth}/access`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error.message);
        }
    },
    logout: async () => {
        try {
            const googleAccessToken = localStorage.getItem('google_access_token');
            const accessToken = localStorage.getItem('access_token');

            if (googleAccessToken) {
                localStorage.removeItem('google_access_token');
                return;
            }

            if (accessToken) {
                await http.post(`${URL_API.Auth}/logout`);
                console.log(data)
                localStorage.removeItem('access_token');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

}

http.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


http.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { data } = await http.post(`${URL_API.Auth}/refreshToken`);
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
});
export default authServices