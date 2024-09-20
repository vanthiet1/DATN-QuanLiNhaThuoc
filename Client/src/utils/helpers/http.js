import axios from 'axios'

const http = axios.create({ 
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'multipart/form-data' 
    },
   withCredentials:true
})
export default http;
// config axios  