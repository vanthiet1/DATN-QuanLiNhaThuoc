import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formOrderSchema from '../../../utils/validations/formOrder';

import { InputText, ErrorMessage, Textarea, InputRadio, FileInput } from '../../../components/ui/form';
import { Button } from '../../../components/ui/button';
import { CartOrderOffContext } from '../context/CartOrderOffProvider';

import AppIcons from '../../../components/ui/icon';
import useFetch from '../../../hooks/useFetch';
import paymentMethodServices from '../../../services/paymentMethodService';
import couponServices from '../../../services/couponService';
import formatsHelper from '../../../utils/helpers/formats';
import orderServices from '../../../services/orderService';
import { showToastError, showToastSuccess } from '../../../configs/toastConfig';
import CartDetailsShow from './CartDetailsShow';
import { Image } from '../../../components/ui/image';
import useAddress from '../../../hooks/useAddress';
import { ProcessLoading } from '../../../components/ui/loaders';
import { PAYMENT_METHODS_CODE } from '../../../utils/constant/common';

const SectionInforOrder = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formOrderSchema.order) });

  const {
    provinces,
    districts,
    wards,
    selectedProvice,
    selectedDistrict,
    stateAddress,
    setSelectedProvince,
    setSelectedDistrict,
    handleChangeValueWard
  } = useAddress();

  const { responsData: paymentMethodData } = useFetch(paymentMethodServices.getAllPaymentMethod, {}, []);
  const { responsData: couponsData } = useFetch(couponServices.getCouponsActive, {}, []);
  const [isLoadingCreateOrder, setIsLoadingCreateOrder] = useState(false);
  const { cartData, cartTotalPrice, cartQuanity, removeAllProduct, handleOrderWithVnpay } =
    useContext(CartOrderOffContext);

  const handleCreateOrderOff = async (data) => {
    try {
      console.log(data);
      setIsLoadingCreateOrder(true);
      const { receiver, phone, email, street, prescriptionImage, ...orderDataRest } = data;
      const formData = new FormData();
      if (prescriptionImage) {
        formData.append('prescriptionImage', prescriptionImage[0]);
      }

      let emailCustomer;
      if (email) {
        emailCustomer = email;
      } else {
        emailCustomer = receiver + phone + '@gmail.com';
      }

      const ward = stateAddress[0];
      const district = stateAddress[1];
      const province = stateAddress[2];

      if (!Array.isArray(cartData) || cartData.length === 0) {
        showToastError('Không thể tạo đơn hàng khi không có sản phẩm');
        return false;
      }

      const productCart = {};
      productCart.totalPrice = cartTotalPrice;
      productCart.quantity = cartQuanity;
      productCart.productList = cartData;
      const address_ = [street, ward, district, province].join(',');
      const address = {
        street,
        province,
        district,
        ward,
        receiver,
        phone,
        address: address_
      };
      formData.append('email', emailCustomer);
      formData.append('address', JSON.stringify(address));
      formData.append('productCart', JSON.stringify(productCart));
      for (const key in orderDataRest) {
        if (orderDataRest[key]) {
          formData.append(key, orderDataRest[key]);
        }
      }

      if (orderDataRest.payment_method_id === PAYMENT_METHODS_CODE.VNPAY_ID) {
        const orderResponse = await orderServices.createOrderOff(formData);
        if (orderResponse && orderResponse.newOrder) {
          const { _id, order_date, total_price } = orderResponse.newOrder;
          await handleOrderWithVnpay({
            amount: total_price,
            orderDescription: `Đơn hàng được mua ngày ${order_date}`,
            orderType: 'other',
            language: 'vn',
            orderId: _id,
            order_date
          });
          removeAllProduct();
          reset();
        }
      } else {
        const orderNew = await orderServices.createOrderOff(formData);
        if (orderNew) {
          showToastSuccess(orderNew.message || 'tạo đơn hàng thành công');
        }
        removeAllProduct();
        reset();
      }
    } catch (error) {
      showToastError('Đã xảy ra lỗi khi tạo đơn hàng');
    } finally {
      setIsLoadingCreateOrder(false);
    }
  };

  return (
    <section className='mt-4'>
      <form onSubmit={handleSubmit(handleCreateOrderOff)}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='col-span-2'>
            <h2 className='text-lg font-medium text-gray-700 mb-4'>Thông tin khách hàng</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              <div className='flex-col text-gray-700 hidden'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  kiểu bán
                </label>
                <InputText size='m' rounded='s' defaultValue='off' refinput={register('sale_type')} />
                {errors.sale_type && <ErrorMessage messsage={errors.sale_type.message}></ErrorMessage>}
              </div>
              <div className='flex flex-col text-gray-700'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Tên người mua
                </label>
                <InputText placeholder='Enter name cutomer here' size='m' rounded='s' refinput={register('receiver')} />
                {errors.receiver && <ErrorMessage messsage={errors.receiver.message}></ErrorMessage>}
              </div>
              <div className='flex flex-col text-gray-700'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Số điện thoại
                </label>
                <InputText placeholder='Enter phone cutomer here' size='m' rounded='s' refinput={register('phone')} />
                {errors.phone && <ErrorMessage messsage={errors.phone.message}></ErrorMessage>}
              </div>
              <div className='flex flex-col text-gray-700'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Email khách hàng (options)
                </label>
                <InputText placeholder='Enter email cutomer here' size='m' rounded='s' refinput={register('email')} />
                {errors.email && <ErrorMessage messsage={errors.email.message}></ErrorMessage>}
              </div>
              <div className='flex flex-col text-gray-700'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Tỉnh Thành
                </label>
                <select
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
              </div>
              <div className='flex flex-col text-gray-700'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Huyện
                </label>
                <select
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedProvice}
                  className=' border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
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
              </div>
              <div className='flex flex-col text-gray-700'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Thị Xã
                </label>
                <select
                  onChange={(e) => handleChangeValueWard(e.target.value)}
                  disabled={!selectedDistrict}
                  className='  border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
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
            </div>
            <CartDetailsShow />
          </div>
          <div className='right'>
            <div>
              <h2 className='text-lg font-medium text-gray-700 mb-4'>Phương thức thanh toán</h2>
              <div>
                {paymentMethodData &&
                  paymentMethodData.length > 0 &&
                  paymentMethodData.map((paymentMethod) => {
                    const { name, image, _id } = paymentMethod;
                    return (
                      <label htmlFor={_id} key={_id} className='cursor-pointer'>
                        <div className='card-payMethod flex items-center gap-3 mb-3'>
                          <InputRadio id={_id} refinput={register('payment_method_id')} defaultValue={_id} />
                          <Image src={image} width='36px' height='36px' alt={_id} />
                          <span>{name}</span>
                        </div>
                      </label>
                    );
                  })}
                {errors.payment_method_id && <ErrorMessage messsage={errors.payment_method_id.message}></ErrorMessage>}
              </div>
            </div>
            <div>
              <h2 className='text-lg font-medium text-gray-700 mb-4'>Sử dụng mã giảm giá</h2>
              <div>
                {couponsData &&
                  couponsData.length > 0 &&
                  couponsData.map((coupon) => {
                    const { _id, code, discount_value } = coupon;
                    return (
                      <label htmlFor={_id} key={_id}>
                        <div className='flex items-center gap-3 mb-3 '>
                          <InputRadio refinput={register('coupon_id')} id={_id} defaultValue={_id} />
                          <p>nhập mã {code}</p>
                          <span>Giảm {formatsHelper.currency(discount_value)}</span>
                        </div>
                      </label>
                    );
                  })}
              </div>
            </div>
            <div className='mt-8'>
              <Button
                type='submit'
                leftIcon={<AppIcons.OderIcon width='18' height='18' />}
                addClassNames='bg-cyan-700 text-white hover:bg-cyan-800 w-full'
                size='l'
                rounded='s'
              >
                Tiến hàng tạo đơn hàng mới
              </Button>
            </div>
          </div>
        </div>
      </form>
      <ProcessLoading isLoading={isLoadingCreateOrder} message='Đang trong quá trình tạo đơn hàng'></ProcessLoading>
    </section>
  );
};

export default SectionInforOrder;
