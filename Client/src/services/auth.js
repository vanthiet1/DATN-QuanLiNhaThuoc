import http from '../utils/http'
import { showToastError, showToastSuccess } from '../configs/toastConfig'
import URL_API from '../utils/api'
import tokenService from './tokenService'


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
        const accessToken = tokenService.getAccessToken()
        try {
            if (!accessToken) return
            await http.post(`${URL_API.Auth}/logout`);
            tokenService.removeAccessToken()
            window.location.reload()
        } catch (error) {
            console.log(error.message);
        }
    }

}

export default authServices