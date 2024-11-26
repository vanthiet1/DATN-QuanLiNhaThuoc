import { useState , useContext } from "react";
import TitleCategory from "../category/components/TitleCategory";
import useFetch from "../../hooks/useFetch";
import productServices from "../../services/productService";
import CardProduct from "../../components/card/CardProduct";
import Paginate from '../../components/paginate/Paginate';
import useSrcollTop from "../../hooks/useSrcollTop";
import { HandleCartContext } from "../../contexts/HandleCartContext";
import { UserContext } from "../../contexts/UserContext";
const AllProduct = () => {
  const [numberPage, setNumberPage] = useState(1);
  const { handleAddToCart } = useContext(HandleCartContext);
  const {user} = useContext(UserContext);

  useSrcollTop(numberPage)
  const {
    responsData: products,
  } = useFetch(() => productServices.getAllProducts(`?page=${numberPage}&limit=${10}`), {}, [numberPage]);

  console.log(products);

  const handleChangeNumberPage = () => {
    setNumberPage(newPage => newPage + 1);
  };
  return (
    <div>
      <div>
        <div className="flex justify-start pb-5">
          <TitleCategory nameCategory={"Tất cả sản phẩm"} />
        </div>
        <div className="grid grid-cols-4 gap-2 py-6">
          {products?.productsList?.map((product) => (
            <CardProduct
             key={product._id}
             products={product}
             handleAddToCart={() => handleAddToCart(product?._id, user?._id,true)}
             />
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
