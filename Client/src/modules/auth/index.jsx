import { useContext, useEffect } from 'react';
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword';
import { UserContext } from '../../contexts/UserContext'
import authServices from '../../services/authService';
// import cartServices from '../../services/cart';
import Input from '../../components/ui/input/Input'
import NewPassword from '../auth/NewPassword'
import VerifyEmail from './VerifyEmail';

const index = () => {
    const { user } = useContext(UserContext)
    return (
        <div>
            {user && (
                <>
                    <span>{user.fullname}</span>
                    <button onClick={authServices.logout}>Đăng xuất</button>
                </>
            )}
            <div className="flex gap-2">
                <Register />
                <Login />
            </div>
            <br />
            <div className="flex gap-2">
                <NewPassword />
                <ForgotPassword />
            </div>
            <br />
            <VerifyEmail></VerifyEmail>
        </div>
    );
};

export default index;
