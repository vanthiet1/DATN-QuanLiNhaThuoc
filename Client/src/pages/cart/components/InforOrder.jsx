import { Button } from '../../../components/ui/button';
import { useCartContext } from '../../../contexts/CartContext';
import formatsHelper from '../../../utils/helpers/formats';
import { uesCheckOutContext } from './context/CheckOutProvider';

const InforOrder = () => {
  const { couponCode } = uesCheckOutContext();
  const { totalPrice, totalQuanity } = useCartContext();

  return (
    <div className='border p-4 mt-6 rounded-[7px]'>
      <div className='font-bold text-lg pb-2'>Thông tin đơn hàng</div>
      <div className='flex justify-between py-1'>
        <p className=' text-base text-gray-700 font-medium'>Tổng đơn hàng</p>
        <p className='text-base text-gray-700 font-medium'>{formatsHelper.currency(totalPrice)}</p>
      </div>
      <div className='flex justify-between py-1'>
        <p className=' text-base text-gray-700 font-medium'>Số lượng</p>
        <p className='text-base text-gray-700 font-medium'>{totalQuanity}</p>
      </div>
      <div className=' border-t-2 mt-4 mb-4'>
        <div className='flex justify-between pt-4'>
          <p className='text-base font-semibold'>Tổng Tiền</p>
          <p className='text-base font-medium'>{formatsHelper.currency(totalPrice - couponCode)}</p>
        </div>
        <Button
          type='submit'
          size='l'
          rounded='s'
          addClassNames='flex bg-blue-500 text-white mt-4 w-full justify-center item-center hover:bg-blue-600 transition-all duration-300'
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default InforOrder;
