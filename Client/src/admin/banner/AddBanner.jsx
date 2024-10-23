import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formBannerSchema from '../../utils/validations/formBanner';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText, FileInput } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import bannerServices from '../../services/bannerService';
import { useState } from 'react';
import { ProcessLoading } from '../../components/ui/loaders';

const couponBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Add Banner'
  }
];

const FormAddBanner = () => {
  const [isLoadingCreateBanner, setIsLoadingCreateBanner] = useState('idle');
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formBannerSchema.bannerHero) });

  const handleCreate = async (data) => {
    const { bannerImg, name } = data;
    const formData = new FormData();
    formData.append('bannerImg', bannerImg[0]);
    formData.append('name', name);
    setIsLoadingCreateBanner(true);
    await bannerServices.addBanner(formData);
    setIsLoadingCreateBanner(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Banner name
              </label>
              <InputText size='m' rounded='s' placeholder='Banner name here' refinput={register('name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Banner url img
              </label>
              <FileInput refinput={register('bannerImg')} size='m' rounded='s'></FileInput>
              {errors.bannerImg && <ErrorMessage messsage={errors.bannerImg.message}></ErrorMessage>}
            </div>
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        leftIcon={<AppIcons.PlusIcon width='18' height='18' />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
        Create
      </Button>
      <ProcessLoading isLoading={isLoadingCreateBanner} message='Đang trong quá trình tải banner' />
    </form>
  );
};

const AddBanner = () => {
  return (
    <div>
      <SectionWrapper title='Add Banner' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={couponBreadCrumbs} />
        <FormAddBanner />
      </SectionWrapper>
    </div>
  );
};

export default AddBanner;
