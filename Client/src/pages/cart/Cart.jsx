import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { useCartContext } from '../../contexts/CartContext';
import CheckoutForm from './components/CheckOutForm';
import PaymentMethod from './components/PaymentMethod';
import CouponSection from './components/CouponSection';
import { SpinnerLoading } from '../../components/ui/loaders';
import useSrcollTop from '../../hooks/useSrcollTop';
import { PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import CartFormProvider from './components/context/CartFormProvider';
import InforOrder from './components/InforOrder';
import CartCard from './components/CartCard';
import CheckOutProvider, { uesCheckOutContext } from './components/context/CheckOutProvider';
import BankCheckout from './components/BankCheckout';
import SuccessAnimation from '../../components/notification-bell/SuccsessAnimation';


const AddLoadingCart = () => {
  const { updateLoading } = uesCheckOutContext();
  return (
    <>
      {updateLoading && (
        <div className=' flex justify-center items-center bg-opacity-50 z-50 fixed left-0  w-[100%] bg-[#d8d8d8] h-full top-0'>
          <div className='loader'>
            <SpinnerLoading />.
          </div>
        </div>
      )}
    </>
  );
};

const Cart = () => {
  useSrcollTop();
  const { cart } = useCartContext();
  const [showQrCode, setShowQrCode] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false); 

  return (
    <>
      {showSuccessAnimation && <SuccessAnimation />} 
      <CheckOutProvider>
        <AddLoadingCart />
        <CartFormProvider setShowQrCode={setShowQrCode}>
          {cart?.length > 0 ? (
            <div className='container mx-auto'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='lg:col-span-2 space-y-6'>
                  <div className={` ${cart?.length > 1 && 'max-md:h-[600px] max-md:overflow-scroll'} `}>
                    {cart?.map((productCart) => {
                      return <CartCard key={productCart?.productId?._id} productCart={productCart} />
                    })}

                  </div>
                  <CheckoutForm />
                </div>
                <div className='lg:col-span-1'>
                  <PaymentMethod />
                  <CouponSection />
                  <InforOrder />
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center'>
              <div>
                <div className='flex justify-center'>
                  <img
                    className='w-[100px]'
                    src='https://www.medigoapp.com/assets/images/ empty-cart.png?v=19-10-15-10-2024'
                    alt=''
                  />
                </div>
                <span className='block text-center py-4 '>Chưa có sản phẩm trong giỏ hàng</span>
                <div className='flex  justify-center'>
                  <Link to={`/${PATH_ROUTERS_CLIENT.ALL_PRODUCT}`}>
                    <Button addClassNames='bg-[#2563eb] p-3 text-[16px] text-[#fff] rounded-lg'>Xem sản phẩm</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {showQrCode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <BankCheckout showSuccessAnimation={showSuccessAnimation} setShowSuccessAnimation={setShowSuccessAnimation} setShowQrCode={setShowQrCode}  />
              </div>
            </div>
          )}
        </CartFormProvider>
      </CheckOutProvider>
    </>
  );
};

export default Cart;
