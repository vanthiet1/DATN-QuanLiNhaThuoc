import React, { useContext, useState, useEffect } from 'react';
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
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '../../components/ui/editor/Editor'; // Import Editor

const blogEditBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='18' height='18' />
  },
  {
    path: `/${PATH_ROUTERS_ADMIN.ALL_BLOG}`,
    title: 'Tất cả bài viết'
  },
  {
    title: 'Cập nhật bài viết'
  }
];

const FormEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoadingUpdateBlog, setIsLoadingUpdateBlog] = useState('idle');
  const [contentValue, setContentValue] = useState('');
  const [blogData, setBlogData] = useState(null);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formBlogSchema.blogUpdate)
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogServices.getOneBlog(id);
        setBlogData(fetchedBlog);
        setValue('title', fetchedBlog.title);
        setValue('description', fetchedBlog.description);
        setContentValue(fetchedBlog.content);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    if (id) fetchBlog();
  }, [id, setValue]);

  const handleUpdateBlog = async (data) => {
    const { title, description, image } = data;

    const formData = new FormData();
    formData.append('title', title);

    if (image && image.length > 0) {
      formData.append('image', image[0]);
    } else {
      if (blogData && blogData.image) {
        formData.append('image', blogData.image);
      }
    }

    formData.append('description', description);
    formData.append('content', contentValue);

    setIsLoadingUpdateBlog(true);
    try {
      await blogServices.updateBlog(id, formData);
      setIsLoadingUpdateBlog(false);
      navigate(`/${PATH_ROUTERS_ADMIN.ALL_BLOG}`);
    } catch (error) {
      setIsLoadingUpdateBlog(false);
      console.error('Error updating blog:', error);
    }
  };

  if (!blogData) {
    return <ProcessLoading isLoading={true} message='Loading blog data...' />;
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateBlog)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Ảnh bài viết
            </label>
            <div className='flex gap-4 items-center p-2 border border-solid border-gray-300 bg-gray-100 mb-4 rounded'>
              <div className='p-1 bg-white'>
                <img src={blogData.image} alt={blogData.title} className='w-[250px] h-[150px] object-cover' />
              </div>
            </div>
            <FileInput size='m' rounded='s' placeholder='Type Blog FileInput here' refinput={register('image')} />
            {errors.image && <ErrorMessage messsage={errors.image.message} />}
          </div>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Tiêu đề bài viết
            </label>
            <InputText size='m' rounded='s' placeholder='Type Blog title here' refinput={register('title')} />
            {errors.title && <ErrorMessage messsage={errors.title.message} />}
          </div>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Mô tả bài viết
            </label>
            <InputText
              size='m'
              rounded='s'
              placeholder='Enter blog description here'
              refinput={register('description')}
            />
            {errors.description && <ErrorMessage messsage={errors.description.message} />}
          </div>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label htmlFor='' className='font-medium text-sm mb-2'>
              Nội dung bài viết
            </label>
            <Editor
              name='content'
              editorLoaded={true}
              value={contentValue}
              onChange={(value) => setContentValue(value)}
            />

            {errors.content && <ErrorMessage messsage={errors.content.message} />}
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        leftIcon={<AppIcons.PlusIcon width='18' height='18' />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
        Edit bài viết
      </Button>
      <ProcessLoading isLoading={isLoadingUpdateBlog} message='Updating Blog...' />
    </form>
  );
};

const EditBlog = () => {
  return (
    <div>
      <SectionWrapper title='Cập nhật bài viết' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={blogEditBreadCrumb} />
        <FormEditBlog />
      </SectionWrapper>
    </div>
  );
};

export default EditBlog;
