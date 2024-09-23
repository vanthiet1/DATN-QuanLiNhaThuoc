import http from "../utils/helpers/http"
import END_POIND_API from "../utils/helpers/endpoind";
import { showToastError,showToastSuccess } from "../configs/toastConfig";

const paymentMethodServices = { 
    addPaymentMethod: async (requestBody)=>{
        try {
            const {data} =  await http.post(`${END_POIND_API.PAYMENT_METHOD}/create`,requestBody)
            console.log(data);
            return data
        } catch (error) {
            console.log(error.message);     
        }
     },
     getPaymentMethodByUserId: async (requestParams)=>{
        try {
             const {data} =  await http.get(`/${END_POIND_API.PAYMENT_METHOD}/${requestParams}`)
             console.log(data);
             return data
        } catch (error) {
            console.log(error.message);     
        }
     },

     deletePaymentMethodByUserId: async (requestParams)=>{
        try {
            const {data} =  await http.delete(`/${END_POIND_API.PAYMENT_METHOD}/${requestParams}`)
            console.log(data);
            return data
        } catch (error) {
         console.log(error.message);
        }
     },
     deletePaymentMethodByUserId: async (requestParams)=>{
        try {
            const {data} =  await http.delete(`/${END_POIND_API.PAYMENT_METHOD}/user/${requestParams}`)
            console.log(data);
            return data
        } catch (error) {
            console.log(error.message);     
        }
     }
}
export default paymentMethodServices