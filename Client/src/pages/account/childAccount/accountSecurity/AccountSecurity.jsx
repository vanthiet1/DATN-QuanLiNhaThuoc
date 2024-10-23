import React from 'react';
import { InputText } from '../../../../components/ui/form';
import { Button } from '../../../../components/ui/button';
import { Link } from 'react-router-dom';

function AccountSecurity() {
  return (
    <div className='flex flex-col gap-3 '>
      <div>
        <p className='text-sm text-gray-400 mb-1'>Email</p>
        <InputText
          size='l'
          rounded='m'
          addClassNames='w-full sm:w-[75%] md:w-[50%] bg-gray-50 border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Chưa đăng nhập'
        />
      </div>
      <div>
        <p className='text-sm text-gray-400 mb-1'>Số điện thoại</p>
        <InputText
          size='l'
          rounded='m'
          addClassNames='w-full sm:w-[75%] md:w-[50%] bg-gray-50 border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Chưa cập nhật số điện thoại'
        />
      </div>
      <div>
        <Button 
          size='m' 
          rounded='l' 
          addClassNames='bg-[#2563EB] text-[#fff] px-5 py-2 w-full sm:w-auto flex justify-center items-center' 
          outline
        >
          Xác thực
        </Button>
        <p className='mt-2'>
          Bạn không có nhu cầu sử dụng tài khoản này nữa?{' '}
          <Link to={'/tai-khoan/xoa-tai-khoan'} className='text-[#2563EB] font-bold'>
            Xóa tài khoản
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AccountSecurity;
