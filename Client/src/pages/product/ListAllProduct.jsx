import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleCategory from "../category/components/TitleCategory";
import useFetch from "../../hooks/useFetch";
import productServices from "../../services/productService";
import CardProduct from "../../components/card/CardProduct";
import Paginate from '../../components/paginate/Paginate';
import useSrcollTop from "../../hooks/useSrcollTop";
import { SpinnerLoading } from "../../components/ui/loaders";

const AllProduct = () => {
  const [numberPage, setNumberPage] = useState(1);
  useSrcollTop(numberPage)
  const {
    isLoading,
    responsData: products,
  } = useFetch(() => productServices.getAllProducts(`?page=${numberPage}&limit=${10}`), {}, [numberPage]);

  console.log(products);

  const handleChangeNumberPage = () => {
    setNumberPage(newPage => newPage + 1);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center">
  //       <SpinnerLoading />
  //     </div>
  //   )
  // }
  return (
    <div>
      <div>
        <div className="flex justify-start pb-5">
          <TitleCategory nameCategory={"Tất cả sản phẩm"} />
        </div>
        <div className="grid grid-cols-4 gap-2 py-6">
          {products?.productsList?.map((product) => (
            <CardProduct key={product._id} products={product} />
          ))}
        </div>
        <div className="flex justify-center">
          <Paginate
            totalNumberPage={products?.totalNumberPage}
            setNumberPage={handleChangeNumberPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
