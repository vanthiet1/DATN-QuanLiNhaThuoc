import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const roleServices = {
  getAllRole:async()=>{
    try {
      const { data } = await http.get(`${END_POIND_API.ROLE}`);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  addRole: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.ROLE}`, requestBody);
      showToastSuccess(data.message || 'Thêm role thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },

  getRoleById: async (resquestParrams) => {
    try {
      const { data } = await http.get(`${END_POIND_API.ROLE}/${resquestParrams}`);
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },

  deleteRoleById: async (resquestParrams) => {
    try {
      const { data } = await http.delete(`/${END_POIND_API.ROLE}/${resquestParrams}`);
      showToastSuccess(data.message || 'Xóa role thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
  
  updateBanner: async (requestParams) => {
    try {
      const { data } = await http.put(`/${END_POIND_API.ROLE}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật role thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};
export default roleServices;
