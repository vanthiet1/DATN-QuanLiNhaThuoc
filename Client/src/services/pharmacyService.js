import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const pharmacyServices = {
  createPharmacy: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.PHARMACY}/create`, requestBody);
      console.log(data);
      showToastSuccess(data.message || 'Tạo thông tin nhà thuốc thành công!');
      return data;
    } catch (error) {
      showToastError(error.message);
      console.log(error.message);
    }
  },
  getPharmacy: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.PHARMACY}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deletePharmacy: async (requestParams) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.PHARMACY}/${requestParams}`);
      console.log(data);
      showToastSuccess(data.message || 'Xóa thông tin nhà thuốc thành công!');
      return data;
    } catch (error) {
      showToastError(error.message);
      console.log(error.message);
    }
  },
  updatePharmacy: async (requestParams) => {
    try {
      const { data } = await http.put(`${END_POIND_API.PHARMACY}/${requestParams}`);
      showToastSuccess(data.message || 'Cập nhật thông tin nhà thuốc thành công!');
      console.log(data);
      return data;
    } catch (error) {
      showToastError(error.message);
      console.log(error.message);
    }
  }
};

export default pharmacyServices;
