import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import formProductSchema from '../../utils/validations/formProduct';
import { ErrorMessage, InputText, SelectBox } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import TextArea from '../../components/ui/form/Textarea';
import categoryServices from '../../services/categoryService';
import useFetch from '../../hooks/useFetch';
import subCategoryServices from '../../services/subCategoryService';

const CategoryBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Thêm danh mục'
  }
];

const optionCategoryDefault = [
  {
    title: 'Thuốc',
    value: '66c2a08a860ea2d7f7413476'
  }
];

const FormAddCategory = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formProductSchema.category) });
  const { setIsActionCreate, isActionCreate } = useContext(CategoryFormContext);

  const handleCreate = async (data) => {
    await categoryServices.addCategory(data);
    setIsActionCreate(!isActionCreate);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Tên danh mục
              </label>
              <InputText size='m' rounded='s' placeholder='Thuốc' refinput={register('name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Vị trí
              </label>
              <InputText size='m' rounded='s' placeholder='0'{...register('order', {
                setValueAs: (value) => (value ? parseFloat(value) : null),
              })} />
              {errors.order && <ErrorMessage messsage={errors.order.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Mô tả danh mục
              </label>

              <TextArea placeholder='Nhập mô tả danh mục' rounded='s' refinput={register('description')} />
              {errors.description && <ErrorMessage messsage={errors.description.message}></ErrorMessage>}
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
       Tạo danh mục
      </Button>
    </form>
  );
};

const FormAddSubCategory = () => {
  const { isActionCreate } = useContext(CategoryFormContext);

  const {
    isLoading,
    isError,
    responsData: categoryData,
    messsageError
  } = useFetch(categoryServices.getCategory, {}, [isActionCreate]);

  const [categorySelect, setCategorySelect] = useState(optionCategoryDefault);

  useEffect(() => {
    if (Array.isArray(categoryData) && categoryData.length > 0) {
      const cateOptions = categoryData.map((cate) => {
        return { title: cate.name, value: cate._id };
      });
      setCategorySelect(cateOptions);
    }
  }, [categoryData]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formProductSchema.subCategory) });

  const handleCreate = async (data) => {
    await subCategoryServices.addSubCategory(data);
    reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{messsageError}</div>;
  }

  if (categorySelect.length === 0) {
    return 'Bạn cần tạo category trước khi tạo sub category';
  }

  return (
    <form onSubmit={handleSubmit(handleCreate)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Danh mục
              </label>
              <SelectBox optionData={categorySelect} size='m' rounded='s' refinput={register('category_id')} />
              {errors.category_id && <ErrorMessage messsage={errors.category_id.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Tên danh mục con
              </label>
              <InputText size='m' rounded='s' placeholder='Nhập danh mục con' refinput={register('name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Vị trí danh mục con
              </label>
              <InputText size='m' rounded='s' placeholder='' {...register('order', {
                setValueAs: (value) => (value ? parseFloat(value) : null),
              })} />
              {errors.order && <ErrorMessage messsage={errors.order.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Nhập tên danh mục con
              </label>
              <TextArea
                placeholder='Nhập tên danh mục con'
                rounded='s'
                refinput={register('description')}
              />
              {errors.description && <ErrorMessage messsage={errors.description.message}></ErrorMessage>}
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
        Tạo danh mục con
      </Button>
    </form>
  );
};

const CategoryFormContext = createContext({});

const CategoryContextProvider = ({ children }) => {
  const [isActionCreate, setIsActionCreate] = useState(false);

  return (
    <CategoryFormContext.Provider value={{ isActionCreate, setIsActionCreate }}>
      {children}
    </CategoryFormContext.Provider>
  );
};

const AddCategory = () => {
  return (
    <div>
      <CategoryContextProvider>
        <SectionWrapper title='Thêm danh mục' addClassNames={{ wrapper: 'mt-2' }}>
          <BreadCrumb crumbsData={CategoryBreadCrumb} />
          <FormAddCategory />
        </SectionWrapper>
        <SectionWrapper title='Thêm danh mục con' addClassNames={{ wrapper: 'mt-2', title: 'mb-2' }}>
          <FormAddSubCategory />
        </SectionWrapper>
      </CategoryContextProvider>
    </div>
  );
};

export default AddCategory;
