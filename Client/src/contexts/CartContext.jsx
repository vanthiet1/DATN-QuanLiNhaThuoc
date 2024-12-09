import { useState, createContext, useEffect, useContext } from 'react';
import cartServices from '../services/cartService';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuanity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (Array.isArray(cart) && cart.length > 0) {
      const total_price = cart.reduce((init, product) => {
        return (init += product.totalPriceProduct);
      }, 0);
      setTotalPrice(total_price);

      const total_quanity = cart.reduce((init, product) => {
        return (init += product.quantity);
      }, 0);
      setTotalQuantity(total_quanity);
    }
  }, [cart]);

  const getProductCart = async (userId) => {
    if (!userId) return;
    const dataCart = await cartServices.getCartByUserId(userId);
    setCart(dataCart);
  };

  return (
    <CartContext.Provider value={{ cart, getProductCart, totalPrice, totalQuanity }}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export default CartProvider;
