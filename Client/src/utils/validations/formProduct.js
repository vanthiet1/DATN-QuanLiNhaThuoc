import * as Yup from 'yup';

const formProductSchema = {
  product: Yup.object().shape({
    name: Yup.string().required('Không được để tên sản phẩm trống.').max(300),
    sub_category_id: Yup.string().required('Không được để danh mục trống.'),
    brand_id: Yup.string().required('Không được để thương hiệu trống.'),
    description_short: Yup.string().required('Không được để mô tả ngắn trống.'),
    price_distcount: Yup.number()
      .min(0, 'số lượng không được là số âm.')
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required('Không được để phần trăm trống.'),
    price_old: Yup.number()
      .min(0, 'số lượng không được là số âm.')
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required('Không được để giá củ trống.'),
    percent_price: Yup.number()
      .min(0, 'số lượng không được là số âm.')
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required('Không được để giá mới trống.'),
    stock: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required('Không được để số lượng trống.')
      .min(0, 'số lượng không được là số âm.')
      .integer('số lượng phải là số nguyên.'),
    production_date: Yup.date()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    expiration_date: Yup.date()
      .nullable()
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    productImg: Yup.mixed()
      .test('required', 'Không được để hình ảnh trống.', (value) => {
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
    name: Yup.string().required('Không được để tên thương hiệu trống.').max(300),
    origin_country: Yup.string().required('Không được để xuất xứ quốc gia trống.'),
    country_made: Yup.string().required('Không được để quốc gia sản xuất trống.')
  }),
  coupon: Yup.object().shape({
    code: Yup.string().required('Không được để code trống.').max(10),
    start_date: Yup.date()
      .nullable()
      .typeError('Ngày bắt đầu không hợp lệ.')
      .required('Không được để ngày bắt đầu trống.'),
    end_date: Yup.date().required('Không được để kết thúc trống.'),
    discount_value: Yup.number().required('Không được để giá trị phiếu giảm giá trống.')
  }),
  category: Yup.object().shape({
    name: Yup.string().required('Không được để tên danh mục trống.').max(100),
    description: Yup.string().required('Không được để mô tả trống.'),
    order: Yup.number()
      .typeError('vị trí phải là số.')
      .required('Không được để vị trí trống.')
      .min(1, 'vị trí phải lớn hơn 0.')
  }),
  subCategory: Yup.object().shape({
    name: Yup.string().required('Không được để tên danh mục trống.').max(100),
    category_id: Yup.string().required('Không được để id thể loại trống.'),
    description: Yup.string().required('Không được để mô tả trống.'),
    order: Yup.number()
      .typeError('vị trí phải là số.')
      .required('Không được để vị trí trống.')
      .min(1, 'vị trí phải lớn hơn 0.')
  })
};

export default formProductSchema;
