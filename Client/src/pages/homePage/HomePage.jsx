import { Link } from "react-router-dom";
import SectionHeroBanner from "./components/SectionHeroBanner";
import CardCategory from "../../components/card/cardCategory";
import categoryServices from "../../services/categoryService";
import useFetch from "../../hooks/useFetch";
import productServices from "../../services/productService";
import CardProduct from "../../components/card/CardProduct";
import formatsHelper from "../../utils/helpers/formats";
import { SpinnerLoading } from "../../components/ui/loaders";
import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderConfigProduct } from "../../configs/sliderConfig";
import 'swiper/css';
import 'swiper/css/pagination';
// import 
const HomePage = () => {
  const { responsData: initialCategoryData } = useFetch(categoryServices.getCategory)
  const { responsData: initialProductRecommendData } = useFetch(productServices.getListProductNew)

  return (
    <div className="overflow-hidden w-full">
      <SectionHeroBanner />
      <div className="w-full">
        <div>
          <div className="flex justify-center">
            <Link>
              <h1 className=" font-bold text-[25px] py-[30px]">Danh mục sản phẩm</h1>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2 ">
            {initialCategoryData && initialCategoryData.map((category) => (
              <div key={category._id}>
                <CardCategory categoriesId={category._id} name={category?.name} description={category?.description} image={category.image || "https://www.medigoapp.com/assets/images-html/suc-khoe-sinh-san-category.png"} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <Link>
              <h1 className=" font-bold text-[25px] py-[30px]">Sản phẩm mới nhất</h1>
            </Link>
          </div>

          {initialProductRecommendData ? (
            <div className="flex">
              <Swiper {...sliderConfigProduct} className="mySwiper rounded-[5px]">
                {initialProductRecommendData.map((newProduct) => (
                  <SwiperSlide key={newProduct._id}>
                    <CardProduct
                      detail={`product/${newProduct.slug}`}
                      name={newProduct?.name}
                      description_short={newProduct?.description_short}
                      image={newProduct?.images[0]?.url_img || "https://files.oaiusercontent.com/file-IPwu8S65s4cwPOR4Zr0PlI3T?se=2024-10-05T09%3A36%3A42Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D6fc820c0-e22c-468f-9e9c-1fd1e1924ba3.webp&sig=hnxYedfodtMQk%2BHnD3lYe%2BJ2lVaA5lJM80muqMZN6Vo%3D"}
                      priceNew={formatsHelper.currency(newProduct?.price_distcount)}
                      priceOld={formatsHelper.currency(newProduct?.price_old)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="flex justify-center">
              <SpinnerLoading />
            </div>
          )}

        </div>
      </div>
    </div>
  )
};

export default HomePage;
