// tai-khoan
// li-su-don-hang
// chinh-sach-bao-hanh
// chinh-sach-thanh-toan
// don-hang-dan-xu-ly

const PATH_ROUTERS_CLIENT = {
  HOMEPAGE: '/',
  PRODUCT_SEARCH: 'product/search',
  PRODUCT_DETAILS: 'product/:slug',
  ALL_PRODUCT: 'danh-muc/san-pham',
  CATEGORIES_DETAILS: 'danh-muc/:id',
  SUBCATEGORIES_DETAILS: 'danh-muc/san-pham-danh-muc/:id',
  PHARMACY_DETAILS: 'nha-thuoc/:id',
  BLOG_DETAILS: 'bai-viet/:id',
  BLOG: 'bai-viet',
  CART: 'gio-hang',
  ACCOUNT: 'tai-khoan',
  BMICALCULATOR: 'tinh-chi-so-bmi',
  HISTORY_ORDER: 'lich-su-dat-hang',
  NOTFOUND: '*',
  ABOUT: 'gioi-thieu',
  CONTACT:'lien-he'
};

const PATH_ROUTERS_ADMIN = {
  DASHBOARD: 'admin/dashboard',
  ADD_PRODUCT: 'admin/add-product',
  ALL_PRODUCT: 'admin/all-product',
  EDIT_PRODUCT: 'admin/edit-product/:slug',
  DETAILS_PRODUCT: 'admin/product-details/:slug',
  ADD_CATEGORY: 'admin/add-category',
  ALL_CATEGORY: 'admin/all-category',
  EDIT_CATEGORY: 'admin/edit-category/:id',
  EDIT_SUBCATEGORY: 'admin/edit-subcategory/:id',
  ORDERS: 'admin/orders',
  CATEGORY: 'admin/category',
  CUSTOMERS: 'admin/customers',
  SETTINGS: 'admin/settings',
  ADD_BANNER: 'admin/add-banner',
  ALL_BANNER: 'admin/all-banner',
  ADD_BLOG: 'admin/add-blog',
  ALL_BLOG: 'admin/all-blog',
  ADD_BRAND: 'admin/add-brand',
  ALL_BRAND: 'admin/all-brand',
  EDIT_BRAND: 'admin/edit-brand/:id',
  ADD_COUPON: 'admin/add-coupon',
  ALL_COUPON: 'admin/all-coupon',
  EDIT_COUPON: 'admin/edit-coupon/:id',
  ADD_PHARMARCY: 'admin/add-pharmarcy',
  ALL_PHARMARCY: 'admin/all-pharmarcy',
  ALL_COMMENT: 'admin/all-comment',
  MANAGER_USER: 'admin/manager-user',
  MANAGER_STAFF: 'admin/manager-staff',
  MANAGER_CUSTOMER: 'admin/manager-customer',
  ALL_ROLE_USER: 'admin/all-role',
  ADD_ROLE_USER: 'admin/add-role',
  EDIT_ROLE_USER: 'admin/edit-role/:id',
  ORDERS: 'admin/orders',
  TRANSACTION: 'admin/transaction',
  MESSAGES: 'admin/messages',
  CUSTOMERS: 'admin/customers',
  SETTINGS: 'admin/settings',
  TEMPLATECOMPONENT: 'admin/template-component',
  ORDER_DETAILS: 'admin/orders/:id',
  ORDER_SALE_OFF: 'admin/order-from-pharmacy'
};

export { PATH_ROUTERS_CLIENT, PATH_ROUTERS_ADMIN };
