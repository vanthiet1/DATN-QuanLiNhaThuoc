import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import formProductSchema from '../../utils/validations/formProduct';
import { ErrorMessage, InputDate, InputText } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import couponServices from '../../services/couponService';
import { useNavigate } from 'react-router-dom';
import formatsHelper from '../../utils/helpers/formats';

const couponBreadCrumbs = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Edit Coupon'
  }
];

const FormEditCoupon = () => {
  const { id } = useParams();
  console.log(id);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formProductSchema.coupon) });

  useEffect(() => {
    const fetchCoupon = async () => {
      const couponData = await couponServices.getCouponById(id);

      if (couponData) {
        setValue('code', couponData.code);
        setValue('start_date', new Date(couponData.start_date).toISOString().split('T')[0]); 
        setValue('end_date', new Date(couponData.end_date).toISOString().split('T')[0]);
        setValue('is_active', couponData.is_active);
        setValue('discount_value', couponData.discount_value);
      }
    };
    fetchCoupon();
  }, [id, setValue]);

  const navigate = useNavigate();

  const handleUpdate = async (data) => {
    await couponServices.updateCoupon(id, data);
    navigate('/admin/all-coupon');
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon code
              </label>
              <InputText size='m' rounded='s' placeholder='Coupon code here' refinput={register('code')} />
              {errors.code && <ErrorMessage message={errors.code.message} />}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon start date
              </label>
              <InputDate size='m' rounded='s' refinput={register('start_date')} />
              {errors.start_date && <ErrorMessage message={errors.start_date.message} />}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon end date
              </label>
              <InputDate size='m' rounded='s' refinput={register('end_date')} />
              {errors.end_date && <ErrorMessage message={errors.end_date.message} />}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Is Active
              </label>
              <input
                type='checkbox'
                {...register('is_active')}
                className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Coupon discount value
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter coupon discount value here'
                refinput={register('discount_value')}
              />
              {errors.discount_value && <ErrorMessage message={errors.discount_value.message} />}
            </div>
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        // leftIcon={<AppIcons.EditIcon width="18" height="18" />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
        Update
      </Button>
    </form>
  );
};

const EditCoupon = () => {
  return (
    <div>
      <SectionWrapper title='Edit Coupon' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={couponBreadCrumbs} />
        <FormEditCoupon />
      </SectionWrapper>
    </div>
  );
};

export default EditCoupon;
