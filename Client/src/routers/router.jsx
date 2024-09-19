import { createBrowserRouter } from 'react-router-dom';
import { LayoutAdmin, LayoutDefault } from '../components/layouts';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../utils/constant/routers';
import { lazy } from 'react';
import SuspenseWrapper from '../components/suspenseWrapper/SuspenseWrapper';

const HomePage = lazy(() => import('../pages/homePage/HomePage'));
const ProductSearch = lazy(() => import('../pages/productSearch/ProductSearch'));
const CategoryDetails = lazy(() => import('../pages/category/CategoryDetails'));
const Cart = lazy(() => import('../pages/cart/Cart'));
const BlogDetails = lazy(() => import('../pages/blog/BlogDetails'));
const Pharmacy = lazy(() => import('../pages/pharmacy/PharmacyDetails'));

const DashBoard = lazy(() => import('../admin/dashboard/Dashboard'));
const AddProduct = lazy(() => import('../admin/product/AddProduct'));
const AllProduct = lazy(() => import('../admin/product/AllProduct'));
const Customer = lazy(() => import('../admin/customer/Customer'));
const Orders = lazy(() => import('../admin/orders/Orders'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <LayoutDefault />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: PATH_ROUTERS_CLIENT.HOMEPAGE,
        element: <HomePage />
      },
      {
        path: PATH_ROUTERS_CLIENT.PRODUCT_DETAILS,
        element: <ProductSearch />
      },
      {
        path: PATH_ROUTERS_CLIENT.CATEGORIES_DETAILS,
        element: <CategoryDetails />
      },
      {
        path: PATH_ROUTERS_CLIENT.CART,
        element: <Cart />
      },
      {
        path: PATH_ROUTERS_CLIENT.BLOG_DETAILS,
        element: <BlogDetails />
      },
      {
        path: PATH_ROUTERS_CLIENT.PHARMACY_DETAILS,
        element: <Pharmacy />
      }
    ]
  },
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <LayoutAdmin />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: PATH_ROUTERS_ADMIN.DASHBOARD,
        element: <DashBoard />
      },
      {
        path: PATH_ROUTERS_ADMIN.ADD_PRODUCT,
        element: <AddProduct />
      },
      {
        path: PATH_ROUTERS_ADMIN.ALL_PRODUCT,
        element: <AllProduct />
      },
      {
        path: PATH_ROUTERS_ADMIN.CUSTOMERS,
        element: <Customer />
      },
      {
        path: PATH_ROUTERS_ADMIN.ORDERS,
        element: <Orders />
      }
    ]
  }
]);

export default router;
