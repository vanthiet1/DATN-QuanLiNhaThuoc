import { createContext, useContext, useState } from 'react';
import { Button } from '../../components/ui/button';
import CartOrderOffProvider, { CartOrderOffContext } from './context/CartOrderOffProvider';
import SectionInforOrder from './components/SectionInforOder';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import Paginate from '../../components/paginate/Paginate';
import CardProduct from '../../components/card/CardProduct';
import { InputText, SelectBox } from '../../components/ui/form';
import AppIcons from '../../components/ui/icon';
import subCategoryServices from '../../services/subCategoryService';
import { showToastError } from '../../configs/toastConfig';

const HeaderListProduct = () => {
  const { handleFilterProduct } = useContext(OrderSaleOffContext);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { responsData: subCagegoryData } = useFetch(subCategoryServices.getSubCategory);

  const handleConvertToSelectValue = (arr) => {
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.map((item) => {
        return { ...item, value: item._id, title: item.name };
      });
    }
    return [{ value: 1, title: '' }];
  };

  return (
    <div className='flex items-center gap-2 mb-10'>
      <div className='flex-grow'>
        <InputText
          placeholder='search product you want here ...'
          size='l'
          rounded='m'
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div>
        <SelectBox
          onChange={(e) => setCategoryId(e.target.value)}
          size='l'
          rounded='m'
          optionData={handleConvertToSelectValue(subCagegoryData) || []}
        />
      </div>
      <Button
        size='l'
        rounded='m'
        addClassNames='bg-slate-600 text-white'
        onClick={(e) => handleFilterProduct(searchValue, categoryId)}
      >
        <AppIcons.SearchIcons />
      </Button>
    </div>
  );
};

const SectionListProduct = () => {
  const { addProductToCart } = useContext(CartOrderOffContext);
  const { handleChangeNumberPage, productAllData } = useContext(OrderSaleOffContext);

  const handleAddProductToCart = (_id = 1, price, quantity = 1, name, image, stock) => {
    if (stock > 0) {
      addProductToCart({ _id, price, quantity, name, image });
    } else {
      showToastError('sản phẩm này đã hết hàng');
    }
  };

  return (
    <section className='mt-4'>
      <HeaderListProduct />
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {productAllData &&
          productAllData.productsList.map((item) => {
            const { _id, price_distcount, name, images, stock } = item;
            return (
              <CardProduct
                key={_id}
                products={item}
                handleAddToCart={() => handleAddProductToCart(_id, price_distcount, 1, name, images[0].url_img, stock)}
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
  const [productQuery, setProductQuery] = useState('');

  const {
    isLoading,
    isError,
    responsData: productAllData,
    messageError
  } = useFetch(() => productServices.getAllProducts(`?page=${numberPage}&limit=20&${productQuery}`), {}, [
    numberPage,
    productQuery
  ]);

  const handleChangeNumberPage = (number) => {
    setNumeberPage(number);
  };

  const handleFilterProduct = (searchValue, categoryId) => {
    if (!searchValue && !categoryId) {
      setProductQuery('');
    } else {
      setProductQuery(`key=${searchValue}&categoryId=${categoryId}`);
    }
  };

  const orderSaleOffState = {
    productAllData,
    handleChangeNumberPage,
    handleFilterProduct,
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
