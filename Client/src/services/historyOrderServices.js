import END_POIND_API from '../utils/helpers/endpoind';
import http from '../utils/helpers/http';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const historyOrderServices = {
  createHistoryOrder: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.HISTORY_ORDER}`, requestBody);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message);
      console.log(error.message);
    }
  },
  getAllHistoryOrders: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.HISTORY_ORDER}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getHistoryByOrderId: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.HISTORY_ORDER}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message);
      console.log(error.message);
    }
  },
  deleteHistoryOrder: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.HISTORY_ORDER}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message);
      console.log(error.message);
    }
  }
};

export default historyOrderServices;
