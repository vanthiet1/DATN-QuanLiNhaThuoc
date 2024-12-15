import * as Yup from 'yup';

const formProductSchema = {
  product: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.').max(300),
    sub_category_id: Yup.string().required('Không được để sub_category_id trống.'),
    brand_id: Yup.string().required('Không được để brand_id trống.'),
    description_short: Yup.string().required('Không được để description_short trống.'),
    price_distcount: Yup.number().required('Không được để mật khẩu trống.'),
    price_old: Yup.number().required('Không được để price_old trống.'),
    percent_price: Yup.number().required('Không được để percent_price trống.'),
    stock: Yup.number().required('Không được để stock trống.'),
    production_date: Yup.date()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    expiration_date: Yup.date()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    productImg: Yup.mixed()
      .test('required', 'Không được để productImg trống.', (value) => {
        return value && value.length > 0;
      })
      .test('fileType', 'File không hợp lệ, chỉ chấp nhận ảnh.', (value) => {
        return (
          value &&
          Array.from(value).every((file) => {
            return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
          })
        );
      })
      .required('Không được để productImg trống.')
  }),
  brand: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.').max(300),
    origin_country: Yup.string().required('Không được để origin_country trống.'),
    country_made: Yup.string().required('Không được để country_made trống.')
  }),
  coupon: Yup.object().shape({
    code: Yup.string().required('Không được để code trống.').max(10),
    start_date: Yup.date()
    .nullable()
    .typeError('Ngày bắt đầu không hợp lệ.') 
    .required('Không được để start_date trống.'),
    end_date: Yup.date().required('Không được để end_date trống.'),
    discount_value: Yup.number().required('Không được để discount_value trống.')
  }),
  category: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.').max(100),
    description: Yup.string().required('Không được để description trống.'),
    order: Yup.string().required('Không được để order trống.')
  }),
  subCategory: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.').max(100),
    category_id: Yup.string().required('Không được để category_id trống.'),
    description: Yup.string().required('Không được để description trống.'),
    order: Yup.string().required('Không được để order trống.')
  })
};

export default formProductSchema;
