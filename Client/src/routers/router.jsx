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
        path: PATH_ROUTERS_CLIENT.PRODUCT_DETAILS,
        element: (
          <SuspenseWrapper>
            <ProductSearch />
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
        path: PATH_ROUTERS_CLIENT.CART,
        element: (
          <SuspenseWrapper>
            <Cart />
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
    element: <LayoutAdmin />,
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
        path: PATH_ROUTERS_ADMIN.CUSTOMERS,
        element: (
          <SuspenseWrapper>
            <Customer />
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
        path: PATH_ROUTERS_ADMIN.TEMPLATECOMPONENT,
        element: (
          <SuspenseWrapper>
            <TemplateComponent />
          </SuspenseWrapper>
        )
      }
    ]
  }
]);

export default router;
