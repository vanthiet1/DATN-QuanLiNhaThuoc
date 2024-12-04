import React from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const ErrorMessage = ({ addClassNames = '', messsage = 'Lỗi khi nhập dữ liệu !', children, ...props }) => {
  return (
    <p className={cn('text-pink-600 text-[16px] mt-2', addClassNames)} {...props}>
      {children}
      {messsage}
    </p>
  );
};

ErrorMessage.propTypes = {
  addClassNames: PropTypes.string,
  messsage: PropTypes.string,
  children: PropTypes.node
};

export default ErrorMessage;
