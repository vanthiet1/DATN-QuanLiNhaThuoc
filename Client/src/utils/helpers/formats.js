import { format } from 'date-fns';
const formatsHelper = {
  currency: (amount = 0, codeContry = 'vi-VN', codeMoney = 'VND') => {
    const formattedAmount = new Intl.NumberFormat(codeContry, {
      style: 'currency',
      currency: codeMoney,
      currencyDisplay: 'code'  
    }).format(amount);
    
    return formattedAmount.replace('VND', ' VND');  
  },
  
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  },

 FormatDateAndTime: (timestamp) => {
    return format(new Date(timestamp), ' HH:mm');
  }

};
export default formatsHelper;
