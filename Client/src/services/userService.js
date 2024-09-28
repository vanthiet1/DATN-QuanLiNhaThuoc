
import axios from 'axios'
import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
const userServices = {
    getAuthLoginGoogle: async (google_access_token) => {
        try {
            const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${google_access_token}`,
                },
            });
            return data;
        } catch (error) {
            console.log(error.message);
        }
    },
    getAllUser: async () => {
        try {
            const { data } = await http.get(`${END_POIND_API.USER}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (requestParams) => {
        try {
            const { data } = await http.delete(`${END_POIND_API.USER}/${requestParams}`)
            return data
        } catch (error) {
            console.log(error);
        }
    }
}
export default userServices