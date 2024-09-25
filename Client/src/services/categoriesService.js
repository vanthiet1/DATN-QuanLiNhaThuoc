import http from '../utils/helpers/http';
import END_POINT_API from '../utils/helpers/endpoint';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const categoryServices = {
  getAllCategories: async () => {
    try {
      const { data } = await http.get(`${END_POINT_API.CATEGORIES}`);
      console.log('', data);
      return data;
    } catch (error) {
      console.log('', error.message);
    }
  },

  getCategoryById: async (id) => {
    try {
      const { data } = await http.get(`${END_POINT_API.CATEGORIES}/${id}`);
      console.log('Category data:', data);
      return data;
    } catch (error) {
      console.log('', error.message);
    }
  },

  addCategory: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POINT_API.CATEGORIES}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm thành công danh mục !');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  updateCategory: async (id, requestBody) => {
    try {
      const { data } = await http.put(`${END_POINT_API.CATEGORIES}/${id}`, requestBody);
      showToastSuccess(data.message || 'Cập nhật danh mục thành công!');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  deleteCategory: async (id) => {
    try {
      const { data } = await http.delete(`${END_POINT_API.CATEGORIES}/${id}`);
      showToastSuccess(data.message || 'Xóa thành công danh mục!');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  }
};

export default categoryServices;
