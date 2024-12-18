import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, InputText, SelectBox } from '../../components/ui/form';
import TextArea from '../../components/ui/form/Textarea';
import { Button } from '../../components/ui/button';
import AppIcons from '../../components/ui/icon';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import useFetch from '../../hooks/useFetch';
import categoryServices from '../../services/categoryService';
import subCategoryServices from '../../services/subCategoryService';
import formProductSchema from '../../utils/validations/formProduct';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';

const SubCategoryBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Cập nhật danh mục con'
  }
];

const FormEditSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const optionCategoryDefault = [
    {
      title: 'Thuốc',
      value: '66c2a08a860ea2d7f7413476'
    }
  ];
  const { isLoading, isError, responsData: categoryData, messsageError } = useFetch(categoryServices.getCategory);

  const [categorySelect, setCategorySelect] = useState([]);

  useEffect(() => {
    if (Array.isArray(categoryData) && categoryData.length > 0) {
      const cateOptions = categoryData.map((cate) => ({
        title: cate.name,
        value: cate._id
      }));
      setCategorySelect(cateOptions);
    }
  }, [categoryData]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(formProductSchema.subCategory)
  });

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const subCategory = await subCategoryServices.getOneSubCategory(id);
        if (subCategory) {
          setValue('name', subCategory.name);
          setValue('category_id', subCategory.category_id._id);
          setValue('description', subCategory.description);
          setValue('order', subCategory.order);
        } else {
          console.error('Subcategory not found');
        }
      } catch (error) {
        console.error('Error fetching Subcategory:', error.message);
      }
    };

    fetchSubCategory();
  }, [id, setValue]);

  const handleUpdate = async (data) => {
    await subCategoryServices.updateSubCategory(id, data);
    navigate('/admin/all-category');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{messsageError}</div>;

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 shadow-sm p-4'>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label className='font-medium text-sm mb-2'>Danh mục</label>
            <SelectBox optionData={categorySelect} size='m' rounded='s' {...register('category_id')}>
              <option value='' disabled>
                Select a category
              </option>
              {categorySelect.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.title}
                </option>
              ))}
            </SelectBox>
            {errors.category_id && <ErrorMessage message={errors.category_id.message} />}
          </div>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label className='font-medium text-sm mb-2'>Tên danh mục con</label>
            <InputText size='m' rounded='s' placeholder='Subcategory name here' {...register('name')} />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label className='font-medium text-sm mb-2'>Vị trí danh mục con</label>
            <InputText size='m' rounded='s' placeholder='Subcategory order here' {...register('order')} />
            {errors.order && <ErrorMessage message={errors.order.message} />}
          </div>
          <div className='flex flex-col text-gray-700 mb-4'>
            <label className='font-medium text-sm mb-2'>Nhập tên danh mục con</label>
            <TextArea placeholder='Enter Subcategory description here' rounded='s' {...register('description')} />
            {errors.description && <ErrorMessage message={errors.description.message} />}
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        leftIcon={<AppIcons.PlusIcon width='18' height='18' />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
        Edit danh mục con
      </Button>
    </form>
  );
};

const EditSubCategory = () => {
  return (
    <SectionWrapper title='Cập nhật danh mục con' addClassNames={{ wrapper: 'mt-2', title: 'mb-2' }}>
      <BreadCrumb crumbsData={SubCategoryBreadCrumb} />
      <FormEditSubCategory />
    </SectionWrapper>
  );
};

export default EditSubCategory;
