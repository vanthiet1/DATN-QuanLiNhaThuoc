import axios from 'axios'

const http = axios.create({ 
    baseURL: 'https://datn-quanlinhathuoc.onrender.com/api/v1',
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'multipart/form-data' 
    },
   withCredentials:true
})
export default http;
// config axios  
