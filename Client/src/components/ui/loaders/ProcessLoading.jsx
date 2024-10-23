import DiaLog from '../../dialog/DiaLog';
import SpinnerLoading from './SpinnerLoading';
import PropTypes from 'prop-types';

const ProcessLoading = ({ isLoading = 'idle', message = '' }) => {
  return (
    <DiaLog isOpen={isLoading !== 'idle' && isLoading}>
      <div className='flex items-center justify-center flex-col'>
        <SpinnerLoading size='30' />
        <div className='text-gray-600 mt-2'>{message}</div>
      </div>
    </DiaLog>
  );
};

ProcessLoading.prototype = {
  isLoading: PropTypes.oneOf('idle', true, false)
};

export default ProcessLoading;
