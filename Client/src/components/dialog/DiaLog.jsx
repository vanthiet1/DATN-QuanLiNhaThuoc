import React from 'react';
import { Portal } from '../portal';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import AppIcons from '../ui/icon';

const DiaLog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <Portal wrapperElementID='dialog-modal-root'>
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={onClose}>
          <div
            className='relative bg-white rounded-lg shadow-lg max-w-[50%] w-full p-6'
            onClick={(e) => e.stopPropagation()}
          >
            <Button addClassNames='absolute top-3 right-3 text-gray-500 hover:text-gray-800' onClick={onClose}>
              <AppIcons.X_CloseIcon />
            </Button>
            {children}
          </div>
        </div>
      </Portal>
    </div>
  );
};

DiaLog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default DiaLog;
