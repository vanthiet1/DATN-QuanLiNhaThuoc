import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import authServices from '../services/authService';
import tokenService from '../services/tokenService';
import { CartContext } from './CartContext';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const {getProductCart} = useContext(CartContext)
    const [user, setUser] = useState(null); 

    const fetchUser = async () => {
        try {
            const access_token = tokenService.getAccessToken(); 
            if (access_token) {
                const userLoginLocal = await authServices.getUserData(access_token);
                if (userLoginLocal) {
                    setUser(userLoginLocal);
                    getProductCart(userLoginLocal?._id)
                } else {
                    tokenService.removeAccessToken();
                    setUser(null);
                }
            }
        } catch (error) {
            console.error('Lỗi khi xác thực token hoặc token không hợp lệ:', error);
            tokenService.removeAccessToken(); 
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
