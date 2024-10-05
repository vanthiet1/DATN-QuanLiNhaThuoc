import { Button } from '../ui/button';
import AppIcons from '../../components/ui/icon';
import PropTypes from 'prop-types';
import { Portal } from '../portal';

const DiaLogAlert = ({
  title,
  message,
  iconLeft = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isOpen
}) => {
  if (!isOpen) return null;

  return (
    <Portal wrapperElementID='dialog-alert-root'>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className={`bg-white rounded-lg shadow-lg p-6 w-1/3 transform transition-transform duration-300`}>
          <h2 className='text-xl text-gray-700 font-semibold mb-4 flex items-center gap-2'>
            {iconLeft && iconLeft}
            {title}
          </h2>
          <p className='text-gray-700 mb-6'>{message}</p>
          <div className='flex justify-end space-x-4'>
            <Button
              size='m'
              rounded='s'
              onClick={onCancel}
              addClassNames='py-2 px-4 bg-gray-200 text-gray-700  hover:bg-gray-300'
            >
              {cancelLabel}
            </Button>
            <Button
              size='m'
              rounded='s'
              onClick={onConfirm}
              addClassNames='py-2 px-4 bg-blue-600 text-white  hover:bg-blue-700'
            >
              {confirmLabel}
            </Button>
            <Button addClassNames='absolute top-2 right-2 text-gray-300 hover:text-gray-500' onClick={onCancel}>
              <AppIcons.X_CloseIcon />
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

DiaLogAlert.propTypes = {
  title: PropTypes.node,
  message: PropTypes.node,
  iconLeft: PropTypes.node,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default DiaLogAlert;
