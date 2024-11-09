import React, { createContext, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './UserContext';
import ToggleFormProvider from './ToggleFormContext';
import HanldeCartProvider from './HandleCartContext';
import TabUIAccountProvider from './TabUIAccountContext';
import CartProvider from './CartContext';
import { ConfirmDialogProvider } from '../components/dialog/ConfirmDialogContext';
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [visited, setVisited] = useState(false);
  return (
    <GlobalContext.Provider value={visited}>
      <ConfirmDialogProvider>
        <GoogleOAuthProvider clientId={'1060538151130-fugnan197mqpku6dp2a9vlhnb0vi9l1j.apps.googleusercontent.com'}>
        <TabUIAccountProvider>
          <CartProvider>
            <ToggleFormProvider>
              <HanldeCartProvider>
                <UserProvider>
                  {children}
                </UserProvider>
              </HanldeCartProvider>
            </ToggleFormProvider>
          </CartProvider>
          </TabUIAccountProvider>
        </GoogleOAuthProvider>
      </ConfirmDialogProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
