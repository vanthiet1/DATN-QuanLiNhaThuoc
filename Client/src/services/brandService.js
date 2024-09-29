import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const brandServices = {
  createBrand: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.BRAND}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm brand thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getBrand: async (requestBody) => {
    try {
      const { data } = await http.get(`${END_POIND_API.BRAND}`, requestBody);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getBrandById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.BRAND}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateBrand: async (id, requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.BRAND}/${id}`, requestBody);
      showToastSuccess(data.message || ' Cập nhật brand thành công!');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  deleteBrand: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.BRAND}/${requestParams}`);
      showToastSuccess(data.message || 'Xóa thành công brand');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  }
};

export default brandServices;
