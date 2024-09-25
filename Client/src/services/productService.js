import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const productServices = {
  createProduct: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.PRODUCT}/create`, requestBody, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(data);
      showToastSuccess(data.message || 'Tạo sản phẩm thành công!');
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  getAllProducts: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductBestSeller: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/best-seller/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductNew: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/new/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductRecommend: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/recommend/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductRelative: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/related/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getProductWithById: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/details/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductFilter: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/filter/${requestParams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  updateProduct: async (requestParams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.PRODUCT}/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message || 'Cập nhật sản phẩm thành công!');
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  },
  deleteProduct: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.PRODUCT}/${requestParams}`);
      showToastSuccess(data.message || 'Xóa sản phẩm thành công!');
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      showToastError(error.message);
    }
  }
};

export default productServices;
