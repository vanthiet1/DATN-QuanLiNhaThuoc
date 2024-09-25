import http from '../utils/helpers/http';
import END_POINT_API from '../utils/helpers/endpoint';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const subCategoryServices = {
  getAllSubCategories: async () => {
    try {
      const { data } = await http.get(`${END_POINT_API.SUBCATEGORIES}`);
      console.log('', data);
      return data;
    } catch (error) {
      console.log('', error.message);
    }
  },

  getSubCategoryById: async (id) => {
    try {
      const { data } = await http.get(`${END_POINT_API.SUBCATEGORIES}/${id}`);
      console.log('', data);
      return data;
    } catch (error) {
      console.log('', error.message);
    }
  },

  addSubCategory: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POINT_API.SUBCATEGORIES}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm thành công danh mục con!');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  updateSubCategory: async (id, requestBody) => {
    try {
      const { data } = await http.put(`${END_POINT_API.SUBCATEGORIES}/${id}`, requestBody);
      showToastSuccess(data.message || 'Cập nhật thành công danh mục con!');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  },

  // Xóa một subcategory theo ID
  deleteSubCategory: async (id) => {
    try {
      const { data } = await http.delete(`${END_POINT_API.SUBCATEGORIES}/${id}`);
      showToastSuccess(data.message || 'Thêm thành công danh mục con!');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
    }
  }
};

export default subCategoryServices;
