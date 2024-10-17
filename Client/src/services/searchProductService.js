import http from '../utils/helpers/http';
import END_POIND_API from '../utils/helpers/endpoind';

const searchProductServices = {

  getProductByKeyword: async (keyword) => {
    try {
      const { data } = await http.get(`${END_POIND_API.SEARCH}/${END_POIND_API.PRODUCT}?keyword=${keyword}`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default searchProductServices;
