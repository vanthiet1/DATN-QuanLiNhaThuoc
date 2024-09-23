import http from '../utils/helpers/http'
import END_POIND_API from "../utils/helpers/endpoind";

const staffServices = {
     getAllStaff: async ()=> {
        try {
             const {data} = await http.get(`${END_POIND_API.STAFF}`)
             return data
        } catch (error) {
            console.log(error.message);     
        }
     },
     getAnStaff: async (idStaff)=> {
          console.log(idStaff);
          try {
               const {data} = await http.get(`${END_POIND_API.STAFF}/${idStaff}`)
               return data
          } catch (error) {
              console.log(error.message);     
          }
       }
}
export default staffServices
