import { cn } from '../../../utils/helpers/mergeClasses';

const CheckBox = ({ onChange, checked, disabled, addClassNames, ...props }) => {
  return (
    <div>
      <input
        type='checkbox'
        checked={checked}
        disabled={disabled}
        className={cn(
          `cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-300 dark:focus:ring-blue-300 focus:ring-1 dark:bg-gray-700 dark:border-gray-600 duration-300 focus:rounded-[20px]  ${addClassNames}`
        )}
        // onChange={(e) => onChange(e.target.checked)}
        {...props}
      />
    </div>
  );
};

export default CheckBox;
