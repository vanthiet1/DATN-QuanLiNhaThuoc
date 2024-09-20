import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';

const LayoutAdmin = () => {
  return (
    <div>
      <header className='h-[70px] w-full bg-zinc-800 flex items-center justify-center text-slate-100'>
        <h1>Admin page</h1>
        <Link className='fixed top-[25px] left-[30px]' to={PATH_ROUTERS_CLIENT.HOMEPAGE}>
          🩷🩷🩷 Home page here
        </Link>
      </header>
      <main>
        <div className='sider-bar-main fixed left-0 top-[70px] z-10 w-[270px] bottom-0 h-full bg-zinc-800'>
          <ul className='flex items-end p-4 flex-col gap-2'>
            <Link
              to={PATH_ROUTERS_ADMIN.DASHBOARD}
              className=' hover:text-pink-400 w-full text-zinc-100 transition-colors border border-current px-[14px] py-1 rounded-md'
            >
              Dashboard
            </Link>
            <Link
              to={PATH_ROUTERS_ADMIN.ADD_PRODUCT}
              className=' hover:text-pink-400 w-full text-zinc-100 transition-colors border border-current px-[14px] py-1 rounded-md'
            >
              Add product
            </Link>
            <Link
              to={PATH_ROUTERS_ADMIN.ORDERS}
              className=' hover:text-pink-400 w-full text-zinc-100 transition-colors border border-current px-[14px] py-1 rounded-md'
            >
              Orders
            </Link>
            <Link
              to={PATH_ROUTERS_ADMIN.CUSTOMERS}
              className=' hover:text-pink-400 w-full text-zinc-100 transition-colors border border-current px-[14px] py-1 rounded-md'
            >
              Customers
            </Link>
          </ul>
        </div>
        <div className='main-content-wrapper pl-[280px]'>
          <Outlet />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default LayoutAdmin;
