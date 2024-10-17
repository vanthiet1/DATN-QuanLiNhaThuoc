import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import cartServices from '../services/cartService';


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const getProductCart = async (userId) => {
        if (!userId) return;
        const dataCart = await cartServices.getCartByUserId(userId)
        setCart(dataCart)
    }

    return (
        <CartContext.Provider value={{cart, getProductCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
