const PaymentMethod = () => (
  <div className=''>
    <h2 className='font-bold mb-4'>Chọn phương thức thanh toán</h2>
    <div className='space-y-4'>
        <div  className='flex cursor-pointer  items-center gap-5 py-3 border-b last:border-b-0'>
          <input type='radio' name='payment' className='h-4 w-4' />
          <div className='w-10 h-10 border border:bg-black rounded-md'>
            <img src="" alt='' className='w-8 h-8 object-cover' />
          </div>
          <label>Thanh toán khi nhận hàng</label>
        </div>
        <div  className='flex cursor-pointer items-center gap-5 py-3  border-b last:border-b-0'>
          <input type='radio' name='payment' className='h-4 w-4' />
          <div className='w-10 h-10 border border:bg-black rounded-md'>
            <img src="" alt='' className='w-8 h-8 object-cover' />
          </div>
          <label> Thanh toán trực tuyến</label>
        </div>
    </div>
  </div>
);

export default PaymentMethod;
