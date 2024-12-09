import { createContext, useContext, useRef, useEffect, useState } from 'react';
import { useUserContext } from '../../../../contexts/UserContext';
import { useConfirmDialog } from '../../../../components/dialog/ConfirmDialogContext';
import cartServices from '../../../../services/cartService';
import vnpayServices from '../../../../services/vnpayService';
import useAddress from '../../../../hooks/useAddress';
import { useCartContext } from '../../../../contexts/CartContext';

const CheckOutContext = createContext();

const CheckOutProvider = ({ children }) => {
  const { user } = useUserContext();
  const { cart, getProductCart } = useCartContext();
  const confirmDialog = useConfirmDialog();
  const debounceTimeout = useRef(null);

  const [quantities, setQuantities] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [couponCode, setCouponCode] = useState(0);

  useEffect(() => {
    const initialQuantities = cart?.reduce((initialValue, item) => {
      initialValue[item.productId._id] = item.quantity;
      return initialValue;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const handleUpdateQuantity = async (productId, quantity) => {
    setUpdateLoading(true);
    try {
      await cartServices.updateQuantityCart({
        userId: user._id,
        productId,
        quantity
      });
      await getProductCart(user._id);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[productId] || 0) + change);

      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        handleUpdateQuantity(productId, newQuantity);
      }, 500);

      return {
        ...prev,
        [productId]: newQuantity
      };
    });
  };

  const handleDeleteProductCart = async (productId) => {
    const result = await confirmDialog({
      title: 'Xóa sản phẩm',
      message: 'Bạn có muốn xóa sản phẩm ra giỏ hàng không?',
      confirmLabel: 'Xóa',
      cancelLabel: 'Hủy'
    });
    if (result) {
      await cartServices.deleteProductCartByUserId(user?._id, productId);
      await getProductCart(user?._id);
    }
  };

  const handleOrderWithVnpay = async (dataPayment) => {
    const response = await vnpayServices.createPayment(dataPayment);
    window.location.href = response.paymentUrl;
  };

  const handleApplyCoupon = (e, discount_value) => {
    if (e.target.checked) {
      setCouponCode(discount_value);
    }
  };

  const address_state = useAddress();

  const checkOutState = {
    handleQuantityChange,
    handleDeleteProductCart,
    handleUpdateQuantity,
    handleApplyCoupon,
    handleOrderWithVnpay,
    quantities,
    updateLoading,
    couponCode,
    address_state
  };

  return <CheckOutContext.Provider value={checkOutState}>{children}</CheckOutContext.Provider>;
};

export const uesCheckOutContext = () => {
  return useContext(CheckOutContext);
};

export default CheckOutProvider;
