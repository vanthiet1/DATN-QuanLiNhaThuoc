import http from '../utils/helpers/http'
import END_POIND_API from "../utils/helpers/endpoind";
import { showToastError,showToastSuccess } from "../configs/toastConfig";
const cartServices = {
  addToCart: async (requestBody) => {
    try {
      const { data } = await http.get(`${END_POIND_API.CART}`, requestBody);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      
    }
  },
  getCartByUserId: async (requestParams) => {
    try {
      const { data } = await http.get(`/${END_POIND_API.CART}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteCartByUserId: async (requestParams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.CART}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteProductCartByUserId: async (requestParams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.CART}/product/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
};
export default cartServices;
