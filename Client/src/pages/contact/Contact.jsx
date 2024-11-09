import { InputText } from '../../components/ui/form';
import Logo from '../../assets/images/logo/logo.png';
import React from 'react';
import TextArea from '../../components/ui/form/Textarea';
import { Link } from 'react-router-dom';
import AppIcons from '../../components/ui/icon/index';

const Contact = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-[1300px] w-full px-4 flex gap-2 pb-6 mr-7 items-center'>
        <Link to={'/'}>
          <div className='flex'>
            <AppIcons.HomeIcon addClassNames='mr-2' /> Trang chủ
          </div>
        </Link>
        <AppIcons.ArrowRight />
        <h1 className='text-[#6d6d6d] cursor-pointer'>Liên hệ</h1>
      </div>

      {/* Center-aligned contact form container */}
      <div className='max-w-[1300px] w-full bg-white shadow-lg rounded-lg overflow-hidden flex'>
        <div className='w-1/2'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8434884883784!2d108.16939516175496!3d16.05187257427279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142196d9a203685%3A0x4e8027fe58d65525!2zQ2FvIMSR4bqzbmcgRlBUIEPGoSBT4bufIDI!5e0!3m2!1sen!2s!4v1729920380676!5m2!1sen!2s'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>

        <div className='w-1/2 p-8 bg-gray-50'>
          <div className='flex items-center mb-6'>
            <img src={Logo} alt='Logo' className='w-30 h-16 mr-4' />
            <div>
              <div className='flex mb-2'>
                <AppIcons.LocationIcon addClassNames='text-[#2563EB] w-10 h-6 mr-1' />
                <p className='flex text-base'>116 Nguyễn Huy Tưởng, Hoà An, Liên Chiểu, TP.Đà Nẵng</p>
              </div>
              <div className='flex mb-2'>
                <AppIcons.PhoneIcon addClassNames='text-[#2563EB] w-10 h-5 mr-1' />
                <p className='flex text-base'>076 922 0162</p>
              </div>
              <div className='flex mb-2'>
                <AppIcons.EmailIcon addClassNames='text-[#2563EB] w-10 h-5 mr-1' />
                <p className='flex text-base'>binhanduoc@gmail.com</p>
              </div>
              <div className='flex mb-2'>
                <AppIcons.FacebookIcon addClassNames='text-[#2563EB] w-10 h-5 mr-1' />
                <p className='flex text-base'>Bình An Dược</p>
              </div>
            </div>
          </div>

          <h2 className='text-2xl text-center font-semibold mb-4'>LIÊN HỆ VỚI CHÚNG TÔI</h2>
          <form>
            <div className='grid grid-cols-2 gap-4'>
              <InputText addClassNames='flex-1' size='l' rounded='s' placeholder='Họ và tên' />
              <InputText type='email' placeholder='Email' size='l' rounded='s' />
              <InputText type='text' placeholder='Số điện thoại' size='l' rounded='s' />
              <InputText type='text' placeholder='Địa chỉ' size='l' rounded='s' />
            </div>
            <TextArea addClassNames='mt-4' placeholder='Lời nhắn' rounded='s' />
            <div className='flex justify-center mt-4'>
              <button type='submit' className='bg-[#2563EB] text-white rounded py-2 px-[150px]'>
                GỬI
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
