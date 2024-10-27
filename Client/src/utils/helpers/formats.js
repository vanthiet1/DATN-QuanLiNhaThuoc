import { format } from 'date-fns';
import { DATE_TYPE_IS_DATE_TO_YEAR } from '../constant/common';
const formatsHelper = {
  currency: (amount = 0, codeContry = 'vi-VN', codeMoney = 'VND') => {
    const formattedAmount = new Intl.NumberFormat(codeContry, {
      style: 'currency',
      currency: codeMoney,
      currencyDisplay: 'code'
    }).format(amount);

    return formattedAmount.replace('VND', ' VND');
  },

  formatDate: (dateString, dateType = DATE_TYPE_IS_DATE_TO_YEAR || 'dd-MM-yyyy') => {
    const date = new Date(dateString);
    return format(date, dateType);
  },

  FormatDateAndTime: (timestamp) => {
    return format(new Date(timestamp), ' HH:mm');
<<<<<<< HEAD
  },

  formatISODate: (isoString) => {
    const date = new Date(isoString);
    return format(date, 'dd-MM-yyyy HH:mm:ss'); 
=======
>>>>>>> 8ac3b2a5dd387556fda7502a0875d4466340b860
  }
};
export default formatsHelper;
