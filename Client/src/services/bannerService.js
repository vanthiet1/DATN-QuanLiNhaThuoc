import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const bannerServices = {
  getAllBanner: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.BANNER}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  addBanner: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.BANNER}/create`, requestBody, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToastSuccess(data.message || 'Thêm banner thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },

  getBannerById: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.BANNER}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },

  deleteBannerById: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.BANNER}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa banner thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },

  updateBanner: async (requestParams, requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.BANNER}/${requestParams}`, requestBody, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToastSuccess(data.message || 'Cập nhật banner thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};
export default bannerServices;
