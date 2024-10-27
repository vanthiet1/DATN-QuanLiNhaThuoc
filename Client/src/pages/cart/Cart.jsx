import React, { useContext, useEffect, useState , useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import CheckoutForm from './components/CheckOutForm';
import PaymentMethod from './components/PaymentMethod';
import CouponSection from './components/CouponSection';
import AppIcons from '../../components/ui/icon/index';
import Transactions from './components/Transactions';
import formatsHelper from '../../utils/helpers/formats';
import cartServices from '../../services/cartService';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import debounce from '../../hooks/useDebounce';
import { SpinnerLoading } from '../../components/ui/loaders';
import useSrcollTop from '../../hooks/useSrcollTop';

const Cart = () => {
  useSrcollTop()
  const { cart, getProductCart } = useContext(CartContext);
  const { user } = useContext(UserContext) || { user: null };
  const confirmDialog = useConfirmDialog();
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false); 
  const debounceTimeout = useRef(null);
 
  useEffect(() => {
    const initialQuantities = cart?.reduce((acc, item) => {
      acc[item.productId._id] = item.quantity;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[productId] || 0) + change);
      
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        handleUpdateQuantity(productId, newQuantity);
      }, 500);

      return {
        ...prev,
        [productId]: newQuantity,
      };
    });
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    setLoading(true); 
    try {
      await cartServices.updateQuantityCart({
        userId: user._id,
        productId,
        quantity,
      });
      await getProductCart(user._id); 
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProductCart = async (productId) => {
    const result = await confirmDialog({
      title: 'Xóa sản phẩm',
      message: 'Bạn có muốn xóa sản phẩm ra giỏ hàng không?',
      confirmLabel: 'Xóa',
      cancelLabel: 'Hủy',
    });
    if (result) {
      await cartServices.deleteProductCartByUserId(user?._id, productId);
      await getProductCart(user?._id);
    }
  };

  
  return (
    <>
      {loading && (
        <div className=" flex justify-center items-center bg-opacity-50 z-50 fixed left-0  w-[100%] bg-[#d8d8d8] h-full top-0">
          <div className="loader">
          <SpinnerLoading/>
          .</div> 
        </div>
      )}
      {cart?.length > 0 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((productCart) => (
                <div
                  key={productCart.productId._id}
                  className="flex items-center border-b py-4 px-6 space-x-6 border border-gray-300 rounded-md"
                >
                  <div className="w-20 h-20 flex justify-center items-center border border-gray-300 overflow-hidden rounded-md">
                    <img src={productCart.images[0]?.url_img} alt="" />
                  </div>

                  <div className="flex-1">
                   <Link to={`/product/${productCart?.productId?.slug}`}>
                   <p className="text-[16px] font-semibold text-gray-800">
                      {productCart.productId.name}
                    </p>
                   </Link>
                  </div>

                  <div className="w-max flex items-center gap-3">
                    <Button
                      onClick={() => handleQuantityChange(productCart.productId._id, -1)}
                      className="w-[50px] h-10 border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-400 hover:text-blue-500 transition-all"
                    >
                      -
                    </Button>
                    <input
                      type="text"
                      value={quantities[productCart.productId._id] || productCart.quantity}
                      readOnly
                      className="w-[50px] h-10 text-center border"
                    />
                    <Button
                      onClick={() => handleQuantityChange(productCart.productId._id, 1)}
                      className="w-[50px] h-10 border flex items-center justify-center text-lg font-bold text-blue-500 transition-all"
                    >
                      +
                    </Button>
                  </div>

                  <div className="w-[200px] text-right">
                    <span className="text-lg font-medium text-gray-800">
                      {formatsHelper.currency(productCart.totalPriceProduct)}
                    </span>
                  </div>

                  <div className="w-10 text-center">
                    <Button
                      onClick={() => handleDeleteProductCart(productCart.productId._id)}
                      addClassNames="text-red-600 hover:text-red-800 transition duration-200 text-[25px]"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
              <CheckoutForm />
            </div>
            <div className='lg:col-span-1'>
        {/* <Transactions /> */}
        <PaymentMethod />
        <CouponSection />
        <div className='border p-4 mt-6'>
          <div className='font-bold text-lg pb-2'>Thông tin đơn hàng</div>
          <div className='flex justify-between py-1'>
            <p className=' text-base font-medium'>Tổng đơn hàng</p>
            <p className='text-base font-medium'>1,800.000đ</p>
          </div>
          <div className='flex justify-between py-1'>
            <p className=' text-base font-medium'>Phí vận chuyển</p>
            <p className='text-base font-medium'>35.000đ</p>
          </div>
          <div className='flex justify-between py-1'>
            <p className='text-base font-medium'>Giảm giá</p>
            <p className='text-base font-medium'>35.000đ</p>
          </div>
          <div className=' border-t-2 mt-4 mb-4'>
            <div className='flex justify-between pt-4'>
              <p className='text-base font-semibold'>Tổng Tiền</p>
              <p className='text-base font-medium'>35.000đ</p>
            </div>
            <Button size='l' rounded='s' addClassNames='flex bg-blue-500 text-white mt-4 w-full justify-center item-center hover:bg-blue-600 transition-all duration-300'>Thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
          </div>
      ) : (
        <div className="flex justify-center items-center">
             <div>
               <div className="flex justify-center">
               <img className='w-[100px]' src="https://www.medigoapp.com/assets/images/empty-cart.png?v=19-10-15-10-2024" alt="" />
               </div>
               <span className='block text-center py-4 '>Chưa có sản phẩm trong giỏ hàng</span>
              <div className="flex  justify-center">
              <Button addClassNames='bg-[#2563eb] p-3 text-[16px] text-[#fff] rounded-lg'>Xem sản phẩm</Button>
              </div>
             </div>
        </div>
      )}
    </>
  );
};


export default Cart;
