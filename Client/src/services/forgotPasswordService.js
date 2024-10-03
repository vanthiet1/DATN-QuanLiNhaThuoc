import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastError, showToastSuccess } from '../configs/toastConfig';

const forgotPasswordServices = {
    sendCodeForgotPassword: async (requestBody) => {      
        try {
          const { data } = await http.post(`${END_POIND_API.AUTH}/sendCodeForgotPassword`, requestBody);         
          showToastSuccess(data.message || 'Vui lòng kiểm tra email');
          return data;
        } catch (error) {
          showToastError(error.response.data.message);
          console.log(error.message);
        }
      },
    
  forgotPassword: async (requestBody) => {
    try {
      const { data } = await http.post(`${END_POIND_API.AUTH}/forgotPassword`, requestBody);
      showToastSuccess(data.message || 'Đổi mật khẩu thành công');
      return data;
    } catch (error) {
      showToastError(error.response.data.message);
      console.log(error.message);
    }
  },
 

 

};

export default forgotPasswordServices;
