import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { PATH_ROUTERS_ADMIN, PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import Header from './Header';
import Footer from './Footer';
import DiaLog from '../dialog/DiaLog';
import Login from '../../modules/auth/Login';
import Register from '../../modules/auth/Register';
import ForgotPassword from '../../modules/auth/ForgotPassword';
import NewPassword from '../../modules/auth/NewPassword';
import VerifyEmail from '../../modules/auth/VerifyEmail';
import NotificationModal from '../ui/cart/NotificationModal';
import { ToggleFormContext } from '../../contexts/ToggleFormContext';
import Footer from './Footer';

const formComponents = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  newPassword: NewPassword,
  verifyEmail: VerifyEmail,
  notificationModal:NotificationModal
};


const LayoutDefault = () => {
  const  {dialogState , handleCloseDialog} = useContext(ToggleFormContext);
  const FormComponent = formComponents[dialogState.type] || null;
  return (
    <div>
      <Header />
      <div className='w-full h-auto p-[30px]'>
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
      <Footer />

      <Footer/>
      {dialogState.isOpen && (
        <DiaLog onClose={handleCloseDialog} isOpen={dialogState.isOpen}>
          {FormComponent && <FormComponent />}
        </DiaLog>
      )}

    </div>
  );
};

export default LayoutDefault;
