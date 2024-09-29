import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formBannerSchema from '../../utils/validations/formBanner';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText, FileInput } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { useState } from 'react';

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
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formBannerSchema.bannerHero) });

  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCreate = async (data) => {
    reset();
  };

  const handleChangeValueImg = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
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
              <FileInput onChange={(e) => handleChangeValueImg(e)}></FileInput>
              {errors.url_img && <ErrorMessage messsage={errors.url_img.message}></ErrorMessage>}
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
