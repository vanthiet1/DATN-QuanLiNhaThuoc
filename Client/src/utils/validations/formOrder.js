import * as Yup from 'yup';

const formOrderSchema = {
  order: Yup.object().shape({
    sale_type: Yup.string().required('Không được để sale_type trống.'),
    receiver: Yup.string().required('Vui lòng nhập người nhận hàng.'),
    order_date: Yup.date().default(new Date()),
    payment_method_id: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
    street: Yup.string().required('Vui lòng nhập tuyến đường'),

    province: Yup.string().required('Vui lòng chọn tỉnh của bạn'),
    district: Yup.string().required('Vui lòng chọn huyện / quận của bạn'),
    ward: Yup.string().required('Vui lòng chọn phường / xã của bạn'),


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
