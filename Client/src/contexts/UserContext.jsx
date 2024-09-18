import { useEffect, useState } from 'react';
import { createContext } from 'react';
import authServices from '../services/auth';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const fetchUser = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
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