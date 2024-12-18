import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import formProductSchema from '../../utils/validations/formProduct';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import brandServices from '../../services/brandService';

const brandBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Thống kê',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Thêm thương hiệu'
  }
];

const FormAddBrand = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formProductSchema.brand) });

  const handleCreateProduct = async (data) => {
    await brandServices.createBrand(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreateProduct)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Tên thương hiệu
              </label>
              <InputText size='m' rounded='s' placeholder='Nhập tên thương hiệu' refinput={register('name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Quốc gia xuất xứ
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Nhập quốc gia xuất xứ'
                refinput={register('origin_country')}
              />
              {errors.origin_country && <ErrorMessage messsage={errors.origin_country.message}></ErrorMessage>}
            </div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
              Quốc gia sản xuất
              </label>
              <InputText
                size='m'
                rounded='s'
                placeholder='Nhập quốc gia sản xuất'
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
        Tạo thương hiệu
      </Button>
    </form>
  );
};

const AddBrand = () => {
  return (
    <div>
      <SectionWrapper title='Thêm thương hiệu' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={brandBreadCrumb} />
        <FormAddBrand />
      </SectionWrapper>
    </div>
  );
};

export default AddBrand;
