import * as Yup from 'yup';

const formBannerSchema = {
  bannerHero: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.'),
    bannerImg: Yup.mixed()
      .test('required', 'Không được để banner img trống.', (value) => {
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
      .required('Không được để banner img trống.')
  })
};

export default formBannerSchema;
