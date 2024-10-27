import React, { createContext, useContext, useEffect, useState } from 'react';
import SectionWrapper from '../../components/sectionWrapper/SectionWrapper';
import BreadCrumb from '../../components/breadCrumb/BreadCrumb';
import { PATH_ROUTERS_ADMIN } from '../../utils/constant/routers';
import AppIcons from '../../components/ui/icon';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import { Image } from '../../components/ui/image';
import { cn } from '../../utils/helpers/mergeClasses';
import { Button } from '../../components/ui/button';
import commetServices from '../../services/commentService';

const adminProductDetailsBreadCrums = [
  {
    path: `/${PATH_ROUTERS_ADMIN.DASHBOARD}`,
    title: 'Dashboard',
    icon: <AppIcons.HomeIcon width='16' height='16' />
  },
  {
    title: 'All product',
    path: `/${PATH_ROUTERS_ADMIN.ALL_PRODUCT}`
  },
  {
    title: 'Admin product details'
  }
];

const SectionProductDetails = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const { productData } = useContext(ProductDetailsContext);

  const handleCalculatorExpiration = (production_date, expiration_date) => {
    if (!production_date || !expiration_date) {
      return 'Xem hạn sử dụng ở bao bì';
    }
    const date1 = new Date(production_date);
    const date2 = new Date(expiration_date);
    const monthsDifference = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());

    return `${monthsDifference} tháng từ ngày sản xuất`;
  };

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
        <div className='left flex flex-col'>
          {productData && (
            <Image
              src={productData[0].images[imageIndex].url_img}
              addClassNames='w-[300px] h-[250px] object-cover'
              alt={productData[0].images[imageIndex].url_img}
            />
          )}
          <div className='grid grid-cols-4 gap-2 items-center my-2 bg-gray-100 p-2'>
            {productData &&
              productData[0].images.map((image, index) => {
                return (
                  <div
                    key={image._id}
                    className={cn(
                      `bg-white border border-solid border-transparent hover:border-gray-300 hover:cursor-pointer`,
                      { 'border-gray-300': index === imageIndex }
                    )}
                    onClick={() => setImageIndex(index)}
                  >
                    <Image src={image.url_img} addClassNames='w-full h-[120px] ' alt={image.url_img}></Image>
                  </div>
                );
              })}
          </div>
        </div>
        {productData && (
          <div className='right text-gray-700'>
            <Link className='text-sm' to={`/product/${productData[0].slug}`}>
              Đi tới trang sản phẩm chi tiết sản phẩm online
            </Link>
            <h2 className='text-lg mt-1 mb-4'>{productData[0].name}</h2>
            <div className='text-gray-500'>
              <p className=''>
                <span>Gía tiền:</span> <span>{productData[0].price_distcount}</span>
              </p>
              <p className=''>
                <span>Thể loại:</span> <span>{productData[0].sub_category[0].name}</span>
              </p>
              <p className=''>
                <span>Thương hiệu:</span> <span>{productData[0].brand[0].name}</span>
              </p>
              <p className=''>
                <span>Công dụng:</span> <span>{productData[0].description_short}</span>
              </p>
              <p className=''>
                <span>Số lượng sản phẩm trong kho:</span> <span>{productData[0].stock} sản phẩm</span>
              </p>
              <p className=''>
                <span>Tình trạng sản phẩm:</span> <span>{productData[0].stock > 0 ? 'còn hàng' : 'hết'}</span>
              </p>
              <p className=''>
                Hạn sử dụng:{' '}
                <span>
                  {handleCalculatorExpiration(productData[0].production_date, productData[0].expiration_date)}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      {productData && <ShowDescriptionProduct description={productData[0].description} />}
    </>
  );
};

const ShowDescriptionProduct = ({ description }) => {
  const [isShow, setIsShow] = useState(false);
  const handleShowDescription = () => {
    setIsShow(!isShow);
  };

  return (
    <div>
      <div className='max-w-[1000px] mx-auto mt-[50px]'>
        <Button
          addClassNames=' py-4 items-center justify-center w-full hover:text-blue-600'
          onClick={() => handleShowDescription()}
        >
          {isShow ? 'Thu nhỏ' : 'Xem thêm chi tiết sản phẩm'}
        </Button>
        {description && (
          <div
            className={cn('h-[100px] overflow-hidden', { 'h-auto': isShow })}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}
      </div>
    </div>
  );
};

const SectionCommentProduct = () => {
  const { productData } = useContext(ProductDetailsContext);

  if (!productData) {
    return <div>sản phẩm ko hiển thị</div>;
  }

  // const { responsData } = useFetch(() => commetServices.getAllComments(productData[0]._id), {}, [productData]);

  return <div className='mt-8'>Chức năng chưa hoàn thành , đang trong quá trình chuẩn bị</div>;
};

const ProductDetailsContext = createContext();
const ProductDetailsAdminProiver = ({ children }) => {
  const { slug } = useParams();
  const { isLoading, responsData: productData } = useFetch(() => productServices.getProductWithBySlug(slug), {}, [
    slug
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ProductDetailsContext.Provider value={{ productData, isLoading }}>{children}</ProductDetailsContext.Provider>;
};

const ProductDetailsAdmin = () => {
  return (
    <div>
      <SectionWrapper title='Admin product details' addClassNames={{ wrapper: 'mt-2' }}>
        <BreadCrumb crumbsData={adminProductDetailsBreadCrums}></BreadCrumb>
        <ProductDetailsAdminProiver>
          <SectionProductDetails />
          <SectionCommentProduct />
        </ProductDetailsAdminProiver>
      </SectionWrapper>
    </div>
  );
};

export default ProductDetailsAdmin;
