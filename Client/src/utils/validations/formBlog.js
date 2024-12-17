import * as Yup from 'yup';

const formBlogSchema = {
  blog: Yup.object().shape({
    title: Yup.string().required('Không được để title trống.'),
    description: Yup.string().required('Không được để mô tả trống.'),
    image: Yup.mixed()
      .test('required', 'Không được để image trống.', (value) => {
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
      .required('Không được để image trống.')
  }),
  blogUpdate: Yup.object().shape({
    title: Yup.string().required('Không được để title trống.'),
    description: Yup.string().required('Không được để mô tả trống.')
  })
};

export default formBlogSchema;
