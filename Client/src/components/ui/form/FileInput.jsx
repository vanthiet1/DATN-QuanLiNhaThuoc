import React, { forwardRef } from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const FileInput = forwardRef(
  (
    { multiple = false, rounded = '', size = '', accept = 'image/*', disabled, addClassNames, refinput, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type='file'
        className={cn(
          'p-1 w-fit text-slate-500  cursor-pointer text-sm rounded-full leading-4 file:bg-slate-200 file:text-slate-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full hover:file:bg-slate-100 border border-gray-300 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-slate-300',
          { 'file:px-[8px] file:py-[4px]': size === 's' },
          { 'file:px-[12px] file:py-[6px]': size === 'm' },
          { 'file:px-[20px] file:py-[8px] text-base': size === 'l' },
          { rounded: rounded === 's' },
          { 'rounded-md': rounded === 'm' },
          { 'rounded-lg': rounded === 'l' },
          { 'rounded-full': rounded === 'full' },
          addClassNames
        )}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        {...props}
        {...refinput}
      ></input>
    );
  }
);

FileInput.propTypes = {
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  rounded: PropTypes.string,
  size: PropTypes.string
};

export default FileInput;
