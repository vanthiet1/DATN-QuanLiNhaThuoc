import { useContext, useEffect } from 'react';

import ForgotPassword from './ForgotPassword';
// import cartServices from '../../services/cart';
import Input from '../../components/ui/input/Input'
import NewPassword from '../auth/NewPassword'
import VerifyEmail from './VerifyEmail';

const index = () => {
    return (
        <div>
            <div className="flex gap-2">
                {/* <NewPassword />
                <ForgotPassword /> */}
            </div>
            <br />
            {/* <VerifyEmail></VerifyEmail> */}
        </div>
    );
};

export default index;
