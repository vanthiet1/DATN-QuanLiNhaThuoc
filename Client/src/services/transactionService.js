import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const transactionServices = {
  getAllTransaction: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.TRANSACTION}`);
      return data.data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  }
};
export default transactionServices;
