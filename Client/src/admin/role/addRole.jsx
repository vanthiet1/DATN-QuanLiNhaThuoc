import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import formRoleSchema from '../../utils/validations/fromRole';

import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import AppIcons from '../../components/ui/icon';
import { ErrorMessage, InputText } from '../../components/ui/form';
import { Button } from '../../components/ui/button';
import roleServices from '../../services/roleService';

const brandBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Add Role'
  }
];

const FormAddBrand = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formRoleSchema.role) });

  const handleCreateRole = async (data) => {
    console.log(data);
    
     if(!data) return
    await roleServices.addRole(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreateRole)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Role Name
              </label>
              <InputText size='m' rounded='s' placeholder='Type role name here' refinput={register('role_Name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
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

const AddRole = () => {
  return (
    <div>
      <SectionWrapper title='Add Role' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={brandBreadCrumb} />
        <FormAddBrand />
      </SectionWrapper>
    </div>
  );
};

export default AddRole;
