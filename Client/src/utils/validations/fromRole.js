import * as Yup from 'yup';

const formRoleSchema = {
 role: Yup.object().shape({
    role_Name: Yup.string().required('Không được để role trống.'),
  })
};

export default formRoleSchema;
