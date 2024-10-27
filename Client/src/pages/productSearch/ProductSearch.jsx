import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchProductServices from '../../services/searchProductService';
import CardProduct from '../../components/card/CardProduct';
import useFetch from '../../hooks/useFetch';
const ProductSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  console.log(query);

  const { isLoading, responsData: results, isError } = useFetch(()=> searchProductServices.getProductByQuery(query) , {} , [query])


if (isError) {
    return <div>Đã xảy ra lỗi khi tìm kiếm sản phẩm.</div>;
}
  console.log(results);
  if(!results) return
  return (
    <div>
    <h1 className='text-[20px] font-semibold py-4'>Kết quả tìm kiếm cho: {query}</h1>
    <div className="grid grid-cols-5 gap-5">
      {results?.length > 0 ? (
        results?.map((product) => (
          <CardProduct key={product?._id} products={product} />
        ))
      ) : (
        <div className="flex justify-center items-center col-span-5">
          <img className='w-[500px]' src="https://xe2banh.com.vn/img/no-products.png" alt="Không có sản phẩm" />
        </div>
      )}
    </div>
  </div>
  )
}

export default ProductSearch