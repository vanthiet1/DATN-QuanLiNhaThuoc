import { InputText, FileInput, Textarea, ErrorMessage } from '../../../components/ui/form';
import { useCartFormContext } from './context/CartFormProvider';
import { uesCheckOutContext } from './context/CheckOutProvider';

const CheckoutForm = () => {
  const { register, errors } = useCartFormContext();
  const { address_state } = uesCheckOutContext();
  const {
    provinces,
    districts,
    wards,
    selectedProvice,
    selectedDistrict,
    setSelectedProvince,
    setSelectedDistrict,
    handleChangeValueWard
  } = address_state;

  return (
    <div className='space-y-6 border-t py-6 '>
      <div>
        <h2 className='font-bold mb-4'>Thông tin khách hàng</h2>
        <div className='grid grid-cols-1 max-md:grid-cols-2 gap-4'>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Họ và tên người nhận
            </label>
            <InputText size='m' rounded='s' placeholder='Nguyễn Văn A' refinput={register('receiver')} />
            {errors.receiver && <ErrorMessage messsage={errors.receiver.message}></ErrorMessage>}
          </div>
          <div className='flex flex-col text-gray-700 mb-4 max-md:mb-0'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Số điện thoại
            </label>
            <InputText size='m' rounded='s' placeholder='0915328855' refinput={register('phone')} />
            {errors.phone && <ErrorMessage messsage={errors.phone.message}></ErrorMessage>}
          </div>
          <div className='flex flex-col text-gray-700 mb-4 col-span-2'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Email (không bắt buộc)
            </label>
            <InputText size='m' rounded='s' placeholder='VanA@gmail.com' refinput={register('email')} />
            {errors.email && <ErrorMessage messsage={errors.email.message}></ErrorMessage>}
          </div>
        </div>
      </div>
      <div>
        <h2 className='font-bold mb-4'>Địa chỉ nhận hàng</h2>
        <div className='grid grid-cols-3 max-md:grid-cols-3 gap-4'>
          <div className='flex flex-col text-gray-700'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Tỉnh Thành
            </label>
            <select
              {...register('province')}
              onChange={(e) => setSelectedProvince(e.target.value)}
              id='province'
              className='border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
            >
              <option value=''>-- Chọn Tỉnh/Thành phố --</option>
              {provinces.length > 0 &&
                provinces.map((province) => {
                  return (
                    <option value={province.id} key={province.id}>
                      {province.full_name}
                    </option>
                  );
                })}
            </select>
            {errors.province && <ErrorMessage messsage={errors.province.message}></ErrorMessage>}
          </div>
          <div className='flex flex-col text-gray-700'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Huyện
            </label>
            <select
              {...register('district')}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedProvice}
              className='border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
            >
              <option value=''>-- Chọn Quận/Huyện --</option>
              {districts.length > 0 &&
                districts.map((district) => {
                  return (
                    <option value={district.id} key={district.id}>
                      {district.full_name}
                    </option>
                  );
                })}
            </select>
            {errors.district && <ErrorMessage messsage={errors.district.message}></ErrorMessage>}
          </div>
          <div className='flex flex-col text-gray-700'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Thị Xã
            </label>
            <select
              {...register('ward')}
              onChange={(e) => handleChangeValueWard(e.target.value)}
              disabled={!selectedDistrict}
              className='border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
            >
              <option value=''>-- Chọn Phường/Xã --</option>
              {wards.length > 0 &&
                wards.map((ward) => {
                  return (
                    <option value={ward.id} key={ward.id}>
                      {ward.full_name}
                    </option>
                  );
                })}
            </select>
            {errors.ward && <ErrorMessage messsage={errors.ward.message}></ErrorMessage>}
          </div>
          <div className='flex flex-col text-gray-700 col-span-3'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Địa chỉ đường
            </label>
            <InputText placeholder='Enter street cutomer here' size='m' rounded='s' refinput={register('street')} />

            {errors.street && <ErrorMessage messsage={errors.street.message}></ErrorMessage>}
          </div>
          <div className='flex flex-col text-gray-700'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Đơn thuốc khách hàng (options)
            </label>
            <FileInput refinput={register('prescriptionImage')} size='m' rounded='s'></FileInput>

            {errors.prescriptionImage && <ErrorMessage messsage={errors.prescriptionImage.message}></ErrorMessage>}
          </div>
          <div className='flex flex-col text-gray-700 col-span-3 mb-4'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Ghi chú của khách hàng (options)
            </label>
            <Textarea placeholder='Enter email cutomer here' size='m' rounded='s' refinput={register('note')} />
            {errors.note && <ErrorMessage messsage={errors.note.message}></ErrorMessage>}
          </div>
          <div className='flex-col text-gray-700 hidden'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              kiểu bán
            </label>
            <InputText size='m' rounded='s' defaultValue='online' refinput={register('sale_type')} />
            {errors.sale_type && <ErrorMessage messsage={errors.sale_type.message}></ErrorMessage>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
