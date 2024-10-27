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

<<<<<<< HEAD
ProcessLoading.propTypes = {
=======
ProcessLoading.prototype = {
>>>>>>> 8ac3b2a5dd387556fda7502a0875d4466340b860
  isLoading: PropTypes.oneOf(['idle', true, false])
};

export default ProcessLoading;
