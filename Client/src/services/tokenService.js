import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';

const tokenService = {
    getAccessToken: () => localStorage.getItem('access_token'),

    setAccessToken: (token) => localStorage.setItem('access_token', token),

    removeAccessToken: () => localStorage.removeItem('access_token'),

    refreshToken: async () => {
        try {
            const { data } = await http.post(`${END_POIND_API.AUTH}/refreshToken`);     
            tokenService.setAccessToken(data?.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Không thể làm mới token:', error);
            throw error;
        }
    }
    
};
http.interceptors.request.use(async (config) => {
    const accessToken = tokenService.getAccessToken();
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
            const newAccessToken = await tokenService.refreshToken();
            http.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            return http(originalRequest);
        } catch (refreshError) {
            console.error('Không thể làm mới token:', refreshError);
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(error);
});
export default tokenService;
