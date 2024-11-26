import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const addressServices = {
  getAllAddress: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.ADDRESS}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  addAddress: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ADDRESS}/create`, requestBody);
      showToastSuccess(data.message || 'Thêm address thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  getAddress: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ADDRESS}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getAddressByUserId: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ADDRESS}/detail/${resquestParrams}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getAddressById: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ADDRESS}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  deleteAddress: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.ADDRESS}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa address thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateAddressUser: async (resquestParrams ,requestBody) => {
    try {
      const { data } = await http.put(`${END_POIND_API.ADDRESS}${END_POIND_API.USER}/${resquestParrams}`,requestBody);
      showToastSuccess(data.message || 'Cập nhật address thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  updateAddress: async (requestParams) => {
    try {
      const { data } = await http.put(`/${END_POIND_API.ADDRESS}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật address thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },

 
};

export default addressServices;
