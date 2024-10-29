import { useState, useContext, useEffect, createContext } from 'react';
import cartServices from '../services/cartService';
import { ToggleFormContext } from './ToggleFormContext';
import { CartContext } from './CartContext';
import { showToastError } from '../configs/toastConfig';

export const HandleCartContext = createContext();

const HandleCartProvider = ({ children }) => {
  const { handleOpenDialog } = useContext(ToggleFormContext) || {};
  const { getProductCart } = useContext(CartContext) || {};
  const [quantityProductDetail, setQuantityProductDetail] = useState(1);
  const [calculateTotalPrice, setCalculateTotalPrice] = useState(0);
  

  const handlePlusQuantity = () => {
    setQuantityProductDetail(prev => prev + 1);
  };

  const handleMinusQuantity = () => {
    if (quantityProductDetail <= 1) return;
    setQuantityProductDetail(prev => prev - 1);
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    setQuantityProductDetail(value);
  };

  const handleAddToCart = async (productId,userId) => {
    if(!productId) return
    if (!userId) {
      return showToastError("Vui lòng đăng nhập")
    }

    const cart = {
      userId,
      products: [
        {
          productId,
          quantity: quantityProductDetail,
        }
      ]
    };

    if (!cart) return;

    const dataCart = await cartServices.addToCart(cart);
    if (!dataCart) return;

    await getProductCart(userId);
    handleOpenDialog('notificationModal'); 
  };



  const featureCart = {
    handlePlusQuantity,
    handleMinusQuantity,
    handleAddToCart,
    setCalculateTotalPrice,
    handleQuantityChange,
    calculateTotalPrice,
    quantityProductDetail,
  };

  return (
    <HandleCartContext.Provider value={featureCart}>
      {children}
    </HandleCartContext.Provider>
  );
};

export default HandleCartProvider;
