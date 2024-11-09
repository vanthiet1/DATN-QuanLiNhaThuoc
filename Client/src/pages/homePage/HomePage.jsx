import { Link } from "react-router-dom";
import SectionHeroBanner from "./components/SectionHeroBanner";
import CardCategory from "../../components/card/CardCategory";
import categoryServices from "../../services/categoryService";
import useFetch from "../../hooks/useFetch";
import productServices from "../../services/productService";
import CardProduct from "../../components/card/CardProduct";
import { SpinnerLoading } from "../../components/ui/loaders";
import { Swiper, SwiperSlide } from 'swiper/react';
import { sliderConfigProduct } from "../../configs/sliderConfig";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import commentServices from "../../services/commentService";
import 'swiper/css';
import 'swiper/css/pagination';
import { HandleCartContext } from "../../contexts/HandleCartContext";
import Advertisement from "../../components/card/Advertisement";
import AppIcons from '../../components/ui/icon/index'
import FeedbackUser from "../../components/card/FeedbackUser";
import ManShip from '../../assets/images/home/man_shiping2.jpg'
import StepOrder from "./components/StepOrder";

const HomePage = () => {
  const { responsData: initialCategoryData } = useFetch(categoryServices.getCategory);
  const { responsData: initialProductRecommendData } = useFetch(productServices.getListProductNew);
  const { responsData: initialProductData } = useFetch(productServices.getAllDataProducts);

  const { responsData: initialCommentData } = useFetch(commentServices.getAllComments);
  const { user } = useContext(UserContext);
  const { handleAddToCart } = useContext(HandleCartContext);

  const [representativeProducts, setRepresentativeProducts] = useState([]);

  useEffect(() => {
    if (initialCategoryData && initialProductData) {
      const representativeData = initialCategoryData.map((category) => {
        const subCategories = category.subcategories;
        if (subCategories.length === 0) return null;
        const subCategory = subCategories[0];


        const productsForSubCategory = initialProductData.filter(
          (product) => product?.sub_category_id === subCategory?._id
        );

        const representativeProduct = productsForSubCategory[0] || null;

        return {
          categoryId: category._id,
          subCategoryId: subCategory._id,
          representativeProduct,
        };
      });

      const validRepresentativeData = representativeData.filter(item => item !== null);
      setRepresentativeProducts(validRepresentativeData);
    }
  }, [initialCategoryData, initialProductData]);


  return (
    <div className="overflow-hidden w-full">
      <SectionHeroBanner />
      <div className="w-full">
        <div>
          <div className="flex justify-center">
            <Link>
              <h1 className="font-bold text-[25px] pt-[30px]">Danh mục sản phẩm</h1>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2 py-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {initialCategoryData && initialCategoryData.map((category) => {
              const categoryImages = representativeProducts
                .filter(product => product.categoryId === category._id)
                .map(product => product?.representativeProduct?.images[0]?.url_img);
              return (
                <div key={category._id}>
                  <CardCategory
                    categoriesId={category._id}
                    name={category?.name}
                    description={category?.description}
                    image={categoryImages}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <Link>
              <h1 className="font-bold text-[25px] py-[30px]">Sản phẩm mới nhất</h1>
            </Link>
          </div>

          {initialProductRecommendData ? (
            <div className="flex">
              <Swiper {...sliderConfigProduct} className="mySwiper rounded-[5px]">
                {initialProductRecommendData.map((product) => (
                  <SwiperSlide key={product._id}>
                    <CardProduct
                      products={product}
                      handleAddToCart={() => handleAddToCart(product?._id, user?._id)}
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
          <div className="flex justify-between mt-[50px]">
            <Advertisement image={"https://www.medigoapp.com/assets/images-html/icon-support-popup-img.png"} title={"GIAO THUỐC NHANH"} description={"Đơn hàng của bạn sẽ được mua và giao từ nhà thuốc gần nhất và tốt nhất"} />
            <Advertisement image={"https://www.medigoapp.com/assets/images-html/icon-support-popup-img.png"} title={"ĐÁNG TIN CẬY"} description={"Bình An Dược chỉ hoạt động với các hiệu thuốc đạt chuẩn GPP và được cấp phép của Bộ Y Tế"} />
            <Advertisement image={"https://www.medigoapp.com/assets/images-html/icon-support-popup-img.png"} title={"TƯ VẤN NHIỆT TÌNH"} description={"Các dược sĩ kinh nghiệm sẽ gọi điện và tư vấn nhiệt tình cho bạn"} />
            <Advertisement image={"https://www.medigoapp.com/assets/images-html/icon-support-popup-img.png"} title={"PHỤC VỤ 24H"} description={"Khách hàng luôn biết trước giá với mức giá thành hợp lý , giúp bạn an tâm sử dụng dịch vụ"} />
          </div>
          <div className="mt-[70px]">
            <h1 className="font-bold text-[22px] text-center pb-4">Đánh giá của khách hàng</h1>
            <div className="grid grid-cols-3 w-[70%] gap-3 m-auto">
              {initialCommentData && initialCommentData?.slice(0,4).map((comment) => (
                <FeedbackUser
                  avatar={comment?.user_id?.avatar || "https://res.cloudinary.com/dz93cdipw/image/upload/v1713866997/Book-Store/Avatar/kwuemqemetzsp4jw21mt.webp"}
                  username={comment?.user_id?.fullname}
                  content={comment?.content} />
              ))}
            </div>
          </div>
          <div className="mt-[50px]">
            <div className="pt-5">
              <h1 className="text-[24px] text-center font-bold">Cách đặt thuốc online qua website Bình An Dược</h1>
              <div className="flex justify-center items-center gap-4 mt-[50px]">
                  <div>
                        <StepOrder />
                  </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#F3F8FB] mt-[70px] rounded-md">
            <div className="p-5">
              <h1 className="font-bold text-[25px] py-5">Giới thiệu webiste đặt thuốc online
                <span className="text-[#2563EB] pl-2">Bình An Dược</span>
              </h1>
              <p className="w-[850px] text-[14px]">Website   <span className="text-[#2563EB] font-semibold">Bình An Dược</span> mang trong mình sứ mệnh chăm sóc sức khỏe cho hàng triệu người dân Việt Nam. Chúng tôi luôn không ngừng nâng cao dịch vụ để mang lại chất lượng và trải nghiệm tốt nhất cho khách hàng.</p>
              <p className="w-[850px] text-[14px] pt-4">
                Với khát vọng trở thành nền tảng y tế từ xa uy tín, chất lượng hàng đầu Việt Nam và tương lai là vươn ra thế giới, <span className="text-[#2563EB] font-semibold">Bình An Dược</span> không ngừng nỗ lực, sáng tạo để mang lại cho người dùng dịch vụ chăm sóc sức khỏe nhanh chóng và chất lượng nhất.
              </p>
            </div>
            <div>
              <img className="w-[400px]" src={ManShip} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
