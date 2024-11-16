import React, { createContext, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './UserContext';
import ToggleFormProvider from './ToggleFormContext';
import HanldeCartProvider from './HandleCartContext';
import TabUIAccountProvider from './TabUIAccountContext';
import CartProvider from './CartContext';
import { ConfirmDialogProvider } from '../components/dialog/ConfirmDialogContext';
import SocketProvider from './SocketContext';
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [visited, setVisited] = useState(false);
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
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
