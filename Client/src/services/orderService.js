import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const orderServices = {
  createOrder: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ORDER}/create`, requestBody);
      showToastSuccess(data.message || 'order thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getAllOrders: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getOrderById: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getOrderByUserId: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  userCancelOrder: async (resquestParrams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ORDER}/cancel/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteOrder: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.ORDER}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa.ORDER thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateOrder: async (requestParams) => {
    try {
      const { data } = await http.put(`/${END_POIND_API.ORDER}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật order thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default orderServices;
