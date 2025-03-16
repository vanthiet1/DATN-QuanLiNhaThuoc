import axios from 'axios'
const http = axios.create({ 
    baseURL: 'https://binh-an-duoc-production.up.railway.app/api/v1',
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'multipart/form-data' 
    },
   withCredentials:true
})
export default http;
// config axios  
