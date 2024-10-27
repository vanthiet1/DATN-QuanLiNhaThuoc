import { createContext, useContext, useState } from 'react';
import { Button } from '../../components/ui/button';
import CartOrderOffProvider, { CartOrderOffContext } from './context/CartOrderOffProvider';
import SectionInforOrder from './components/SectionInforOder';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import Paginate from '../../components/paginate/Paginate';
import CardProduct from '../../components/card/CardProduct';
import { InputText } from '../../components/ui/form';
import AppIcons from '../../components/ui/icon';

const HeaderListProduct = () => {
  return (
    <div className='flex items-center gap-2 mb-10'>
      <InputText placeholder='search product you want here ...' size='l' rounded='m' />
      <Button size='l' rounded='m' addClassNames='bg-slate-600 text-white'>
        <AppIcons.SearchIcons />
      </Button>
    </div>
  );
};

const SectionListProduct = () => {
  const { addProductToCart } = useContext(CartOrderOffContext);
  const { handleChangeNumberPage, productAllData } = useContext(OrderSaleOffContext);

  const handleAddProductToCart = (_id = 1, price, quantity = 1, name, image) => {
    addProductToCart({ _id, price, quantity, name, image });
  };

  return (
    <section className='mt-4'>
      <HeaderListProduct />
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {productAllData &&
          productAllData.productsList.map((item) => {
            const { _id, price_distcount, name, images, description_short } = item;
            return (
              <CardProduct
                key={_id}
                image={images[0].url_img}
                name={name}
                priceOld={price_distcount}
                description_short={description_short}
                handleAddProductToCart={() => handleAddProductToCart(_id, price_distcount, 1, name, images[0].url_img)}
              ></CardProduct>
            );
          })}
      </div>
      <div>
        {productAllData && productAllData.productsList.length > 0 && (
          <Paginate totalNumberPage={productAllData.totalNumberPage} setNumberPage={handleChangeNumberPage} />
        )}
      </div>
    </section>
  );
};

const OrderSaleOffContext = createContext();

const OrderSaleOffProvider = ({ children }) => {
  const [numberPage, setNumeberPage] = useState(1);

  const {
    isLoading,
    isError,
    responsData: productAllData,
    messageError
  } = useFetch(() => productServices.getAllProducts(`?page=${numberPage}&limit=20`), {}, [numberPage]);

  const handleChangeNumberPage = (number) => {
    setNumeberPage(number);
  };

  const orderSaleOffState = {
    productAllData,
    handleChangeNumberPage,
    isLoading,
    isError,
    messageError
  };

  return <OrderSaleOffContext.Provider value={orderSaleOffState}>{children}</OrderSaleOffContext.Provider>;
};

const OrderSaleOff = () => {
  return (
    <div>
      <OrderSaleOffProvider>
        <CartOrderOffProvider>
          <SectionInforOrder />
          <SectionListProduct />
        </CartOrderOffProvider>
      </OrderSaleOffProvider>
    </div>
  );
};

export default OrderSaleOff;
