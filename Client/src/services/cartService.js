import http from '../utils/helpers/http'
import END_POIND_API from "../utils/helpers/endpoind";
import { showToastError,showToastSuccess } from "../configs/toastConfig";
const cartServices = {
  addToCart: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.CART}`, requestBody);
      return data;
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.response?.status, error.response?.data);
    }
  },
  getCartByUserId: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.CART}/${requestParams}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteCartByUserId: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.CART}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteProductCartByUserId: async (userId,productId) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.CART}/product/${userId}/${productId}`);
      showToastSuccess(data.message)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  updateQuantityCart: async (requestBody)=>{
    console.log(requestBody);
    
    try {
      const { data } = await http.put(`${END_POIND_API.CART}/updateCart`,requestBody);
      console.log(data);
      
      showToastSuccess(data.message)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
};
export default cartServices;
