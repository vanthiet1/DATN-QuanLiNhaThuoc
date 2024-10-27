import React, { forwardRef } from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';

const InputRadio = forwardRef(({ disabled, refinput, addClassNames, ...props }, ref) => {
  return (
    <input
      type='radio'
      className={cn(
        'border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ',
        addClassNames
      )}
      ref={ref}
      disabled={disabled}
      {...refinput}
      {...props}
    ></input>
  );
});

export default InputRadio;
