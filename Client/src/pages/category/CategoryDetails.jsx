import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import productServices from '../../services/productService';
import { SpinnerLoading } from '../../components/ui/loaders';
import CardProduct from '../../components/card/CardProduct';
import { HandleCartContext } from '../../contexts/HandleCartContext';
import { UserContext } from '../../contexts/UserContext';
import TitleCategory from './components/TitleCategory';
import categoryServices from '../../services/categoryService';
import useSrcollTop from '../../hooks/useSrcollTop';

const CategoryDetails = () => {
  useSrcollTop()
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  const [category, setCategory] = useState({});
  const { handleAddToCart } = useContext(HandleCartContext);

  const { responsData: productData, isLoading: isProductLoading } = 
    useFetch(() => productServices.getProductWithCategory(id), {}, [id]);

  const { responsData: allCategories } = useFetch(categoryServices.getCategory);

  useEffect(() => {
    if (productData) {
      const products = productData.flatMap(subcategory => subcategory.products);
      setCategoriesProduct(products);
    }
  }, [productData]);

  useEffect(() => {
    const foundCategory = allCategories?.find(categories => categories._id === id);
    if (foundCategory) setCategory(foundCategory);
  }, [id, allCategories]);

  return (
    <div>
      <div className="flex justify-start pb-5">
        <TitleCategory nameCategory={category?.name || 'Danh mục'} />
      </div>

      {isProductLoading ? (
        <div className="flex justify-center pt-[50px]">
          <SpinnerLoading />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {categoriesProduct.length > 0 ? (
            categoriesProduct.map(product => (
              <CardProduct
                key={product._id}
                products={product}
                handleAddToCart={() => handleAddToCart(product._id, user?._id)}
              />
            ))
          ) : (
            <div className="col-span-4 flex items-center justify-center w-full h-full">
              <p className="pt-5 text-center">Tạm thời chưa có</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
