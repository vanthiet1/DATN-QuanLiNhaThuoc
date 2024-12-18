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
  getAllDataProducts: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/all`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllProducts: async (requestParams) => {
    try {
      const queryString = new URLSearchParams(requestParams).toString();
      const { data } = await http.get(`${END_POIND_API.PRODUCT}?${queryString}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductBestSeller: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/best-seller`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductNew: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/new`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductRecommend: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/recommend`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getListProductRelative: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/related`);
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
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/filter?${requestParams}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  updateProduct: async (requestParams, requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.PRODUCT}/${requestParams}`, requestBody, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
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
  },
  getProductWithBySlug: async (requestParams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/${requestParams}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getProductWithCategory: async (requestParams) => {
    try {
      const { data } = await http.get(`/category${END_POIND_API.PRODUCT}/${requestParams}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getproductExpire: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.PRODUCT}/expire/list-product`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default productServices;
