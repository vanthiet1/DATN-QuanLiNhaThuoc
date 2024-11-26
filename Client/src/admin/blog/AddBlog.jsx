import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import formBlogSchema from '../../utils/validations/formBlog';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText, FileInput } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import blogServices from '../../services/blogService';
import { ProcessLoading } from '../../components/ui/loaders';
import { UserContext } from '../../contexts/UserContext';
import Editor from '../../components/ui/editor/Editor'; // Import Editor

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
  const { user } = useContext(UserContext);
  const [isLoadingCreateBlog, setIsLoadingCreateBlog] = useState('idle');
  const [contentValue, setContentValue] = useState('');
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formBlogSchema.blog) });

  const handleCreateBlog = async (data) => {
    const { title, image, description } = data;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image[0]);
    formData.append('description', description);
    formData.append('content', contentValue);
    formData.append('user_id', user?._id);

    setIsLoadingCreateBlog(true);
    await blogServices.addBlog(formData);
    setIsLoadingCreateBlog(false);
    reset();
    setContentValue('');
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
                Blog Title
              </label>
              <InputText size='m' rounded='s' placeholder='Type Blog title here' refinput={register('title')} />
              {errors.title && <ErrorMessage messsage={errors.title.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Blog Description
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
                Blog Content
              </label>
              <Editor
                name='content'
                editorLoaded={true}
                onChange={(value) => {
                  setContentValue(value);
                }}
              />

              {contentValue && (
                <div className='font-normal mt-2 w-full p-2 text-sm text-gray-800 border border-slate-300 border-solid '>
                  {contentValue}
                </div>
              )}
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
      <ProcessLoading isLoading={isLoadingCreateBlog} message='Đang trong quá trình tải Blog' />
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
