import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const subCategoryServices = {
  addSubCategory: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.SUB_CATEGORY}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm danh mục thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getSubCategory: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.SUB_CATEGORY}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getOneSubCategory: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.SUB_CATEGORY}/${requestParams}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getProductBySubCategory: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.SUB_CATEGORY}/${END_POIND_API.PRODUCT}/${requestParams}`);      
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteSubCategory: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.SUB_CATEGORY}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa sub category thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateSubCategory: async (requestParams,requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.SUB_CATEGORY}/${requestParams}`,requestBody);
      showToastSuccess(data.message || 'Cập nhật category thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default subCategoryServices;
