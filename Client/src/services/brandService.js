import http from '../utils/helpers/http';
import END_POINT_API from '../utils/helpers/endpoint';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const brandServices = {
  addBrand: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POINT_API.BRAND}/create`, requestBody);
      showToastSuccess(data.message);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  getBrandById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POINT_API.BRAND}/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  updateBrand: async (id, requestBody) => {
    try {
      const { data } = await http.put(`${END_POINT_API.BRAND}/${id}`, requestBody);
      showToastSuccess(data.message || ' Cập nhật brand thành công!');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  deleteBrand: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POINT_API.BRAND}/${requestParams}`);
      showToastSuccess(data.message || 'Xóa thành công brand');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  }
};

export default brandServices;
