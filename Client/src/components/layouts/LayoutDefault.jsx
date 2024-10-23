import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import Header from './Header';
import DiaLog from '../dialog/DiaLog';
import Login from '../../modules/auth/Login';
import Register from '../../modules/auth/Register';
import ForgotPassword from '../../modules/auth/ForgotPassword';
import NewPassword from '../../modules/auth/NewPassword';
import VerifyEmail from '../../modules/auth/VerifyEmail';
import { ToggleFormContext } from '../../contexts/ToggleFormContext';
const LayoutDefault = () => {
  const  {dialogState , handleCloseDialog} = useContext(ToggleFormContext)
  return (
    <div>
      <Header />
      <div className='w-full flex items-center h-auto justify-center p-[30px]'>
        <Outlet />
      </div>
      <DiaLog
        onClose={handleCloseDialog}
        isOpen={dialogState.isOpen}
      >
        {dialogState.type === 'login' && <Login /> }
        {dialogState.type === 'register' && <Register /> }
        {dialogState.type === 'forgotPassword' && <ForgotPassword/>}
        {dialogState.type === 'newPassword' && <NewPassword/>}
        {dialogState.type === 'verifyEmail' && <VerifyEmail /> }
      </DiaLog>
    </div>
  );
};

export default LayoutDefault;
