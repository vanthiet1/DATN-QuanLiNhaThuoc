import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LayoutAdmin, LayoutDefault } from '../components/layouts';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../utils/constant/routers';
import SuspenseWrapper from '../components/suspenseWrapper/SuspenseWrapper';
import ProtectedRoute from '../routers/ProtectedRoute';

const HomePage = lazy(() => import('../pages/homePage/HomePage'));
const ProductSearch = lazy(() => import('../pages/productSearch/ProductSearch'));
const ProductDetail = lazy(() => import('../pages/product/ProductDetail'));
const CategoryDetails = lazy(() => import('../pages/category/CategoryDetails'));
const SubcategoryDetails = lazy(() => import('../pages/category/SubCategoryDetail'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const BlogDetails = lazy(() => import('../pages/blog/BlogDetails'));
const Pharmacy = lazy(() => import('../pages/pharmacy/PharmacyDetails'));
const AccountUser = lazy(() => import('../pages/account/AccoutUser'));
const ListAllProduct = lazy(() => import('../pages/product/ListAllProduct'));
const BmiCalculator = lazy(() => import('../pages/tools/BmiCalculator'));
const NotFoundPage = lazy(() => import('../pages/notfound/NotFound'));

const DashBoard = lazy(() => import('../admin/dashboard/Dashboard'));
const AddProduct = lazy(() => import('../admin/product/AddProduct'));
const AllProduct = lazy(() => import('../admin/product/AllProduct'));
const EditProduct = lazy(() => import('../admin/product/EditProduct'));
const ProductDetailsAdmin = lazy(() => import('../admin/product/ProductDetailsAdmin'));

const AddCategory = lazy(() => import('../admin/category/AddCategory'));
const AllCategory = lazy(() => import('../admin/category/AllCategory'));
const EditCategory = lazy(() => import('../admin/category/EditCategory'));
const EditSubCategory = lazy(() => import('../admin/category/EditSubCategory'));

const AddBrand = lazy(() => import('../admin/brand/AddBrand'));
const AllBrand = lazy(() => import('../admin/brand/AllBrand'));
const EditBrand = lazy(() => import('../admin/brand/EditBrand'));

const AllComment = lazy(() => import('../admin/comment/AllComment'));

const AddCoupon = lazy(() => import('../admin/coupon/AddCoupon'));
const AllCoupon = lazy(() => import('../admin/coupon/AllCoupon'));
const EditCoupon = lazy(() => import('../admin/coupon/EditCoupon'));

const AddBanner = lazy(() => import('../admin/banner/AddBanner'));
const AllBanner = lazy(() => import('../admin/banner/AllBanner'));

const AddBlog = lazy(() => import('../admin/blog/AddBlog'));
const AllBlog = lazy(() => import('../admin/blog/AllBlog'));

const AddPharmacy = lazy(() => import('../admin/pharmacy/AddPharmacy'));
const AllPharmacy = lazy(() => import('../admin/pharmacy/AllPharmacy'));

const AllRoleUser = lazy(() => import('../admin/role/allRole'));

const ManagementStaff = lazy(() => import('../admin/user/ManagementStaff'));
const ManagementUser = lazy(() => import('../admin/user/ManagementUser'));
const ManagementCustomer = lazy(() => import('../admin/user/ManagementCustomer'));

const AddRole = lazy(() => import('../admin/role/addRole'));
const EditRole = lazy(() => import('../admin/role/editRole'));

const ManagementAdress = lazy(() => import('../admin/address/ManagementAdress'));
const Messages = lazy(() => import('../admin/messages/Messages'));
const Transaction = lazy(() => import('../admin/transaction/Transaction'));
const Orders = lazy(() => import('../admin/orders/Orders'));
const OrderDetails = lazy(() => import('../admin/orders/OrderDetails'));
const OrderSaleOff = lazy(() => import('../admin/orders/OrderSaleOff'));

const TemplateComponent = lazy(() => import('../admin/testComponents/TemplateComponent'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: PATH_ROUTERS_CLIENT.HOMEPAGE,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.NOTFOUND,
        element: (
          <SuspenseWrapper>
            <NotFoundPage />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.PRODUCT_DETAILS,
        element: (
          <SuspenseWrapper>
            <ProductDetail />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.BMICALCULATOR,
        element: (
          <SuspenseWrapper>
            <BmiCalculator />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.PRODUCT_SEARCH,
        element: (
          <SuspenseWrapper>
            <ProductSearch />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.ALL_PRODUCT,
        element: (
          <SuspenseWrapper>
            <ListAllProduct />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.CATEGORIES_DETAILS,
        element: (
          <SuspenseWrapper>
            <CategoryDetails />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.SUBCATEGORIES_DETAILS,
        element: (
          <SuspenseWrapper>
            <SubcategoryDetails />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.CART,
        element: (
          <SuspenseWrapper>
            <Cart />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.ACCOUNT,
        element: (
          <SuspenseWrapper>
            <AccountUser />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.BLOG_DETAILS,
        element: (
          <SuspenseWrapper>
            <BlogDetails />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_CLIENT.PHARMACY_DETAILS,
        element: (
          <SuspenseWrapper>
            <Pharmacy />
          </SuspenseWrapper>
        )
      }
    ]
  },

  {
    path: '/', // router của admin
    element:
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>,
    children: [
      {
        path: PATH_ROUTERS_ADMIN.DASHBOARD,
        element: (
          <SuspenseWrapper>
            <DashBoard />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_PRODUCT,
        element: (
          <SuspenseWrapper>
            <AddProduct />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_PRODUCT,
        element: (
          <SuspenseWrapper>
            <AllProduct />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.EDIT_PRODUCT,
        element: (
          <SuspenseWrapper>
            <EditProduct />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.DETAILS_PRODUCT,
        element: (
          <SuspenseWrapper>
            <ProductDetailsAdmin />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_CATEGORY,
        element: (
          <SuspenseWrapper>
            <AddCategory />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_CATEGORY,
        element: (
          <SuspenseWrapper>
            <AllCategory />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.EDIT_CATEGORY,
        element: (
          <SuspenseWrapper>
            <EditCategory />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.EDIT_SUBCATEGORY,
        element: (
          <SuspenseWrapper>
            <EditSubCategory />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_BRAND,
        element: (
          <SuspenseWrapper>
            <AddBrand />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BRAND,
        element: (
          <SuspenseWrapper>
            <AllBrand />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.EDIT_BRAND,
        element: (
          <SuspenseWrapper>
            <EditBrand />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_COUPON,
        element: (
          <SuspenseWrapper>
            <AddCoupon />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_COUPON,
        element: (
          <SuspenseWrapper>
            <AllCoupon />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.EDIT_COUPON,
        element: (
          <SuspenseWrapper>
            <EditCoupon />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_BANNER,
        element: (
          <SuspenseWrapper>
            <AddBanner />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_PHARMARCY,
        element: (
          <SuspenseWrapper>
            <AddPharmacy />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_PHARMARCY,
        element: (
          <SuspenseWrapper>
            <AllPharmacy />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BANNER,
        element: (
          <SuspenseWrapper>
            <AllBanner />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_BLOG,
        element: (
          <SuspenseWrapper>
            <AddBlog />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_BLOG,
        element: (
          <SuspenseWrapper>
            <AllBlog />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_CUSTOMER,
        element: (
          <SuspenseWrapper>
            <ManagementCustomer />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_USER,
        element: (
          <SuspenseWrapper>
            <ManagementUser />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_STAFF,
        element: (
          <SuspenseWrapper>
            <ManagementStaff />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.MANAGER_ADDRESS,
        element: (
          <SuspenseWrapper>
            <ManagementAdress />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_ROLE_USER,
        element: (
          <SuspenseWrapper>
            <AllRoleUser />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_ROLE_USER,
        element: (
          <SuspenseWrapper>
            <AddRole />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ORDERS,
        element: (
          <SuspenseWrapper>
            <Orders />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.MESSAGES,
        element: (
          <SuspenseWrapper>
            <Messages />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_COMMENT,
        element: (
          <SuspenseWrapper>
            <AllComment />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.TRANSACTION,
        element: (
          <SuspenseWrapper>
            <Transaction />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.TEMPLATECOMPONENT,
        element: (
          <SuspenseWrapper>
            <TemplateComponent />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ORDER_DETAILS,
        element: (
          <SuspenseWrapper>
            <OrderDetails />
          </SuspenseWrapper>
        )
      },
      {
        path: PATH_ROUTERS_ADMIN.ORDER_SALE_OFF,
        element: (
          <SuspenseWrapper>
            <OrderSaleOff />
          </SuspenseWrapper>
        )
      }
    ]
  }
]);

export default router;
