import React from 'react';
import { InputText } from '../../../../components/ui/form';
import { Button } from '../../../../components/ui/button';

function PersonalInfo() {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        <p className='text-sm text-gray-400 mb-1'>Tên đăng nhập</p>
        <InputText
          size='l'
          rounded='m'
          addClassNames='w-full sm:w-[75%] md:w-[50%] bg-gray-50 border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Chưa đăng nhập'
        />
      </div>
      <div>
        <p className='text-sm text-gray-400 mb-1'>ID người dùng</p>
        <InputText
          size='l'
          rounded='m'
          addClassNames='w-full sm:w-[75%] md:w-[50%] bg-gray-50 border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Chưa đăng nhập'
        />
      </div>
      <div>
        <p className='text-sm text-gray-400 mb-1'>Địa chỉ</p>
        <InputText
          size='l'
          rounded='m'
          addClassNames='w-full sm:w-[75%] md:w-[50%] bg-gray-50 border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Cập nhật địa chỉ'
        />
      </div>
      <div>
        <p className='text-sm text-gray-400 mb-1'>Điện thoại</p>
        <InputText
          size='l'
          rounded='m'
          addClassNames='w-full sm:w-[75%] md:w-[50%] bg-gray-50 border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Cập nhật điện thoại'
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 '>
  <Button
    size="m"
    rounded="l"
    addClassNames="bg-[#2563EB] text-[#fff] px-5 py-2 w-full sm:w-auto flex justify-center items-center"
    outline
  >
    Cập nhật
  </Button>
  <Button
    size="m"
    rounded="l"
    addClassNames="bg-gray-500 text-[#fff] opacity-50 px-5 py-2 w-full sm:w-auto flex justify-center items-center"
    outline
  >
    Hủy
  </Button>
</div>

    </div>
  );
}

export default PersonalInfo;
