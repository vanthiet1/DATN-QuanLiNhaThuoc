import END_POIND_API from '../utils/helpers/endpoind';
import http from '../utils/helpers/http';
import { showToastError, showToastSuccess } from '../configs/toastConfig';
const OrderServices = {
  createOrder: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ORDER}`, requestBody);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  getAllOrders: async (requestBody) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}`, requestBody);
      console(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getOrderById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}/${requestParams}`);
      console.log(data);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getOrderByUserId: async (requestBody) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}/detail/${requestBody}`);
      console.log(data);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  userCancelOrder: async (requestParams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ORDER}/cancel/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  updateOrder: async (requestParams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ORDER}/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  deleteOrder: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.ORDER}/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(data.message);
    }
  }
};
