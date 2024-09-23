import { useEffect, useState } from 'react';
import { createContext } from 'react';
import authServices from '../services/authService';
import tokenService from '../services/tokenService';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
     console.log(user);
     
    const fetchUser = async () => {
        try {
            const access_token = tokenService.getAccessToken()
            if (access_token) {
                const userLoginLocal = await authServices.getUserData(access_token);
                if (!userLoginLocal) return;
                setUser(userLoginLocal);
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <UserContext.Provider value={{ setUser, user, fetchUser }}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProvider;