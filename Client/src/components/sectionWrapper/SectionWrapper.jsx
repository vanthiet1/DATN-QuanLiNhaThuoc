import { cn } from '../../utils/helpers/mergeClasses';
import PropTypes from 'prop-types';

const SectionWrapper = ({ addClassNames = {}, title = 'Bình An Dược', children, ...props }) => {
  return (
    <div className={cn('py-6 w-full', addClassNames.wrapper)} {...props}>
      <h1 className={cn('text-[22px] font-medium capitalize text-gray-700', addClassNames.title)}>{title}</h1>
      {children}
    </div>
  );
};

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  addClassNames: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default SectionWrapper;
