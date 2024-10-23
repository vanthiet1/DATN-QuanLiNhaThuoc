import React from 'react';
import CartProductList from './components/CartProductList';
import CheckoutForm from './components/CheckOutForm';
import PaymentMethod from './components/PaymentMethod';
import CouponSection from './components/CouponSection';
import { Link } from 'react-router-dom';
import AppIcons from '../../components/ui/icon/index';
import Transactions from './components/Transactions';
import { Button } from '../../components/ui/button';

const Cart = () => {
  return (
    <div className='container mx-auto p-4'>
      <div className='flex gap-2 pb-4 items-center'>
        <div>
          <Link to={'/'}>
            <AppIcons.HomeIcon />
          </Link>
        </div>
        <AppIcons.ArrowRight />
        <h1 className='text-[#6d6d6d] cursor-pointer'>Giỏ hàng</h1>
      </div>
      <h1 className='text-2xl font-bold mb-6'>Giỏ hàng của bạn</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          <CartProductList />
          <CheckoutForm />
        </div>

        <div className='lg:col-span-1'>
          <Transactions />
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
  );
};

export default Cart;
