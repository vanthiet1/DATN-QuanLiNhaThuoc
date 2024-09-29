import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import formPharmacySchema from '../../utils/validations/formPharmacy';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { Button } from '../../components/ui/button';
import { ErrorMessage, InputText } from '../../components/ui/form';
import pharmacyServices from '../../services/pharmacyService';

const pharamcyBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Add pharmacy'
  }
];

const FormAddPharmacy = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formPharmacySchema.pharmacy) });

  const handleCreateProduct = async (data) => {
    await pharmacyServices.createPharmacy(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreateProduct)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Pharmacy Name
              </label>
              <InputText size='m' rounded='s' placeholder='Type pharmacy name here' refinput={register('name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Pharmacy address
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter pharmacy address old here'
                refinput={register('address')}
              />
              {errors.address && <ErrorMessage messsage={errors.address.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Pharmacy latitude
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter Pharmacy latitude here'
                refinput={register('latitude')}
              />
              {errors.latitude && <ErrorMessage messsage={errors.latitude.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Pharmacy longitude
              </label>
              <InputText size='m' rounded='s' placeholder='Enter pharmacy longitude' refinput={register('longitude')} />
              {errors.longitude && <ErrorMessage messsage={errors.longitude.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Pharmacy phone number
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter pharmacy phone number'
                refinput={register('phone_number')}
              />
              {errors.phone_number && <ErrorMessage messsage={errors.phone_number.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Pharmacy opening hours
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter pharmacy opening hours'
                refinput={register('opening_hours')}
              />
              {errors.opening_hours && <ErrorMessage messsage={errors.opening_hours.message}></ErrorMessage>}
            </div>
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        // leftIcon={<AppIcons.PlusIcon width='18' height='18' />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
        Create
      </Button>
    </form>
  );
};

const AddPharmacy = () => {
  return (
    <div>
      <SectionWrapper title='add pharmacy' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={pharamcyBreadCrumbs} />
        <FormAddPharmacy />
      </SectionWrapper>
    </div>
  );
};

export default AddPharmacy;
