import axios from 'axios'
const http = axios.create({ 
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'multipart/form-data' 
    },
   withCredentials:true
})
export default http;
// config axios  
