import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const couponServices = {
  createCoupon: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.COUPON}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm phiếu giảm giá thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getCoupons: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getCouponById: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateCoupon: async (resquestParrams) => {
    try {
      const { data } = await http.put(`/${END_POIND_API.COUPON}/${resquestParrams}`);
      showToastSuccess(data.message || 'Cập nhật phiếu giảm giá thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteCoupon: async (requestParams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.COUPON}/${requestParams}`);
      showToastSuccess(data.message || 'Xóa phiếu giảm giá thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default couponServices;
