import * as Yup from 'yup';

const formAuthSchema = {
  login: Yup.object().shape({
    email: Yup.string().required('Không được để email trống.').email('Email không hợp lệ.'),
    password: Yup.string().required('Không được để mật khẩu trống.').min(8, 'Mật khẩu phải có ít nhất 6 ký tự.')
  }),

  register: Yup.object().shape({
    fullname: Yup.string().required('Vui lòng nhập tên của bạn.'),
    email: Yup.string().required('Không được để email trống.').email('Email không hợp lệ.'),
    password: Yup.string().required('Không được để mật khẩu trống.').min(8, 'Mật khẩu phải có ít nhất 6 ký tự.'),
    confirmPassword: Yup.string()
    .required('Vui lòng nhập xác nhận mật khẩu.')
    .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.')
  }),

  forgotPassword: Yup.object().shape({
    email: Yup.string().required('Không được để email trống.').email('Email không hợp lệ.'),
  }),

  newPassword: Yup.object().shape({
    email: Yup.string().required('Không được để email trống.').email('Email không hợp lệ.'),
    newPassword: Yup.string().required('Không được để password trống.'),
    code: Yup.string().required('Không được để mã xác thực trống.')
  }),

  verifyEmail: Yup.object().shape({
    email: Yup.string().required('Không được để email trống.').email('Email không hợp lệ.'),
    code: Yup.string().required('Không được để mã xác thực trống.')
  }),
};

export default formAuthSchema;
