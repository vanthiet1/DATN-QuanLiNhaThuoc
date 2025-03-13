import React, { createContext, useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './UserContext';
import ToggleFormProvider from './ToggleFormContext';
import HanldeCartProvider from './HandleCartContext';
import TabUIAccountProvider from './TabUIAccountContext';
import CartProvider from './CartContext';
import { ConfirmDialogProvider } from '../components/dialog/ConfirmDialogContext';
import SocketProvider from './SocketContext';
import DiaLog from '../components/dialog/DiaLog';
const GlobalContext = createContext();

// const DialogRecommend = ({ visited, onVisited }) => {
//   if (visited) {
//     return (
//       <DiaLog isOpen={visited} onClose={() => onVisited(!visited)}>
//         <h3 className='text-gray-700 font-medium'>👋 Chào mừng bạn đến với nhà thuốc Bình An Dược </h3>
//         <div className='mt-2'>
//           <p className='text-base text-blue-500 '>Gợi ý cho bạn!</p>
//           <p className='max-w-[73%] text-gray-700'>
//             Để xem đầy đủ chức năng của admin bạn có thể đăng nhập với tài khoản: admin@gmail.com - mk :123123123
//           </p>
//           <p className='max-w-[73%] text-gray-700'>Sau khi đăng nhập di chuột vào avatar để tới trang quản lý 🩷🩷</p>
//         </div>
//       </DiaLog>
//     );
//   }
//   return <></>;
// };
const GlobalContextProvider = ({ children }) => {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisited(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlobalContext.Provider value={visited}>
      <SocketProvider>
        <ConfirmDialogProvider>
          <GoogleOAuthProvider clientId={'1060538151130-fugnan197mqpku6dp2a9vlhnb0vi9l1j.apps.googleusercontent.com'}>
            <CartProvider>
              <ToggleFormProvider>
                <HanldeCartProvider>
                  <TabUIAccountProvider>
                    <UserProvider>{children}</UserProvider>
                  </TabUIAccountProvider>
                </HanldeCartProvider>
              </ToggleFormProvider>
            </CartProvider>
          </GoogleOAuthProvider>
        </ConfirmDialogProvider>
      </SocketProvider>
{/*       <DialogRecommend visited={visited} onVisited={setVisited} /> */}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
