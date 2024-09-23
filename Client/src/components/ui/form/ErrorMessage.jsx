import React from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const ErrorMessage = ({ addClassNames = '', messsage = 'Lỗi khi nhập dữ liệu !', children, ...props }) => {
  return (
    <p className={cn('text-pink-600 text-sm mt-2', addClassNames)} {...props}>
      {children}
      {messsage}
    </p>
  );
};

ErrorMessage.propTypes = {
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.string
};

export default ErrorMessage;
