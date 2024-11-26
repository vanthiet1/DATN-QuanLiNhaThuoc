import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const categoryServices = {
  addCategory: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.CATEGORY}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm danh mục thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getCategory: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.CATEGORY}`);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getDetailCategory: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.CATEGORY}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
     
      console.log(error.message);
    }
  },
  deleteCategory: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.CATEGORY}/${resquestParrams}`);
      showToastSuccess('Xóa danh mục thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateCategory: async (requestParams,requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.CATEGORY}/${requestParams}`,requestBody);
      showToastSuccess(data.message || 'Cập nhật category thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default categoryServices;
