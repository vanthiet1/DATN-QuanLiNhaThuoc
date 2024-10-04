import axios from 'axios';

const PROVINCE_API = 'https://esgoo.net/api-tinhthanh';

const provinceServices = {
  getInforProvices: async () => {
    try {
      const result = await axios.get(`${PROVINCE_API}/1/0.htm`);
      console.log(result.data.data);
      return result.data.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getInforDistricts: async (idProvice) => {
    try {
      const result = await axios.get(`${PROVINCE_API}/2/${idProvice}.htm`);
      console.log(result.data.data);
      return result.data.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getInforWards: async (idDistrict) => {
    try {
      const result = await axios.get(`${PROVINCE_API}/3/${idDistrict}.htm`);
      console.log(result.data.data);
      return result.data.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getInforDetails: async (idWard) => {
    try {
      const result = await axios.get(`${PROVINCE_API}/5/${idWard}.htm`);
      console.log(result.data.data);
      return result.data.data;
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default provinceServices;
