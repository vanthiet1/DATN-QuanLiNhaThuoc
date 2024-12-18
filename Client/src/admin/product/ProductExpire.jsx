import React from 'react';
import productServices from '../../services/productService';
import useFetch from '../../hooks/useFetch';
import CardProductAdmin from '../../components/card/CardProductAdmin';

const ProductExpire = () => {
  const { isLoading, isError, responsData: productData, messageError } = useFetch(productServices.getproductExpire, {});
  console.log(productData);

  if (isError) {
    return <div>{messageError}</div>;
  }

  if (isLoading) {
    return <div>... Loading</div>;
  }

  return (
    <div className='mt-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {productData &&
          productData.expiringProducts.map((product) => {
            return <CardProductAdmin product={product} key={product._id} />;
          })}
      </div>
    </div>
  );
};

export default ProductExpire;
