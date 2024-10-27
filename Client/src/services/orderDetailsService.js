import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError } from '../configs/toastConfig';

const orderDetailsServices = {
  getOrderDetails: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER_DETAILS}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getOrderDetailByOrderId: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER_DETAILS}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateOrderDetail: async (resquestParrams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ORDER_DETAILS}/edit/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteOrderDetail: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.ORDER_DETAILS}/delete/${resquestParrams}`);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default orderDetailsServices;
