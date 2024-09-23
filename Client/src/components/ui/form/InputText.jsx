import React, { forwardRef } from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const InputText = forwardRef(({ size, rounded, disabled, addClassNames, refinput, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type='text'
      className={cn(
        'font-normal w-full px-1 py-1 text-sm text-gray-800 border border-slate-300 border-solid focus:outline-1 focus:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-slate-300',
        { 'px-[8px] py-[4px]': size === 's' },
        { 'px-[12px] py-[6px]': size === 'm' },
        { 'px-[20px] py-[8px] text-base': size === 'l' },

        { rounded: rounded === 's' },
        { 'rounded-md': rounded === 'm' },
        { 'rounded-lg': rounded === 'l' },
        { 'rounded-full': rounded === 'full' },
        addClassNames
      )}
      disabled={disabled}
      {...props}
      {...refinput}
    ></input>
  );
});

InputText.propTypes = {
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.string
};

export default InputText;
