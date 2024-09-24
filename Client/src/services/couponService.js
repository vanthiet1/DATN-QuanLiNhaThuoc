<<<<<<< HEAD
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
=======
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
  getCoupons: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.COUPON}/${resquestParrams}`);
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
>>>>>>> adbf059af301cdff6777e41e5fad36b9c2474508
    }
  },
  deleteCoupon: async (requestParams) => {
    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> adbf059af301cdff6777e41e5fad36b9c2474508
