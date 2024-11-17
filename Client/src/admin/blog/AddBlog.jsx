import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import formBlogSchema from '../../utils/validations/formBlog';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText, FileInput, Textarea } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import blogServices from '../../services/blogService';

const brandBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='18' height='18' />
  },
  {
    title: 'Add Blog'
  }
];

const FormAddBlog = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formBlogSchema.blog) });

  const handleCreateBlog = async (data) => {
    console.log(data);
    // await blogServices.addBlog(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreateBlog)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Blog Image
              </label>
              <FileInput size='m' rounded='s' placeholder='Type Blog FileInput here' refinput={register('image')} />
              {errors.image && <ErrorMessage messsage={errors.image.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Blog title
              </label>
              <InputText size='m' rounded='s' placeholder='Type   Blog title here' refinput={register('title')} />
              {errors.title && <ErrorMessage messsage={errors.title.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Blog description
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Enter blog description here'
                refinput={register('description')}
              />
              {errors.description && <ErrorMessage messsage={errors.description.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Blog content
              </label>
              <Textarea size='m' rounded='s' placeholder='Enter content here' refinput={register('content')} />
              {errors.content && <ErrorMessage messsage={errors.content.message}></ErrorMessage>}
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
    </form>
  );
};

const AddBlog = () => {
  return (
    <div>
      <SectionWrapper title='Add Blog' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={brandBreadCrumb} />
        <FormAddBlog />
      </SectionWrapper>
    </div>
  );
};

export default AddBlog;
