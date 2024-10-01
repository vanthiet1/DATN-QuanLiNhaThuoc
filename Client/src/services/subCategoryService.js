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
      // console.log(data.data); // api trả về có {data} nên phải data.data
      return data.data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteSubCategory: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.SUB_CATEGORY}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa category thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateSubCategory: async (requestParams) => {
    try {
      const { data } = await http.put(`/${END_POIND_API.SUB_CATEGORY}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật category thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default subCategoryServices;
