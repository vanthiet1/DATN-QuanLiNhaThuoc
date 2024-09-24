import END_POIND_API from '../utils/helpers/endpoind';
import http from '../utils/helpers/http';
import { showToastError, showToastSuccess } from '../configs/toastConfig';
const CouponServices = {
  createCoupon: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.COUPON}/create`, requestBody);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  getCoupons: async (requestBody) => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}`, requestBody);
      console(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getCouponById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}/detail/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },

  updateCoupon: async (requestParams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.COUPON}/edit/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  deleteCoupon: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.COUPON}/delete/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(data.message);
    }
  }
};
