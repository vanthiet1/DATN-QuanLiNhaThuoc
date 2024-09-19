import React from 'react';
import { cn } from '../../../utils/mergeClasses';
import PropTypes from 'prop-types';

const Button = ({ children, leftIcon, rightIcon, disable, addClassNames, ...props }) => {
  const IconButton = leftIcon || rightIcon;

  return (
    <button
      className={cn(`font-semibold text-slate-100 rounded py-2 px-5 m-5 bg-slate-900 flex gap-1 ${addClassNames}`)}
      disable={disable}
      {...props}
    >
      {leftIcon && <IconButton />}
      {children}
      {rightIcon && <IconButton />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  disable: PropTypes.bool,
  addClassNames: PropTypes.string
};

Button.defaultProps = {
  leftIcon: null,
  rightIcon: null,
  disable: false,
  addClassNames: ''
};

export default Button;
