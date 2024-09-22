import React from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const Button = ({ children, outline, size, rounded, leftIcon, rightIcon, disabled, addClassNames, ...props }) => {
  const IconButton = leftIcon || rightIcon;

  return (
    <button
      className={cn(
        'font-medium text-xs text-gray-800 disabled:cursor-not-allowed disabled:opacity-70 flex',
        { 'border border-slate-300 border-solid ': outline },
        { 'px-1 py-1 text-sm': size === 's' },
        { 'px-[12px] py-[4px] text-base': size === 'm' },
        { 'px-[30px] py-[8px] text-lg': size === 'l' },
        { rounded: rounded === 's' },
        { 'rounded-md': rounded === 'm' },
        { 'rounded-lg': rounded === 'l' },
        { 'rounded-full': rounded === 'full' },
        addClassNames
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && IconButton}
      {children}
      {rightIcon && IconButton}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
  outline: PropTypes.bool,
  size: PropTypes.string,
  rounded: PropTypes.string
};

Button.defaultProps = {
  leftIcon: null,
  rightIcon: null,
  disable: false,
  addClassNames: ''
};

export default Button;
