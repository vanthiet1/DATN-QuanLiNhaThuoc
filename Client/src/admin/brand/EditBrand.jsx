import React, { useEffect } from 'react';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import brandServices from '../../services/brandService';
import formProductSchema from '../../utils/validations/formProduct';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';

const brandBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Edit Brand'
  }
];

const FormEditBrand = () => {
  const { id } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formProductSchema.brand) });

  useEffect(() => {
    const fetchBrand = async () => {
      const brandData = await brandServices.getBrandById(id);
      if (brandData) {
        setValue('name', brandData.name);
        setValue('origin_country', brandData.origin_country);
        setValue('country_made', brandData.country_made);
      }
    };
    fetchBrand();
  }, [id, setValue]);

  const navigate = useNavigate()

  const handleUpdate = async (data) => {
    await brandServices.updateBrand(id, data);
    navigate('/admin/all-brand');
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)} encType='multipart/form-data'>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
            <div>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Brand Name
                </label>
                <InputText size='m' rounded='s' placeholder='Type pharmacy name here' refinput={register('name')} />
                {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
              </div>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Brand origin country
                </label>
                <InputText
                  size='m'
                  rounded='s'
                  placeholder='Enter brand origin country old here'
                  refinput={register('origin_country')}
                />
                {errors.origin_country && <ErrorMessage messsage={errors.origin_country.message}></ErrorMessage>}
              </div>
              <div className='flex flex-col text-gray-700 mb-4'>
                <label htmlFor='' className='font-medium text-sm mb-2'>
                  Brand country made
                </label>
                <InputText
                  size='m'
                  rounded='s'
                  placeholder='Enter Pharmacy latitude here'
                  refinput={register('country_made')}
                />
                {errors.country_made && <ErrorMessage messsage={errors.country_made.message}></ErrorMessage>}
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
          Update
        </Button>
      </form>
    </>
  );
};


const EditBrand = () => {
    return (
      <div>
        <SectionWrapper title='Edit Brand' addClassNames={{ wrapper: 'mt-2' }}>
          <BreadCrumb crumbsData={brandBreadCrumb} />
          <FormEditBrand />
        </SectionWrapper>
      </div>
    );
  };
export default EditBrand;
