import React from 'react';
<<<<<<< HEAD
import { cn } from '../../../utils/mergeClasses';
import PropTypes from 'prop-types';

const Button = ({ children, leftIcon, rightIcon, disable, addClassNames, ...props }) => {
=======
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const Button = ({ children, outline, size, rounded, leftIcon, rightIcon, disabled, addClassNames, ...props }) => {
>>>>>>> d1bbf713a3606f15df8fe3840d0aaf31a7211196
  const IconButton = leftIcon || rightIcon;

  return (
    <button
<<<<<<< HEAD
      className={cn(`font-semibold text-slate-100 rounded py-2 px-5 m-5 bg-slate-900 flex gap-1 ${addClassNames}`)}
      disable={disable}
      {...props}
    >
      {leftIcon && <IconButton />}
      {children}
      {rightIcon && <IconButton />}
=======
      className={cn(
        'font-medium text-xs text-gray-800 disabled:cursor-not-allowed disabled:opacity-70 flex gap-1 items-center',
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
>>>>>>> d1bbf713a3606f15df8fe3840d0aaf31a7211196
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  disable: PropTypes.bool,
<<<<<<< HEAD
  addClassNames: PropTypes.string
=======
  addClassNames: PropTypes.string,
  outline: PropTypes.bool,
  size: PropTypes.string,
  rounded: PropTypes.string
>>>>>>> d1bbf713a3606f15df8fe3840d0aaf31a7211196
};

Button.defaultProps = {
  leftIcon: null,
  rightIcon: null,
  disable: false,
  addClassNames: ''
};

export default Button;
