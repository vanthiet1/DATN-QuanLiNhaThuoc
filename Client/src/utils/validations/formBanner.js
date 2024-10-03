import * as Yup from 'yup';

const formBannerSchema = {
  bannerHero: Yup.object().shape({
    name: Yup.string().required('Không được để name trống.'),
    url_img: Yup.string().required('Không được url_img khẩu trống.')
  })
};

export default formBannerSchema;
