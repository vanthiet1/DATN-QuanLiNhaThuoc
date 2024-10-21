import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
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
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
