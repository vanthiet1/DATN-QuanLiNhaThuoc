
import axios from 'axios'
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
}
export default userServices