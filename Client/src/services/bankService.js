import axios from 'axios'; 
const bankServices = {
  checkPaidBank: async () => {
    try {
      const { data } = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=jXzBY--i7S--Nrc3FUVVtny9I7wFY7Iw888XB6XYYUUSkxpPdSCRO8I2Nzz4bPnQ_YgsGS5_JhLq0wDx8PlrA-DKnJ7W4kxSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJJ4iwBzGY6TV7TKui-VnAvygprCF4Z7GNG6FvNPgI_tHg9lHaPUM2UPW7Nivhih_G-81z3fKARLgKP63Vt1rEODTFtD7sGIfNz9Jw9Md8uu&lib=MbUYppim98_3UcWNB9q86yYOnUdgdH6r7');
      return data.data;
    } catch (error) {
      console.error('lỗi');
    }
  },

};

export default bankServices;
