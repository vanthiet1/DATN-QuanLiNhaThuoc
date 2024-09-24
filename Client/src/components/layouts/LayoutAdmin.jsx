import React from 'react';
<<<<<<< HEAD
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
=======
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../sidebars/SidebarAdmin';
import { InputText } from '../ui/form';
import AppIcons from '../ui/icon';
import { Button } from '../ui/button';
import Image from '../ui/image/Image';

const HeaderSearch = () => {
  return (
    <div
      id='header-search-group'
      className='w-[500px] px-2 py-2 rounded focus-within:outline-1 focus-within:outline focus-within:outline-blue-600 text-blue-600 flex border border-slate-300 border-solid items-center'
    >
      <AppIcons.SearchIcons width='24' height='24' />
      <InputText addClassNames='border-none flex-1 focus:outline-0' placeholder='Search for projects' />
    </div>
  );
};

const Header = () => {
  const avatarTestUrl = 'https://i.pravatar.cc/300';
  return (
    <header className='flex-1 bg-white border-b border-gray-300 py-4 shadow-md'>
      <div className='container flex items-center justify-between px-6'>
        <HeaderSearch />
        <div className='flex items-center gap-5'>
          <Button addClassNames='text-blue-600'>
            <AppIcons.DarkIcon />
          </Button>
          <Button addClassNames='text-blue-600'>
            <AppIcons.NotiIcon />
          </Button>
          <Button>
            <Image src={avatarTestUrl} alt='avatar-img' width='36' height='36' addClassNames='rounded-full' />
          </Button>
        </div>
      </div>
    </header>
  );
};

const LayoutAdmin = () => {
  return (
    <div className='flex h-screen'>
      <SidebarAdmin />
      <div className='flex flex-col flex-1 w-full'>
        <Header />
        <div className='h-full overflow-y-auto'>
          <div className='container px-6'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
>>>>>>> d1bbf713a3606f15df8fe3840d0aaf31a7211196
    </div>
  );
};

export default LayoutAdmin;
