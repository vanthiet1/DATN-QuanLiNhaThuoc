import React from 'react';

const CartItem = ({ image, name, price, quantity }) => (
  <>
    <div className='flex items-center border-b last:border-b-0 py-4 px-6 space-x-6'>
      <div className='w-20 h-20 flex justify-center items-center border border-gray-300 rounded-sm overflow-hidden'>
        <img src={image} alt={name} className='w-16 h-16 object-cover' />
      </div>

      <div className='flex-1'>
        <p className='text-lg font-medium text-gray-800'>{name}</p>
      </div>

      <div className='w-28 flex items-center justify-between'>
        <button className='w-10 h-10 border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300'>
          -
        </button>
        <p className='w-10 h-10 flex items-center justify-center border border-gray-300 text-base font-semibold'>
          {quantity}
        </p>
        <button className='w-10 h-10 border border-gray-300 flex items-center justify-center text-lg font-bold text-blue-500 hover:text-blue-500 hover:border-blue-500 transition-all duration-300'>
          +
        </button>
      </div>
      <div className='w-24 text-right'>
        <p className='text-lg font-medium text-gray-800'>{price}</p>
      </div>
      <div className='w-10 text-center'>
        <button className='text-red-600 hover:text-red-800 transition duration-200'>×</button>
      </div>
    </div>
  </>
);

const CartProductList = () => {
  const products = [
    { name: 'Name product', price: '600.000đ', quantity: 10 },
    { name: 'Name product', price: '600.000đ', quantity: 10 }
  ];

  return (
    <div className='border p-3 space-y-3'>
      <div className='px-4 pt-4'>Nhà thuốc</div>
      {products.map((product, index) => (
        <CartItem key={index} {...product} />
      ))}
    </div>
  );
};

export default CartProductList;
