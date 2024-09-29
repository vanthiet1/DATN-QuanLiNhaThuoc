import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const blogServices = {
  addBlog: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.BLOG}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm blog thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getAllBlogs: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.BLOG}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getDetailBrand: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.BLOG}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteBlog: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.BLOG}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa blog thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateBlog: async (requestParams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.BLOG}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật blog thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default blogServices;
