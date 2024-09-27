import http from '../utils/helpers/http'
import { showToastError, showToastSuccess } from '../configs/toastConfig'
import tokenService from './tokenService';
import END_POIND_API from '../utils/helpers/endpoind';

const authServices = {
    register: async (requestBody) => {
        try {
            const { data } = await http.post(`${END_POIND_API.AUTH}/register`, requestBody)
            showToastSuccess(data.message)
            return data
        } catch (error) {
            showToastError(error.response.data.message);
        }
    },
    login: async (requestBody) => {
        try {
            const { data } = await http.post(`${END_POIND_API.AUTH}/login`, requestBody)
            tokenService.setAccessToken(data.accessToken)
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
            const response = await http.get(`${END_POIND_API.AUTH}/access`, {
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
            const accessToken = tokenService.getAccessToken()
            if (!accessToken) return
             await http.post(`${END_POIND_API.AUTH}/logout`);
             tokenService.removeAccessToken()
             window.location.reload()
        } catch (error) {
            console.log(error.message);
        }
    },
    handleIsActiveAccount: async (requestParams) => {
        try {
            const { data } = await http.put(`${END_POIND_API.USER}/AccountStatus/${requestParams}`)
            return data;
        } catch (error) {
            console.log(error);
        }
    },

}

export default authServices