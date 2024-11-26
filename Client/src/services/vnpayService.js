import axios from 'axios';

const VNPAY_ROUTER = 'http://localhost:8080/api/v1/vnpay';

const vnpayServices = {
  createPayment: async (requestBody) => {
    try {
      const result = await axios.post(`${VNPAY_ROUTER}/create_payment_url`, requestBody);
      console.log(result);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default vnpayServices;
