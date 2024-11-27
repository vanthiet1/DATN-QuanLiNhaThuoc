import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formOrderSchema from '../../../../utils/validations/formOrder';
import { UserContext } from '../../../../contexts/UserContext';
import { CartContext } from '../../../../contexts/CartContext';
import { showToastError, showToastSuccess } from '../../../../configs/toastConfig';
import orderServices from '../../../../services/orderService';
import { PAYMENT_METHODS_CODE } from '../../../../utils/constant/common';
import cartServices from '../../../../services/cartService';
import { uesCheckOutContext } from './CheckOutProvider';
import { useNavigate } from 'react-router-dom';

const CartFormContext = createContext();

export const useCartFormContext = () => {
  return useContext(CartFormContext);
};

const CartFormProvider = ({ children,setShowQrCode }) => {
  const [isLoadingCreateOrder, setIsLoadingCreateOrder] = useState(false);
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { address_state, handleOrderWithVnpay } = uesCheckOutContext();
  const [orderSuccsess,setOrderSuccsess] = useState({});
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formOrderSchema.order) });

  const { stateAddress } = address_state;

  const cartFormState = {
    handleSubmit,
    register,
    reset,
    errors,
    isLoadingCreateOrder
  };

  const handleSubmitForm = async (data) => {
    try {
      console.log(data);
      setIsLoadingCreateOrder(true);
      const { receiver, phone, street, prescriptionImage, ...orderDataRest } = data;
      const formData = new FormData();
      
      if (prescriptionImage) {
        formData.append('prescriptionImage', prescriptionImage[0]);
      }

      const ward = stateAddress[0];
      const district = stateAddress[1];
      const province = stateAddress[2];

      const productCart = {};

      if (Array.isArray(cart) && cart.length > 0) {
        productCart.total_price = cart.reduce((init, product) => {
          return (init += product.quantity * product?.productId?.price_distcount);
        }, 0);

        productCart.total_quantity = cart.reduce((init, product) => {
          return (init += product.quantity);
        }, 0);

        productCart.productList = cart;
      }

      const address_ = [street, stateAddress].join(',');
      const address = {
        street,
        province,
        district,
        ward,
        receiver,
        phone,
        address: address_
      };

      formData.append('address', JSON.stringify(address));
      formData.append('productCart', JSON.stringify(productCart));
      formData.append('user_id', user?._id);

      for (const key in orderDataRest) {
        if (orderDataRest[key]) {
          formData.append(key, orderDataRest[key]);
        }
      }

      if (orderDataRest.payment_method_id === PAYMENT_METHODS_CODE.VNPAY_ID) {
        const orderResponse = await orderServices.createOrder(formData);

        if (orderResponse && orderResponse.newOrder) {
          const { _id, order_date, total_price } = orderResponse.newOrder;
          await handleOrderWithVnpay({
            amount: total_price,
            orderDescription: `Đơn hàng được mua ngày ${order_date}`,
            orderType: 'other',
            language: 'vn',
            orderId: _id,
            order_date
          });
          reset();
        }
        setOrderSuccsess(orderResponse)
      } else if(orderDataRest.payment_method_id === PAYMENT_METHODS_CODE.BANK_ID && orderSuccsess ){
        await orderServices.createOrder(formData);
        setShowQrCode(true)
      }else{
        const orderNew = await orderServices.createOrder(formData);
        if (orderNew) {
          for (let productItem of cart) {
            await cartServices.deleteProductCartByUserId(user?._id, productItem.productId._id);
          }
          showToastSuccess( 'Đơn đã được đặt');
        }
        reset();
        navigate('/')
      }
    } catch (error) {
      showToastError('Đã xảy ra lỗi khi thanh toán ');
    } finally {
      setIsLoadingCreateOrder(false);
    }
  };

  return (
    <CartFormContext.Provider value={cartFormState}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>{children}</form>
    </CartFormContext.Provider>
  );
};
export default CartFormProvider;
