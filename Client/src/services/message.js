import http from "../utils/helpers/http";
import END_POIND_API from "../utils/helpers/endpoind";
const messageService = {
    getMessage: async ({ fromUserId, toUserId }) => {
        console.log(fromUserId, toUserId );
        
        try {
            const { data } = await http.get(`${END_POIND_API.MESSAGE}/${fromUserId}/${toUserId}`);
            return data;
        } catch (error) {
              console.log(error); 
        }
    }
};

export default messageService;
