import React, { forwardRef } from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const SelectBox = forwardRef(
  ({ size, rounded, optionData = [], nameSelected = '', disabled, addClassNames = '', refinput, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'font-normal w-full hover:cursor-pointer px-1 py-1 text-sm text-gray-800 border border-slate-300 placeholder:text-gray-700 border-solid focus:outline-1 focus:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-slate-300',
          { 'px-[8px] py-[4px]': size === 's' },
          { 'px-[12px] py-[6px]': size === 'm' },
          { 'px-[10px] py-[8px] text-base': size === 'l' },
          { rounded: rounded === 's' },
          { 'rounded-md': rounded === 'm' },
          { 'rounded-lg': rounded === 'l' },
          { 'rounded-full': rounded === 'full' },
          addClassNames
        )}
        disabled={disabled}
        {...props}
        {...refinput}
      >
        {nameSelected && <option defaultValue>{nameSelected}</option>}
        {optionData.map((option, index) => (
          <option value={option.value} key={option.value + index}>
            {option.title}
          </option>
        ))}
      </select>
    );
  }
);

SelectBox.propTypes = {
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.string,
  nameSelected: PropTypes.string,
  optionData: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  )
};

export default SelectBox;
