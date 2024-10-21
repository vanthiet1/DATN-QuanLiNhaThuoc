import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import AppIcons from '../../components/ui/icon';

const AccoutUser = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  return (
    <div className='w-full min-h-[75vh] flex flex-col md:flex-row'>
      <div className='md:hidden p-3 flex justify-end'>
        <Button className='bg-[#2563EB] text-[#fff] py-2 px-4 rounded-full' onClick={toggleMenu}>
          {menuOpen ? 'Đóng menu' : 'Mở menu'}
        </Button>
      </div>

      <div
        className={`w-full md:w-[29%] border-b-2 md:border-r-2 md:border-b-0 ${menuOpen ? 'block' : 'hidden'} md:block`}
      >
        <div className='mx-3'>
          <div className='flex  justify-between items-center mx-3'>
            <span>Admin@gmail.com</span>
            <div className='bg-[#2563EB] w-10 h-10 rounded-full p-2 cursor-pointer flex items-center justify-center'>
              <AppIcons.UserIcon addClassNames='text-[#fff]' />
            </div>
          </div>
          <div className='flex flex-col xl:flex-row gap-2 w-full justify-center my-4'>
            <Button children='Hội viên' className='bg-[#2563EB] text-[#fff] py-2 rounded-full w-full ' />
            <Button children='Trở thành hội viên' className='bg-[#2563EB] text-[#fff] py-2 rounded-full w-full' />
          </div>

          <div className='border-t-2'>
            <ul>
              <Link to={'/tai-khoan/thong-tin-ca-nhan'}>
                <li
                  className={`p-3 my-1 hover:text-[#2563EB] ${
                    location.pathname.startsWith('/tai-khoan') ? 'bg-gray-200 bg-opacity-50 text-[#2563EB]' : ''
                  } hover:bg-gray-200 hover:bg-opacity-50 flex gap-2`}
                >
                  <AppIcons.UserIconOutline /> Quản lý tài khoản
                </li>
              </Link>

              <li className='p-3 my-1 hover:text-[#2563EB] hover:bg-gray-200 hover:bg-opacity-50 flex gap-2'>
                <AppIcons.ShoppingCartIcon /> Đơn hàng
              </li>
              <li className='p-3 my-1 hover:text-[#2563EB] hover:bg-gray-200 hover:bg-opacity-50 flex gap-2'>
                <AppIcons.QueueListIcon /> Tủ sách cá nhân
              </li>
              <li className='p-3 my-1 hover:text-[#2563EB] hover:bg-gray-200 hover:bg-opacity-50 flex gap-2'>
                <AppIcons.ClipboardIcon /> Lịch sử giao dịch
              </li>
              <li className='p-3 my-1 hover:text-[#2563EB] hover:bg-gray-200 hover:bg-opacity-50 flex gap-2'>
                <AppIcons.ChatBubbleIcon /> Hỗ trợ khách hàng
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='w-full md:w-[71%] mx-5'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold h-20 md:h-20 flex items-center'>Quản lý thông tin</h1>
          <ul className='flex flex-row gap-3 md:gap-8 border-b-2 font-semibold items-center '>
            <Link to={'/tai-khoan/thong-tin-ca-nhan'}>
              <li
                className={`pb-2 border-b-2 ${
                  location.pathname === '/tai-khoan/thong-tin-ca-nhan'
                    ? 'text-[#2563EB] border-[#2563EB]'
                    : 'border-transparent'
                } hover:text-[#2563EB]`}
              >
                Thông tin cá nhân
              </li>
            </Link>
            <Link to={'/tai-khoan/tai-khoan-bao-mat'}>
              <li
                className={`pb-2 border-b-2 ${
                  location.pathname === '/tai-khoan/tai-khoan-bao-mat'
                    ? 'text-[#2563EB] border-[#2563EB]'
                    : 'border-transparent'
                } hover:text-[#2563EB]`}
              >
                Tài khoản bảo mật
              </li>
            </Link>
            <Link to={'/tai-khoan/don-hang-cua-ban'}>
              <li
                className={`pb-2 border-b-2 ${
                  location.pathname === '/tai-khoan/don-hang-cua-ban'
                    ? 'text-[#2563EB] border-[#2563EB]'
                    : 'border-transparent'
                } hover:text-[#2563EB]`}
              >
                Đơn hàng của bạn
              </li>
            </Link>
          </ul>
        </div>
        <div className='w-full mt-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccoutUser;
