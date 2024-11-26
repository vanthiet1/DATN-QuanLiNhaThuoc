import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';
import { showToastSuccess } from '../configs/toastConfig';

const notificationServices = {
  getAllNotification: async () => {
    try {
      const { data } = await http.get(`${END_POIND_API.NOTIFICATION}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  updateNotificationById: async (id) => {
    try {
      const { data } = await http.put(`${END_POIND_API.NOTIFICATION}/${id}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteNotificationById: async (id) => {
    try {
      const { data } = await http.delete(`${END_POIND_API.NOTIFICATION}/${id}`);
      showToastSuccess(data.message || 'xóa thông báo thành công!');
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
};
export default notificationServices;
