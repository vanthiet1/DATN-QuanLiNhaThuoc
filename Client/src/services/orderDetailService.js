import END_POIND_API from '../utils/helpers/endpoind';
import http from '../utils/helpers/http';
import { showToastError, showToastSuccess } from '../configs/toastConfig';
const OrderDetailServices = {
  createOrderDetail: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ORDER_DETAILS}/create`, requestBody);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  getOrderDetails: async (requestBody) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER_DETAILS}`, requestBody);
      console(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getOrderDetailById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER_DETAILS}/detail/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },

  updateOrderDetail: async (requestParams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ORDER_DETAILS}/edit/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  deleteOrderDetail: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.ORDER}/delete/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(data.message);
    }
  }
};
