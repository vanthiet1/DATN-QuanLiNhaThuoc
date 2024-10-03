import { useParams } from 'react-router-dom';
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
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
const brandBreadCrumb = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'Edit Role'
  }
];

const FormEditRole = () => {
    const naviagate = useNavigate()
    const { id } = useParams();
    console.log(id);
    
     const ok = ()=>{
        
     }
    const {responsData:detailRole} = useFetch(()=>roleServices.getRoleById(id), 
        [id] )
  console.log(detailRole);
  
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(formRoleSchema.role) });


  const handleUpdateRole = async (data) => {    
     if(!data) return
    await roleServices.updateNameRole(detailRole._id,data);
    naviagate('/admin/all-role')
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateRole)} encType='multipart/form-data'>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <div className='md:col-span-2 rounded-md w-full border border-gray-300 border-solid shadow-sm p-4'>
          <div>
            <div className='flex flex-col text-gray-700 mb-4'>
              <label htmlFor='' className='font-medium text-sm mb-2'>
                Role Name
              </label>
              <InputText  defaultValue={detailRole?.role_Name} size='m' rounded='s' placeholder='Type role name here' refinput={register('role_Name')} />
              {errors.name && <ErrorMessage messsage={errors.name.message}></ErrorMessage>}
            </div>
          </div>
        </div>
      </div>
      <Button
        size='m'
        rounded='s'
        leftIcon={<AppIcons.SetIcon width='18' height='18' />}
        addClassNames='bg-gray-800 mt-3 text-white hover:bg-gray-700'
      >
       Update
      </Button>
    </form>
  );
};

const EditRole = () => {
  return (
    <div>
      <SectionWrapper title='Edit Role' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={brandBreadCrumb} />
        <FormEditRole />
      </SectionWrapper>
    </div>
  );
};

export default EditRole;
