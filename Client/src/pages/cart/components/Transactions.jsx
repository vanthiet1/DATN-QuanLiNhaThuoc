import React from 'react';

const Transactions = () => {
  const transition = [
    {
      method: 'Tiêu chuẩn',
      time: 'Giao 3-5 ngày',
      price: 25000
    },
    { method: 'Hoả tốc', time: 'Giao 1-2 ngày', price: 35000 }
  ];

  return (
    <div className='border-b pb-6'>
      <h2 className='font-bold mb-4'>Chọn phương thức vận chuyển</h2>
      <div className='space-y-4'>
        {transition.map((tran, index) => (
          <div key={index} className='flex items-center space-x-4 pb-4 w-full border-b last:border-b-0'>
            <input type='radio' name='payment' className='h-4 w-4' />
            <div className="w-full flex justify-between items-center">
              <div className='flex flex-col'>
                <label className='font-bold'>{tran.method}</label>
                <label className='italic text-sm text-gray-500'>({tran.time})</label>
              </div>
              <p className="right-3">{tran.price} VNĐ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
