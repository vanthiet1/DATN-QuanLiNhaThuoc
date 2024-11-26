import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const paymentMethodServices = {
  addPaymentMethod: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.PAYMENT_METHOD}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm phương thức thanh toán thành công');
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllPaymentMethod: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.PAYMENT_METHOD}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },

  getPaymentMethodById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PAYMENT_METHOD}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },

  deletePaymentMethod: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.PAYMENT_METHOD}/${requestParams}`);
      showToastSuccess(data.message || 'Xóa phương thức thanh toán thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },

  updatePaymentMethod: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.PAYMENT_METHOD}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật phương thức thanh toán thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};
export default paymentMethodServices;
