import http from "../utils/helpers/http";
import END_POIND_API from "../utils/helpers/endpoind";
import { showToastError, showToastSuccess } from "../configs/toastConfig";

const bannerServices={
    addBanner: async (requestBody) =>{
        try{
            const {data} = await http.post(`${END_POIND_API.BANNER}/create`, requestBody)
            console.log(data);
            return data
        }catch(error){
            console.log(error.message);
        }
    },
    getBannerById: async (resquestParrams)=>{
        try{
            const {data} = await http.get(`${END_POIND_API.BANNER}/${resquestParrams}`)
            console.log(data);
            return data
        }catch(error){
            console.log(error.message);
            
        }
    },
    deleteBannerById: async (resquestParrams)=>{
        try{
            const {data} = await http.delete(`/${END_POIND_API.BANNER}/${resquestParrams}`)
            console.log(data);
            return data
            
        }catch(error){
            console.log(error.message);
            
        }
    },
    deleteBannerByUserId: async (requestParams)=>{
        try {
            const {data} =  await http.delete(`/${END_POIND_API.BANNER}/user/${requestParams}`)
            console.log(data);
            return data
        } catch (error) {
            console.log(error.message);     
        }
     }
}
export default bannerServices