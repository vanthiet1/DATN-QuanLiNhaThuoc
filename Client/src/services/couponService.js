import END_POIND_API from '../utils/helpers/endpoind';
import http from '../utils/helpers/http';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const couponServices = {
  // Create Coupon
  createCoupon: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.COUPON}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm phiếu giảm giá thành công');
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message || 'Lỗi khi thêm phiếu giảm giá');
      console.log(error.message);
    }
  },
  getCoupons: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message || 'Lỗi khi lấy danh sách phiếu giảm giá');
      console.log(error.message);
    }
  },
  getCouponsActive: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}/active`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message || 'Lỗi khi lấy danh sách phiếu giảm giá');
      console.log(error.message);
    }
  },

  // Get Coupon by ID
  getCouponById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}/detail/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message || 'Lỗi khi lấy chi tiết phiếu giảm giá');
      console.log(error.message);
    }
  },

  // Update Coupon
  updateCoupon: async (requestParams, requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.COUPON}/edit/${requestParams}`, requestBody);
      showToastSuccess(data.message || 'Cập nhật phiếu giảm giá thành công');
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message || 'Lỗi khi cập nhật phiếu giảm giá');
      console.log(error.message);
    }
  },

  // Delete Coupon
  deleteCoupon: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.COUPON}/delete/${requestParams}`);
      showToastSuccess(data.message || 'Xóa phiếu giảm giá thành công');
      return data;
    } catch (error) {
      showToastError(error.response?.data?.message || 'Lỗi khi xóa phiếu giảm giá');
      console.log(error.message);
    }
  }
};

export default couponServices;
