import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';

const chatServices = {
  getTokenChat: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.CHAT}`,requestBody);
          console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
};
export default chatServices;
