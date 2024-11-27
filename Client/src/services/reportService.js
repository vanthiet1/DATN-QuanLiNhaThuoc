import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const reportServices = {
  getoverallReport: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.REPORT}/overall`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getMonthlyRevenue: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.REPORT}/month-revenue`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getTopSellingProducts: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.REPORT}/top-selling`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
};
export default reportServices;
