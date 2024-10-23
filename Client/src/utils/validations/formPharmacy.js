import * as Yup from 'yup';

const formPharmacySchema = {
  pharmacy: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.').max(300, 'Tên không được vượt quá 300 ký tự.'),
    street: Yup.string().required('Không được để address trống.'),
    phone_number: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ. Phải có 10-11 chữ số.')
      .required('Không được để phone_number trống.'),
    opening_hours: Yup.string()
      .required('Không được để opening_hours trống.')
      .max(100, 'Giờ mở cửa không được vượt quá 100 ký tự.')
  })
};

export default formPharmacySchema;
