import { Link, Outlet } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';

const LayoutDefault = () => {
  return (
    <div>
      <header className='text-indigo-100 bg-zinc-800 h-[70px] w-full flex items-center px-[150px] justify-between'>
        <h1>Check đường dẫn</h1>
        <ul className='flex items-end capitalize'>
          <Link
            to={PATH_ROUTERS_CLIENT.HOMEPAGE}
            className='ml-6  hover:text-pink-400 transition-colors hover:underline'
          >
            Home
          </Link>
          <Link
            to={PATH_ROUTERS_CLIENT.PRODUCT_SEARCH}
            className='ml-6 hover:text-pink-400 transition-colors hover:underline'
          >
            product search
          </Link>
          <Link
            to={PATH_ROUTERS_CLIENT.PRODUCT_DETAILS}
            className='ml-6 hover:text-pink-400 transition-colors hover:underline'
          >
            product details
          </Link>
          <Link to={PATH_ROUTERS_CLIENT.CART} className='ml-6 hover:text-pink-400 transition-colors hover:underline'>
            cart
          </Link>
          <Link
            to={PATH_ROUTERS_CLIENT.CATEGORIES_DETAILS}
            className='ml-6 hover:text-pink-400 transition-colors hover:underline'
          >
            category
          </Link>
          <Link
            to={PATH_ROUTERS_CLIENT.BLOG_DETAILS}
            className='ml-6 hover:text-pink-400 transition-colors hover:underline'
          >
            blog
          </Link>
        </ul>
        <Link
          to={PATH_ROUTERS_ADMIN.DASHBOARD}
          className=' hover:text-pink-400 transition-colors border border-current px-[14px] py-1 rounded-md'
        >
          Admin page
        </Link>
      </header>
      <div className='w-full flex items-center min-h-[500px] justify-center'>
        <Outlet />
      </div>
      <footer className='fixed flex items-center justify-center bottom-0 left-0 h-[100px] w-full bg-zinc-800 text-indigo-100'>
        Footer
      </footer>
    </div>
  );
};

export default LayoutDefault;
