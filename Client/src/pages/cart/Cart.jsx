import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext'
import CheckoutForm from './components/CheckOutForm';
import PaymentMethod from './components/PaymentMethod';
import CouponSection from './components/CouponSection';
import AppIcons from '../../components/ui/icon/index';
import Transactions from './components/Transactions';
import formatsHelper from '../../utils/helpers/formats';
import cartServices from '../../services/cartService';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';

const Cart = () => {
  const { cart, getProductCart } = useContext(CartContext)
  const { user } = useContext(UserContext)
  const confirmDialog = useConfirmDialog();
  const handleDeleteProductCart = async (productId) => {
    if (!user && !productId) return;
    const result = await confirmDialog({
      title: 'Xóa sản phẩm',
      message: `Bạn có muốn xóa sản phẩm ra giỏ hàng không?`,
      confirmLabel: 'Xóa',
      cancelLabel: 'Hủy'
    });
    if(result){
      await cartServices.deleteProductCartByUserId(user?._id, productId)
      await getProductCart(user?._id)
    }
  }

  const handleUpdatePlusQuantity = async (productId) => {
    const product = cart.find(item => item.productId._id === productId);
    if (!product) return;
   
    const updatedQuantity = product?.quantity + 1;
    console.log(updatedQuantity);
    
   const data = await cartServices.updateQuantityCart({
      userId:user?._id,
      productId: productId,
      quantity:updatedQuantity
  });
  console.log(data);
  
    await getProductCart(user?._id);
  };
  
  // const handleUpdateMinusQuantity = async (productId) => {
  //   const product = cart.find(item => item.productId._id === productId);
  //   if (!product || product.quantity <= 1) return; 
  
  //   const updatedQuantity = product.quantity - 1; 
  //   await cartServices.updateQuantityCart(user?._id, productId, updatedQuantity);
  //   await getProductCart(user?._id);
  // };


  return (
    <>
 {cart?.length > 0 ?(
    <div className='container mx-auto'>
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
        {cart?.map((productCart) => (
          <div className='flex items-center border-b last:border-b-0 py-4 px-6 space-x-6 border border-gray-300'>
            <div className='w-20 h-20 flex justify-center items-center border border-gray-300 rounded-sm overflow-hidden'>
              <img src={productCart?.images[0]?.url_img} alt="" />
            </div>

            <div className='flex-1'>
              <p className='text-lg font-medium text-gray-800'>{productCart?.productId?.name}</p>
            </div>

            <div className='w-max flex items-center justify-between gap-3'>
              <button onClick={()=>handleUpdateMinusQuantity(productCart?.productId?._id)}  className='w-[50px] h-10 border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300'>
                -
              </button>
              <p className='w-[50px] h-10 flex items-center justify-center border border-gray-300 text-base font-semibold'>
                {productCart?.quantity}
              </p>
              <button onClick={()=>handleUpdatePlusQuantity(productCart?.productId?._id)} className='w-[50px] h-10 border border-gray-300 flex items-center justify-center text-lg font-bold text-blue-500 hover:text-blue-500 hover:border-blue-500 transition-all duration-300'>
                +
              </button>
            </div>
            <div className='w-[200px] text-right'>
              <span className='text-lg font-medium w-max text-gray-800'>{
                formatsHelper.currency(
                  productCart?.totalPriceProduct)}</span>
            </div>
            <div className='w-10 text-center'>
              <Button onClick={() => handleDeleteProductCart(productCart?.productId?._id)} addClassNames='text-red-600 hover:text-red-800 transition duration-200 text-[25px]'>×</Button>
            </div>
          </div>
        ))}
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
  ):(
   <div className="flex justify-center items-center">
         <div >
       <div className="flex justify-center">
       <img className='text-center w-[100px]' src="https://www.medigoapp.com/assets/images/empty-cart.png?v=55-14-14-10-2024" alt="" />
       </div>
     <span className='py-4 inline-block'>
      Chưa có sản phẩm trong giỏ hàng
     </span>
       <div className="flex justify-center">
       <Button addClassNames='bg-[#2563EB] text-[#fff] p-2 px-5 text-[16px] rounded-[5px]'>Xem sản phẩm</Button>
       </div>
         </div>
   </div>
  )}
    </>
 
  
  );
};
export default Cart;