import * as Yup from 'yup';

const formCommentSchema = {
  comment: Yup.object().shape({
      content: Yup.string().required('Bạn đang để trống bình luận'),
  })
};

export default formCommentSchema;
