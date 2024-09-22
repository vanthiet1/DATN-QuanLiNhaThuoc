import React, { forwardRef } from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const TextArea = forwardRef(({ cols, rows = 4, rounded, disabled, addClassNames, refinput, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      cols={cols}
      rows={rows}
      className={cn(
        'block p-4 w-full placeholder:font-normal text-sm text-gray-900 bg-gray-50 rounded-lg border border-solid border-gray-300 focus:outline focus:outline-1 focus:outline-blue-400',
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

TextArea.propTypes = {
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
  rounded: PropTypes.string
};

export default TextArea;
