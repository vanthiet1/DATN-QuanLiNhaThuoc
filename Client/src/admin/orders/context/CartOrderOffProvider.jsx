import { createContext, useReducer } from 'react';
import storageUtil from '../../../utils/helpers/storageUtil';
import vnpayServices from '../../../services/vnpayService';

const cartKey = 'cart';

const initialStateCart = {
  cartData: storageUtil.getItem(cartKey) || [],
  cartTotalPrice: 0,
  cartQuanity: 0
};

export const CartOrderOffContext = createContext(initialStateCart);

export const ADD_PRODUCT_TO_CART_ACTION = 'ADD_PRODUCT_TO_CART';
export const EDIT_PRODUCT_TO_CART_ACTION = 'EDIT_PRODUCT_TO_CART';
export const REMOVE_ITEM_CART_ACTION = 'REMOVE_ITEM_CART';
export const REMOVE_ALL__CART_ACTION = 'REMOVE_ALL_CART';

const cartReducer = (state, action) => {
  const { cartData } = state;

  const updateLocalStorage = (data) => {
    storageUtil.setItem(cartKey, data);
  };

  const findProductInCart = (productId) => {
    return cartData.find((product) => product.productId === productId);
  };

  const handleTotalPriceCart = (cartData) => {
    return cartData.reduce((initialValue, cartItem) => {
      return (initialValue += cartItem.totalPrice);
    }, 0);
  };

  const handleQuanityCart = (cartData) => {
    return cartData.reduce((initialValue, cartItem) => {
      return (initialValue += cartItem.quantity);
    }, 0);
  };

  switch (action.type) {
    case ADD_PRODUCT_TO_CART_ACTION: {
      const { _id, price, quantity, ...productRest } = action.payload;

      if (!cartData) {
        updateLocalStorage([]);
      }

      const cartProduct = [...cartData];
      const productExist = findProductInCart(_id);

      if (!productExist) {
        cartProduct.push({
          productId: _id,
          quantity: 1,
          totalPrice: price,
          ...productRest
        });
      } else {
        productExist.quantity += quantity;
        productExist.totalPrice = productExist.quantity * price;
      }

      updateLocalStorage(cartProduct);

      return {
        ...state,
        cartData: cartProduct,
        cartTotalPrice: handleTotalPriceCart(cartProduct),
        cartQuanity: handleQuanityCart(cartProduct)
      };
    }

    case EDIT_PRODUCT_TO_CART_ACTION: {
      const { _id: productId, price: newPrice, quantity: newQuantity } = action.payload;

      const productExist = findProductInCart(productId);

      if (productExist) {
        productExist.quantity += newQuantity;
        productExist.totalPrice = productExist.quantity * newPrice;
      }

      updateLocalStorage(cartData);

      return {
        ...state,
        cartData: cartData
      };
    }

    case REMOVE_ITEM_CART_ACTION: {
      const { _id: productId } = action.payload;

      const updatedCart = cartData.filter((product) => product.productId !== productId);
      updateLocalStorage(updatedCart);

      return {
        ...state,
        cartData: updatedCart,
        cartTotalPrice: handleTotalPriceCart(updatedCart),
        cartQuanity: handleQuanityCart(updatedCart)
      };
    }

    case REMOVE_ALL__CART_ACTION: {
      updateLocalStorage([]);
      return {
        ...state,
        cartData: [],
        cartTotalPrice: 0,
        cartQuanity: 0
      };
    }
    default:
      return state;
  }
};

const CartOrderOffProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialStateCart);

  const handleOrderWithVnpay = async (dataPayment) => {
    const response = await vnpayServices.createPayment(dataPayment);
    window.location.href = response.paymentUrl;
  };

  const value = {
    cartData: state.cartData,
    cartTotalPrice: state.cartTotalPrice,
    cartQuanity: state.cartQuanity,
    addProductToCart: (productData) => {
      dispatch({ type: ADD_PRODUCT_TO_CART_ACTION, payload: productData });
    },
    removeItemProductInCart: (productId) => {
      dispatch({ type: REMOVE_ITEM_CART_ACTION, payload: productId });
    },
    removeAllProduct: () => {
      dispatch({ type: REMOVE_ALL__CART_ACTION });
    },
    handleOrderWithVnpay
  };

  return <CartOrderOffContext.Provider value={value}>{children}</CartOrderOffContext.Provider>;
};

export default CartOrderOffProvider;
