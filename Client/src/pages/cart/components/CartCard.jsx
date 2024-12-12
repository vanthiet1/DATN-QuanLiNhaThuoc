import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import formatsHelper from '../../../utils/helpers/formats';
import { uesCheckOutContext } from './context/CheckOutProvider';

const CartCard = ({ productCart }) => {
  const { handleQuantityChange, handleDeleteProductCart, quantities } = uesCheckOutContext();
  return (
    <>
      <div className='flex items-center border-b py-4 px-4 space-x-6 border border-gray-300 rounded-md max-md:flex-col max-md:mb-2 mb-2'>
        <div className='w-20 h-20 max-md:w-full max-md:h-full flex justify-center items-center border border-gray-300 overflow-hidden rounded-md max-md:border-none'>
          <img className='w-[100px]' src={productCart?.images[0]?.url_img} alt='' />
        </div>
        <div className='flex-1'>
          <Link to={`/product/${productCart?.productId?.slug}`}>
            <p className='text-[16px] font-semibold text-gray-800'>{productCart?.productId?.name}</p>
          </Link>
        </div>

        <div className='w-max flex items-center gap-3 max-md:my-3 max-md:pr-5 max-md:w-full'>
          <Button
            type='button'
            onClick={() => handleQuantityChange(productCart?.productId._id, -1)}
            className='w-[40px] max-md:w-[40%] h-10 border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-400  transition-all rounded-[5px] hover:bg-[#2563EB] hover:text-[#fff] duration-300'
          >
            -
          </Button>
          <input
            type='text'
            value={quantities[productCart?.productId?._id] || productCart?.quantity}
            readOnly
            className='max-md:w-[20%] w-[40px] h-10 text-center border rounded-[5px]'
          />
          <Button
            type='button'
            onClick={() => handleQuantityChange(productCart?.productId?._id, 1)}
            className='max-md:w-[40%] w-[40px]  h-10 border flex items-center justify-center text-lg font-bold text-blue-500 transition-all rounded-[5px] hover:bg-[#2563EB] hover:text-[#fff] duration-300'
          >
            +
          </Button>
        </div>

       <div className='flex items-center gap-5'>

       <div className='w-[200px] text-right max-md:w-full'>
          <span className='text-sm font-medium text-gray-800'>
            {formatsHelper.currency(productCart?.totalPriceProduct)}
          </span>
        </div>

        <div className='w-[100px] text-center'>
          <Button
            type='button'
            onClick={() => handleDeleteProductCart(productCart?.productId?._id)}
            addClassNames='text-red-600 hover:text-red-800 transition duration-200 text-[25px]'
          >
            ×
          </Button>
        </div>
       </div>
      </div>
    </>
  );
};

export default CartCard;
