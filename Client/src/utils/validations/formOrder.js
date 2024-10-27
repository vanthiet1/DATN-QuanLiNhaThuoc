import * as Yup from 'yup';

const formOrderSchema = {
  order: Yup.object().shape({
    sale_type: Yup.string().required('Không được để sale_type trống.'),
    receiver: Yup.string().required('Không được để receiver trống.'),
    order_date: Yup.date().default(new Date()),
    payment_method_id: Yup.string().required('Không được để payment trống.'),
    street: Yup.string().required('Không được để street trống.'),
    phone: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ. Phải có 10-11 chữ số.')
      .required('Không được để phone trống.'),
    email: Yup.string()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    coupon_id: Yup.string()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    note: Yup.string()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    prescriptionImage: Yup.mixed()
      .test('fileType', 'File không hợp lệ, chỉ chấp nhận ảnh.', (value) => {
        return (
          value &&
          Array.from(value).every((file) => {
            return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
          })
        );
      })
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value))
  })
};

export default formOrderSchema;
