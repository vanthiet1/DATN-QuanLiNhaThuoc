import * as Yup from 'yup';

const formBMISchema = {
  BMI: Yup.object().shape({
      height: Yup.string().required('Vui lòng nhập chiều cao của bạn'),
      weight: Yup.string().required('Vui lòng nhập cân nặng của bạn'),
  })
};

export default formBMISchema;
