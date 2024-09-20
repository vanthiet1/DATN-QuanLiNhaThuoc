const formatsHelper = {
  currency: (amount = 0, codeContry = 'vi-VN', codeMoney = 'VND') => {
    return new Intl.NumberFormat(codeContry, {
      style: 'currency',
      currency: codeMoney
    }).format(amount);
  }
};

export default formatsHelper;
