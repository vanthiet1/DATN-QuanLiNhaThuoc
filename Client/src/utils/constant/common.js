export const ROLE_ADMIN = 'admin';
export const ROLE_STAFF = 'staff';
export const ROLE_CUSTOMMER = 'customer';

export const ORDER_STATUS = {
  1: ' Đang chờ xử lý',
  2: ' Đã xác nhận',
  3: ' Đang giao hàng',
  4: ' Đã hoàn thành',
  5: ' Đã hủy'
};

export const getResultStatus = (status) => {
  switch (status) {
    case 1:
      return ORDER_STATUS[status];
    case 2:
      return ORDER_STATUS[status];
    case 3:
      return ORDER_STATUS[status];
    case 4:
      return ORDER_STATUS[status];
    case 5:
      return ORDER_STATUS[status];
  }
};

export const DATE_TYPE_IS_YEAR_TO_DATE = 'yyyy-MM-dd';
export const DATE_TYPE_IS_DATE_TO_YEAR = 'dd-MM-yyyy';

export const PAYMENT_METHODS_CODE = {
  VNPAY_ID: '66f12ff016469e40e03998fe',
  COD_ID: '67020c5c21e941e9e5240bf1',
  BANK_ID: '6742ed8fee23b6dc36d7c86b'
};

export const PRICE_FOR_COUPON = 50000;
