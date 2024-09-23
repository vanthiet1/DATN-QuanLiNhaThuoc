import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn } from '../../utils/helpers/mergeClasses';

const BreadCrumb = ({ crumbsData = [], addClassNames = '', ...props }) => {
  return (
    <div className={cn('flex items-center text-sm text-gray-700 py-3', addClassNames)} {...props}>
      {crumbsData.map((crumb, index) => {
        const isLastCrumb = index === crumbsData.length - 1;
        return (
          <Fragment key={index + crumb.title}>
            {isLastCrumb ? (
              <span>{crumb.title}</span>
            ) : (
              <Link to={crumb.path} className='flex items-center font-medium hover:text-blue-500'>
                {crumb.icon && crumb.icon}
                <span className='ml-1'>{crumb.title}</span>
              </Link>
            )}
            {!isLastCrumb && <span className='px-2'>/</span>}
          </Fragment>
        );
      })}
    </div>
  );
};

BreadCrumb.propTypes = {
  addClassNames: PropTypes.string,
  crumbsData: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.string.isRequired,
      icon: PropTypes.element
    })
  ).isRequired
};

export default BreadCrumb;
