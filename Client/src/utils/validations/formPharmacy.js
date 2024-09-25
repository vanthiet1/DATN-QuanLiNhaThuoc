import * as Yup from 'yup';

const formPharmacySchema = {
  pharmacy: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.').max(300, 'Tên không được vượt quá 300 ký tự.'),
    address: Yup.string().required('Không được để address trống.'),
    latitude: Yup.number()
      .required('Không được để latitude trống.')
      .typeError('Latitude phải là số hợp lệ.')
      .min(-90, 'Latitude phải nằm trong khoảng từ -90 đến 90.')
      .max(90, 'Latitude phải nằm trong khoảng từ -90 đến 90.'),
    longitude: Yup.number()
      .required('Không được để longitude trống.')
      .typeError('Longitude phải là số hợp lệ.')
      .min(-180, 'Longitude phải nằm trong khoảng từ -180 đến 180.')
      .max(180, 'Longitude phải nằm trong khoảng từ -180 đến 180.'),
    phone_number: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ. Phải có 10-11 chữ số.')
      .required('Không được để phone_number trống.'),
    opening_hours: Yup.string()
      .required('Không được để opening_hours trống.')
      .max(100, 'Giờ mở cửa không được vượt quá 100 ký tự.')
  })
};

export default formPharmacySchema;
