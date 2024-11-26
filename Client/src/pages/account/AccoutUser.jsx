import React, { useContext, useState } from 'react';
import { Button } from '../../components/ui/button';
import AppIcons from '../../components/ui/icon';
import InforUser from './components/InforUser';
import ListOrders from './components/ListOrders';
import Security from './components/Sercurity';
import useSrcollTop from '../../hooks/useSrcollTop';
import { UserContext } from '../../contexts/UserContext'
import { TabUIAccountContext } from '../../contexts/TabUIAccountContext';
import HistoryOrder from './components/HistoryOrder';
const AccountUser = () => {
  useSrcollTop()
  const { user } = useContext(UserContext)
  const { tabIndex, tabIndexUi, setTabIndex } = useContext(TabUIAccountContext) || {}

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
            <span>
              {user ? (
                <span className='font-bold '>
                  {user?.email}
                </span>
              ) : (
                <span className='font-semibold'>
                  Chưa có thông tin
                </span>
              )}
            </span>
            {user?.avatar ? (
              <img className='w-[50px] rounded-full' src={user?.avatar} alt="" />
            ) : (
              <div className='bg-[#2563EB] w-10 h-10 rounded-full p-2 cursor-pointer flex items-center justify-center'>
                <AppIcons.UserIcon addClassNames='text-[#fff]' />
              </div>
            )
            }
          </div>
          <div className='flex flex-col xl:flex-row gap-2 w-full justify-center my-4'>
            <Button children='Hội viên' className='bg-[#2563EB] text-[#fff] py-2 rounded-full w-full ' />
            <Button children='Trở thành hội viên' className='bg-[#2563EB] text-[#fff] py-2 rounded-full w-full' />
          </div>

          <div className=''>
            <ul>
              <li
                onClick={() => setTabIndex(1)}
                className={`p-3 my-1 rounded-md cursor-pointer flex gap-2 ${tabIndex === 1 ? "text-[#fff] bg-[#2563EB]" : ""}`}
              >
                <AppIcons.UserIconOutline />
                <span>
                  Quản lý tài khoản
                </span>
              </li>
              <li
                onClick={() => setTabIndex(2)}
                className={` rounded-md duration-200 p-3 my-1  flex gap-2  cursor-pointer ${tabIndex === 2 ? "text-[#fff] bg-[#2563EB]" : ""}`}>
                <AppIcons.ShieldIcon />
                <span>Tài khoản bảo mật</span>
              </li>
              <li
                onClick={() => setTabIndex(3)}
                className={`rounded-md duration-200 p-3 my-1   flex gap-2 cursor-pointer ${tabIndex === 3 ? "text-[#fff] bg-[#2563EB]" : ""}`}>
                <AppIcons.ShoppingCartIcon />
                <span> Đơn hàng xử lí</span>
              </li>
              <li
                onClick={() => setTabIndex(4)}
                className={`rounded-md duration-200 p-3 my-1   flex gap-2 cursor-pointer ${tabIndex === 4 ? "text-[#fff] bg-[#2563EB]" : ""}`}>
                <AppIcons.ClipboardIcon /> Lịch sử đặt hàng
              </li>
              <li className=' rounded-md duration-200 p-3 my-1 hover:text-[#2563EB] hover:bg-gray-200 hover:bg-opacity-50 flex gap-2 cursor-pointer'>
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

            <li
              onClick={() => tabIndexUi(1)}
              className={`pb-2  cursor-pointer hover:text-[#2563EB] ${tabIndex === 1 ? "text-[#2563EB]" : ""}  `}

            >
              Thông tin cá nhân
            </li>
            <li
              onClick={() => tabIndexUi(2)}
              className={`pb-2  cursor-pointer 
                 hover:text-[#2563EB] ${tabIndex === 2 ? "text-[#2563EB]" : ""}`}
            >
              Tài khoản bảo mật
            </li>
            <li
              onClick={() => tabIndexUi(3)}
              className={`pb-2 duration-200  cursor-pointer  hover:text-[#2563EB]`}
            >
              Đơn hàng của bạn
            </li>
          </ul>
        </div>
        <div className='w-full mt-5'>
          {tabIndex === 1 && <InforUser />}
          {tabIndex === 2 && <Security />}
          {tabIndex === 3 && <ListOrders />}
          {tabIndex === 4 && <HistoryOrder />}
        </div>
      </div>
    </div>
  );
};

export default AccountUser;