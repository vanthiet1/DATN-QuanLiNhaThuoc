import React, { createContext, useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import SidebarAdmin from '../sidebars/SidebarAdmin';
import { InputText } from '../ui/form';
import AppIcons from '../ui/icon';
import { Button } from '../ui/button';
import Image from '../ui/image/Image';
import MenuDropWrapper from '../menuDrop/MenuDropWrapper';
import { NotificationBell } from '../notification-bell';
import useHandleNewOrder from '../../sockets/useHandleNewOrder';
import { cn } from '../../utils/helpers/mergeClasses';
import useFetch from '../../hooks/useFetch';
import notificationServices from '../../services/notificationService';

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

export const HeaderNotificationBellContext = createContext(null);

const HeaderNotificationBellProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationAction, setNotificationAction] = useState(false);

  useHandleNewOrder((responsive) => {
    console.log(responsive);
    setNotifications((prev) => [...prev, responsive]);
  });

  const handleUnreadNotification = () => {
    setNotifications([]);
    setNotificationAction(!notificationAction);
  };

  const { responsData: notificationData } = useFetch(notificationServices.getAllNotification, {}, [notificationAction]);

  return (
    <HeaderNotificationBellContext.Provider
      value={{ notifications, handleUnreadNotification, notificationData, setNotificationAction, notificationAction }}
    >
      {children}
    </HeaderNotificationBellContext.Provider>
  );
};

export const useHeaderNotificationBell = () => {
  return useContext(HeaderNotificationBellContext);
};

const HeaderNofiticationBell = () => {
  const { notifications, handleUnreadNotification } = useHeaderNotificationBell();
  console.log(notifications);
  return (
    <MenuDropWrapper ComponentChildren={NotificationBell}>
      <Button
        addClassNames='text-gray-700 hover:text-blue-700 relative'
        onClick={() => {
          handleUnreadNotification();
        }}
      >
        <AppIcons.NotiIcon />
        <span
          className={cn('absolute top-[-2px] right-[-6px] w-[16px] h-[16px] bg-blue-400 text-white rounded-full', {
            hidden: notifications.length === 0
          })}
        >
          {notifications && notifications.length}
        </span>
      </Button>
    </MenuDropWrapper>
  );
};

const Header = () => {
  const avatarTestUrl = 'https://i.pravatar.cc/300';
  return (
    <header className='flex-1 bg-white border-b border-gray-300 py-4 shadow-md relative'>
      <div className='container flex items-center justify-between px-6'>
        <HeaderSearch />
        <div className='flex items-center gap-5 transition-colors'>
          <Link
            className='text-gray-700 flex items-center text-sm hover:text-blue-700 hover:underline'
            to={PATH_ROUTERS_ADMIN.ORDER_SALE_OFF}
          >
            <AppIcons.OderIcon width='14' height='14' /> <span className='ml-2'>Mua hàng tại quầy</span>
          </Link>
          <HeaderNotificationBellProvider>
            <HeaderNofiticationBell />
          </HeaderNotificationBellProvider>
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
