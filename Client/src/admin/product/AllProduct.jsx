import React, { createContext, useContext, useState } from 'react';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import CardProductAdmin from '../../components/card/CardProductAdmin';
import PaginatedItems from '../../components/paginate/Paginate';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import subCategoryServices from '../../services/subCategoryService';
import TableProduct from './components/TableProduct';

const productBreadCrumbs = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All product'
  }
];

export const ProductAdminContext = createContext({});

const ProductAdminContextProvider = ({ children }) => {
  const [isShowProductWithGird, setIsShowProductWithGrid] = useState(true);
  const [numberPage, setNumeberPage] = useState(1);
  const [isActionDeleteProduct, setIsActionDeleteProduct] = useState(false);
  const [productQuery, setProductQuery] = useState('');

  const handleToggleShowProduct = () => {
    setIsShowProductWithGrid(!isShowProductWithGird);
  };

  const handleChangeNumberPage = (number) => {
    setNumeberPage(number);
  };

  const handleFilterProduct = (searchValue, categoryId, sortOption) => {
    if (!searchValue && !categoryId && !sortOption) {
      setProductQuery('');
    } else {
      setProductQuery(`key=${searchValue}&categoryId=${categoryId}&${sortOption}`);
    }
  };

  const confirmDialog = useConfirmDialog();
  const handleDeleteProduct = async (product) => {
    const result = await confirmDialog({
      title: 'Xóa sản phẩm',
      iconLeft: <AppIcons.TrashBinIcon />,
      message: `Bạn có muốn xóa ${product.name} không ?`,
      confirmLabel: 'Có, tôi đồng ý',
      cancelLabel: 'Không, giữ lại'
    });
    if (result) {
      await productServices.deleteProduct(product._id);
      setIsActionDeleteProduct(!isActionDeleteProduct);
    }
  };

  const {
    isLoading,
    isError,
    responsData: productData,
    messageError
  } = useFetch(() => productServices.getAllProducts(`?page=${numberPage}&${productQuery}`), {}, [
    numberPage,
    isActionDeleteProduct,
    productQuery
  ]);

  if (isError) {
    return <div>{messageError}</div>;
  }

  return (
    <ProductAdminContext.Provider
      value={{
        handleToggleShowProduct,
        isShowProductWithGird,
        productData,
        handleChangeNumberPage,
        isLoading,
        handleDeleteProduct,
        handleFilterProduct
      }}
    >
      {children}
    </ProductAdminContext.Provider>
  );
};

const ProductHeaderBar = () => {
  const { handleToggleShowProduct, isShowProductWithGird, handleFilterProduct } = useContext(ProductAdminContext);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sortOption, setsortOption] = useState('');

  const { responsData: subCagegoryData } = useFetch(subCategoryServices.getSubCategory);

  const filterOptions = [
    { value: 'sortField=price_distcount&sortOrder=asc', title: 'Low to High' },
    { value: 'sortField=price_distcount&sortOrder=desc', title: 'High to Low' },
    { value: 'sortField=stock&sortOrder=asc', title: 'Low to Low stock' },
    { value: 'sortField=stock&sortOrder=desc', title: 'High to Low stock' }
  ];

  return (
    <div className='min-w-0 rounded-lg shadow-xs overflow-hidden bg-white mt-5 mb-5 shadow-md'>
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-600 flex-shrink-0 '>All Products</p>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='search product'
              className='min-w-[300px]  border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
            ></input>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className='min-w-[300px]  border  border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
            >
              <option value=''>Filter by Category</option>
              {subCagegoryData &&
                subCagegoryData.map((category) => {
                  return (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>

            <select
              onChange={(e) => setsortOption(e.target.value)}
              className=' border border-gray-300 text-gray-600 text-base rounded block w-full py-1 px-2 focus:outline-none'
            >
              <option value=''>Sort by</option>
              {filterOptions.map((filter) => {
                return (
                  <option value={filter.value} key={filter.value}>
                    {filter.title}
                  </option>
                );
              })}
            </select>
            <Button
              onClick={() => handleFilterProduct(searchValue, categoryId, sortOption)}
              leftIcon={<AppIcons.SearchIcons />}
              addClassNames={'bg-slate-500 hover:bg-slate-600 text-white'}
              size='m'
              rounded='s'
            >
              Search
            </Button>
          </div>
          <div>
            <Button onClick={() => handleToggleShowProduct()}>
              {isShowProductWithGird ? <AppIcons.SquaresTwoxTwoIcon /> : <AppIcons.BarsThreeIcon />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProducShowWrapper = () => {
  const { isLoading, productData, isShowProductWithGird, handleChangeNumberPage } = useContext(ProductAdminContext);

  return (
    <div className='show-product-wrapper'>
      {isLoading && <div>loadding ...</div>}
      {isShowProductWithGird ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {productData &&
            productData.productsList.map((product) => {
              return <CardProductAdmin product={product} key={product._id} />;
            })}
        </div>
      ) : (
        <div>
          <TableProduct productData={productData} />
        </div>
      )}
      <div>
        {productData && productData.productsList.length > 0 && (
          <PaginatedItems totalNumberPage={productData.totalNumberPage} setNumberPage={handleChangeNumberPage} />
        )}
      </div>
    </div>
  );
};

const AllProduct = () => {
  return (
    <div>
      <SectionWrapper title='All product' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={productBreadCrumbs}></BreadCrumb>
        <div>
          <ProductAdminContextProvider>
            <ProductHeaderBar />
            <ProducShowWrapper />
          </ProductAdminContextProvider>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AllProduct;
