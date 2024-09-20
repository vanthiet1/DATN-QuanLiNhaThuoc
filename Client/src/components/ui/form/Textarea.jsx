import React, { forwardRef } from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const InputText = forwardRef(({ size, cols, rows, rounded, disabled, addClassNames, refinput, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      cols={cols}
      rows={rows}
      className={cn(
        'block w-full placeholder:font-normal text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500',
        { 'px-[8px] py-[4px] text-sm': size === 's' },
        { 'px-[12px] py-[4px] text-base': size === 'm' },
        { 'px-[12px] py-[12px] text-lg': size === 'l' },
        { rounded: rounded === 's' },
        { 'rounded-md': rounded === 'm' },
        { 'rounded-lg': rounded === 'l' },
        addClassNames
      )}
      disabled={disabled}
      {...props}
      {...refinput}
    ></textarea>
  );
});

InputText.propTypes = {
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.string
};

export default InputText;
