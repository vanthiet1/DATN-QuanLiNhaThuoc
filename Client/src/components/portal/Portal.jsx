import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const createElementApendChildren = (idElement) => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', idElement);
  document.body.appendChild(portalRoot);
  return portalRoot;
};

const Portal = ({ children, wrapperElementID = 'portal-root' }) => {
  let element = document.getElementById(wrapperElementID);
  if (!element) {
    element = createElementApendChildren(wrapperElementID);
  }
  return createPortal(children, element);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperElementID: PropTypes.string
};

export default Portal;
