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
