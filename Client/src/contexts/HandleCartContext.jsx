import { useState  , useContext } from 'react';
import { createContext } from 'react';
import cartServices from '../services/cartService';
import { ToggleFormContext } from './ToggleFormContext';
import { CartContext } from './CartContext';
export const HandleCartContext = createContext();

const HanldeCartProvider = ({ children }) => {
  const { handleOpenDialog } = useContext(ToggleFormContext) || {}
  const {getProductCart} = useContext(CartContext) || {}
    const [quantityProductDetail, setQuantityProductDetail] = useState(1)
    const [calculateTotalPrice, setCalculateTotalPrice] = useState(0)
    const [dataRequestBody,setDataRequestBody] = useState(null)
    const handlePlusQuantity = () => {
        setQuantityProductDetail(pre => pre + 1)
      }
      const handleMinusQuantity = () => {
        if (quantityProductDetail <= 1) return
        setQuantityProductDetail(quantityProductDetail - 1)
      }
      const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setQuantityProductDetail(value);
      };
      const handleAddToCart = async () => {
        if (!dataRequestBody.user || !dataRequestBody.product[0]) return;
        const cart = {
          userId: dataRequestBody?.user?._id,
          products: [
            {
              productId: dataRequestBody?.product[0]?._id,
              quantity: quantityProductDetail,
            }
          ]
        }
        if(!cart) return
        const dataCart = await cartServices.addToCart(cart)
        if (!dataCart) return 
        await getProductCart(dataRequestBody?.user?._id)
        handleOpenDialog('notificationModal');
      }
      const featureCart = {
        handlePlusQuantity,
        handleMinusQuantity,
        handleAddToCart,
        setCalculateTotalPrice,
        handleQuantityChange,
         calculateTotalPrice,
         quantityProductDetail,
         setDataRequestBody
      }
      
    return (
        <HandleCartContext.Provider value={featureCart}>
            {children}
        </HandleCartContext.Provider>
    );
};

export default HanldeCartProvider;
