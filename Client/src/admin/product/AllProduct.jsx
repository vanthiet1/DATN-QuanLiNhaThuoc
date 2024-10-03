import React, { createContext, useContext, useEffect, useState } from 'react';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import { Button } from '../../components/ui/button';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import CardProductAdmin from '../../components/card/CardProductAdmin';
import PaginatedItems from '../../components/paginate/Paginate';
import { Image } from '../../components/ui/image';
import formatsHelper from '../../utils/helpers/formats';
import { useConfirmDialog } from '../../components/dialog/ConfirmDialogContext';
import subCategoryServices from '../../services/subCategoryService';

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
  const [isActionDeleteToggle, setIsActionDeleteToggle] = useState(false);
  const [numberPage, setNumeberPage] = useState(1);
  const [isActionDeleteProduct, setIsActionDeleteProduct] = useState(false);
  const [productQuery, setProductQuery] = useState('');

  const handleToggleShowProduct = () => {
    setIsShowProductWithGrid(!isShowProductWithGird);
  };

  const handleRunAfterDeleteProductItem = () => {
    setIsActionDeleteToggle(!isActionDeleteToggle);
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
        handleRunAfterDeleteProductItem,
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
              <option value='sortField=price_distcount&sortOrder=asc'>Low to High</option>
              <option value='sortField=price_distcount&sortOrder=desc'>High to Low</option>
              <option value='sortField=stock&sortOrder=asc'>Low to Low stock</option>
              <option value='sortField=stock&sortOrder=desc'>High to Low stock</option>
            </select>
            <Button
              onClick={() => handleFilterProduct(searchValue, categoryId, sortOption)}
              leftIcon={<AppIcons.SearchIcons />}
              addClassNames={'bg-slate-700 text-white'}
              size='m'
              rounded='s'
            >
              search
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
  const { isLoading, productData, isShowProductWithGird, handleChangeNumberPage, handleDeleteProduct } =
    useContext(ProductAdminContext);
  console.log(productData);

  return (
    <div className='show-product-wrapper'>
      {isLoading && <div>Loadding ...</div>}
      {isShowProductWithGird ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {productData &&
            productData.productsList.map((product) => {
              return <CardProductAdmin product={product} key={product._id} />;
            })}
        </div>
      ) : (
        <div>
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  Image
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  price_distcount
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {productData &&
                productData.productsList.map((product) => {
                  const { name, price_distcount, _id, images } = product;
                  return (
                    <tr key={_id} className='hover:bg-gray-100'>
                      <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>
                        <Image src={images[0].url_img} addClassNames='w-[50px] h-[50px] object-contain'></Image>
                      </td>
                      <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-700'>{name}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {formatsHelper.currency(price_distcount)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm flex '>
                        <Button
                          size='m'
                          rounded='s'
                          addClassNames='bg-teal-500 text-white hover:bg-teal-600 px-3 py-1 rounded-md'
                        >
                          <AppIcons.EyeIcon width='20' height='20' />
                        </Button>
                        <Button
                          size='m'
                          rounded='s'
                          addClassNames='bg-blue-500 text-white hover:bg-blue-600 px-3 py-1 rounded-md ml-2'
                        >
                          <AppIcons.EditIcon width='20' height='20' />
                        </Button>
                        <Button
                          size='m'
                          rounded='s'
                          addClassNames='bg-rose-500 text-white hover:bg-rose-600 px-3 py-1 rounded-md ml-2'
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <AppIcons.TrashBinIcon width='20' height='20' />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      <div>
        {productData && (
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
