
import http from '../utils/http'
import URL_API from '../utils/api'
import axios from 'axios'

const userServices = {
    getAuthLoginGoogle: async (google_access_token) => {
        try {
            const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${google_access_token}`,
                },
            });
            
            return data ;
        } catch (error) {
            console.log('cc');
        }
    },
    getUserLoginGoogle: async (googleId) => {
        try {
            const { data } = await http.get(`${URL_API.User}/google/${googleId}`)
            return data;
        } catch (error) {
            console.log(error.message);
        }
    },

}
export default userServices