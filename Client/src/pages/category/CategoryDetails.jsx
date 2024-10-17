import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import { SpinnerLoading } from '../../components/ui/loaders';
import CardProduct from '../../components/card/CardProduct';
import formatsHelper from '../../utils/helpers/formats';
const CategoryDetails = () => {
  const { id } = useParams();

  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const { responsData, isLoading } = useFetch(() => productServices.getProductWithCategory(id), {}, [id]);
  

  useEffect(() => {
    if (!isLoading && responsData) {
      const products = responsData.flatMap(subcategory => subcategory.products);
      setCategoriesProduct(products);
    }
  }, [isLoading, responsData]);
  console.log(categoriesProduct);

  if (isLoading) return (
    <div className="flex justify-center pt-[50px]">
      <SpinnerLoading/>
    </div>
  );

  return (
    <div>
         <div className="grid grid-cols-4 gap-5">
             {categoriesProduct.length > 0 ? (
          categoriesProduct && categoriesProduct.map(product => (
            <CardProduct
              image={product?.images[0]?.url_img}
              name={product?.name}
              description_short={product?.description_short}
              priceNew={formatsHelper.currency(product?.price_distcount)}
              priceOld={formatsHelper.currency(product?.price_old)}
              detail={`/product/${product?.slug}`}
            />
          ))) : (
            <div className="col-span-4 flex items-center justify-center w-full h-full">
      <p className="pt-5 text-center">Tạm thời chưa có</p>
    </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetails;
