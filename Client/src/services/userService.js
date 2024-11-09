
import axios from 'axios'
import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastSuccess } from '../configs/toastConfig';
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
            console.log(data);
            
            return data
        } catch (error) {
            console.log(error);
        }
    },
    getAllCustomer: async () => {
        try {
            const { data } = await http.get(`${END_POIND_API.USER}/customer`)
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
        }
    },
    getAllStaff: async ()=> {
        try {
             const {data} = await http.get(`${END_POIND_API.USER}/staff`)             
             return data
        } catch (error) {
            console.log(error.message);     
        }
     },
     getAnStaff: async (idStaff)=> {
          console.log(idStaff);
          try {
               const {data} = await http.get(`${END_POIND_API.USER}/staff/${idStaff}`)
               return data
          } catch (error) {
              console.log(error.message);     
          }
       },
     deleteUser: async (requestParams) => {
        try {
            const { data } = await http.delete(`${END_POIND_API.USER}/${requestParams}`)
            return data
        } catch (error) {
            console.log(error);
        }
    },
    updatePhoneNumberUser: async (requestParams,requestBody) => {
        try {
            const { data } = await http.put(`${END_POIND_API.USER}/phoneNumber/${requestParams}`,requestBody)
            if(data){
             showToastSuccess(data.message)
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    },

}
export default userServices