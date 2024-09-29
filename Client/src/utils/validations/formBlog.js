import * as Yup from 'yup';

const formBlogSchema = {
  blog: Yup.object().shape({
    title: Yup.string().required('Không được để title trống.'),
    description: Yup.string().required('Không được để description trống.'),
    content: Yup.string().required('Không được để content trống.'),
    image: Yup.string().required('Không được để image trống.')
  })
};

export default formBlogSchema;
