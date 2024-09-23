import PropTypes from 'prop-types';
import { cn } from '../../../utils/helpers/mergeClasses';
import { useState } from 'react';

const imgDefault = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';

const Image = ({
  src,
  alt,
  width,
  height,
  addClassNames,
  fallbackSrc = imgDefault,
  style,
  lazyLoad = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleErrorImg = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <img
      onError={handleErrorImg}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn('object-fill block', addClassNames)}
      style={style}
      loading={lazyLoad ? 'lazy' : 'eager'}
      {...props}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  lazyLoad: PropTypes.bool,
  fallbackSrc: PropTypes.string
};

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  addClassNames: '',
  style: {},
  lazyLoad: false
};

export default Image;
