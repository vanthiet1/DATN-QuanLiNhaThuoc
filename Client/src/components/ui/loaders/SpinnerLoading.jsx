import React from 'react';
import { cn } from '../../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const SpinnerLoading = ({ addClassNames = '', size = 50, color = '#2563EB', borderSize = '4px', speed = 'normal' }) => {
  const getSpeedClass = () => {
    switch (speed) {
      case 'fast':
        return 'animate-spin-fast';
      case 'slow':
        return 'animate-spin-slow';
      default:
        return 'animate-spin';
    }
  };
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: borderSize,
        borderColor: color,
        borderTopColor: 'transparent'
      }}
      className={cn(`rounded-full border-t-transparent ${getSpeedClass()}`, addClassNames)}
    />
  );
};

SpinnerLoading.prototype = {
  addClassNames: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  borderSize: PropTypes.string,
  speed: PropTypes.oneOf(['fast', 'normal', 'slow'])
};

export default SpinnerLoading;
