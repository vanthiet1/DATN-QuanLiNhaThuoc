import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const orderServices = {
  createOrder: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ORDER}`, requestBody, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllOrders: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getOrderById: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}/${resquestParrams}`);
      return data[0];
    } catch (error) {
      console.log(error.message);
    }
  },
  getOrderByUserId: async (resquestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ORDER}/detail/${resquestParams}`);
      return data;
    } catch (error) {
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
      const { data } = await http.delete(`${END_POIND_API.ORDER}/${resquestParrams}`);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateOrder: async (requestParams, requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ORDER}/${requestParams}`, requestBody);
      showToastSuccess(data.message || 'Cập nhật order thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updatePayOrder: async (requestParams, requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ORDER}/bank/${requestParams}`, requestBody);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  differencePayment: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ORDER}/difference/payment`, requestBody);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  createOrderOff: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ORDER}/create-order-off`, requestBody, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error);
    }
  }
};

export default orderServices;
