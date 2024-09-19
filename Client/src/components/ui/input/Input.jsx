import PropTypes from 'prop-types';
import { cn } from '../../../utils/mergeClasses';
const Input = ({ leftIcon, rightIcon, disabled, addClassNames, ...props }) => {
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute z-10 left-[15px] top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {leftIcon}
        </div>
      )}
      <input
        className={cn(
          `outline-none pl-5 pr-2 border  ${addClassNames}`
        )}
        disabled={disabled}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  disable: PropTypes.bool,
  addClassNames: PropTypes.string,
};

Input.defaultProps = {
  leftIcon: null,
  rightIcon: null,
  disable: false,
  addClassNames: '',
};

export default Input;
