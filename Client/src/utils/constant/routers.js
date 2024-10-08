const PATH_ROUTERS_CLIENT = {
  HOMEPAGE: '/',
  PRODUCT_SEARCH: 'product/search/',
  PRODUCT_DETAILS: 'product/:slug',
  CATEGORIES_DETAILS: 'danh-muc/:id',
  PHARMACY_DETAILS: 'nha-thuoc/:id',
  BLOG_DETAILS: 'bai-viet/:id',
  CART: 'gio-hang'
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
  CUSTOMERS: 'admin/customers', // sử dụng cho update user
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
  ORDERS: 'admin/orders',
  TRANSACTION: 'admin/transaction',
  MESSAGES: 'admin/messages',
  CUSTOMERS: 'admin/customers',
  SETTINGS: 'admin/settings',
  TEMPLATECOMPONENT: 'admin/template-component'
};

export { PATH_ROUTERS_CLIENT, PATH_ROUTERS_ADMIN };
