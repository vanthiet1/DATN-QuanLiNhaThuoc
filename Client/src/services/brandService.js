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
  getBrand: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.BRAND}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getDetailBrand: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.BRAND}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteBrand: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.BRAND}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa brand thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateBrand: async (requestParams) => {
    try {
      const { data } = await http.put(`/${END_POIND_API.BRAND}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật brand thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};

export default brandServices;
