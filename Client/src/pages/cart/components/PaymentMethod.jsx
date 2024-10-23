const PaymentMethod = () => (
  <div className='border-t py-6'>
    <h2 className='font-bold mb-4'>Chọn phương thức thanh toán</h2>
    <div className='space-y-4'>
      {['Thanh toán khi nhận hàng', 'Thanh toán trực tuyến'].map((method, index) => (
        <div key={index} className='flex items-center space-x-4 pb-4 border-b last:border-b-0'>
          <input type='radio' name='payment' className='h-4 w-4' />
          <div className='w-10 h-10 border border:bg-black rounded-md'>
            <img src='' alt='' className='w-8 h-8 object-cover' />
          </div>
          <label>{method}</label>
        </div>
      ))}
    </div>
  </div>
);

export default PaymentMethod;
