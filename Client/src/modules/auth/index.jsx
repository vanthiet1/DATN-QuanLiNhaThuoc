import { useContext, useEffect } from 'react';
import Register from './Register'
import Login from './Login'
import { UserContext } from '../../contexts/UserContext'
import authServices from '../../services/authService';
// import cartServices from '../../services/cart';
import Input from '../../components/ui/input/Input'

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
           <Register/>
           <Login/>
           </div>
        </div>
    );
};

export default index;
