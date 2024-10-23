import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import productServices from "../../services/productService";
import { SpinnerLoading } from "../../components/ui/loaders";
import AppIcons from '../../components/ui/icon/index'
// import formatsHelper from "../../utils/helpers/formats";
import {Button} from '../../components/ui/button/index'
const ProductDetail = () => {
  const { slug } = useParams();

  const { isLoading, responsData: product, isError } = useFetch(
    () => productServices.getProductWithBySlug(slug), { slug }, [slug]
  );




  if (isLoading) return <div><SpinnerLoading /></div>;
  if (isError) return <div>Trang hiện tại đang lỗi</div>;
  console.log(product);

  return (
    <div className="w-[80%] m-auto">
      {product ? (
        <div>
          <div className="flex gap-2 pb-4 items-center">
            <div>
              <Link to={'/'}>
                <AppIcons.HomeIcon />
              </Link>
            </div>
            <AppIcons.ArrowRight />
            <h1 className="text-[#6d6d6d] cursor-pointer">{product[0]?.name}</h1>
          </div>
          <div className="flex pt-4 gap-5 bg-[#FFFFFF] shadow p-10 rounded-[5px] mb-5">
            <div>
              <div className="w-[300px]">
                <img className="w-full" src={product[0]?.images[0]?.url_img
                } alt="" />
              </div>
              <div>
                {product[0]?.images.map((listImage) => (
                  <>
                    <div className="flex pt-2">
                      <img className="w-[100px] border-2 border-blue-600 rounded-[7px] cursor-pointer" src={listImage?.url_img
                      } alt="" />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h1 className="font-bold text-[30px]">{product[0]?.name}</h1>
              <div className="flex gap-3 pb-2">
                <span className="block font-semibold">Danh mục:</span>
            
                { product[0].sub_category.length < 0 &&  product[0]?.sub_category.map((subCate) => (
                  <div>
                    {subCate ? (
                      <span >{subCate?.name}</span>
                    ) : (
                      <span>Tạm thời thuốc chưa có danh mục</span>
                    )}
                  </div>
                ))}
           
              </div>
              <div className="flex gap-3 pb-2">
                <span className="block font-semibold">Công dụng:</span>
                <span className="max-w-[600px]">{product[0]?.description_short}</span>
              </div>
              <div className="flex gap-3 pb-2">
                <span className="block font-semibold">Thương hiệu:</span>
                {product[0]?.brand.map((brand) => (
                  <div>
                    {brand ? (
                      <span>{brand?.name}</span>
                    ) : (
                      <span>Tạm thời thuốc chưa có thương hiệu</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pb-2">
                <span className="block font-semibold">Ngày nhập thuốc:</span>
                {product[0]?.date ? (
                  <span>{product[0]?.date}</span>
                ) : (
                  <span>Tạm thời chưa có ngày nhập</span>
                )}
              </div>
              <div className="flex justify-between w-[350px]">
                <div className="flex gap-2 items-center">
                  <button className="border-2 border-slate-200 w-[40px] font-bold">-</button>
                  <input className="border-2 border-slate-200 w-[50px] pl-4 outline-none" type="text" value={1} />
                  <button className="border-2 border-slate-200 w-[40px] font-bold">+</button>
                </div>
                <div>
                  <span className="text-[20px] font-bold">15.000 VND</span>
                </div>
              </div>
              <div className="flex gap-4 pt-4  ">
              <Button
              addClassNames="text-[16px] uppercase border border-[#C9C9C9] p-2 py-1 px-[30px] rounded-[10px]  font-semibold hover:bg-gray-100 duration-300"
              >
                  Thêm giỏ hàng
              </Button>
              <Button
              addClassNames="text-[16px] text-[#fff] bg-[#2563EB] p-2 w-[150px] flex justify-center rounded-[10px] uppercase hover:bg-blue-700 duration-300"
              >
                  Mua ngay
              </Button>
              </div>
          
            </div>
          </div>
          <div className=" pt-4 gap-3 bg-[#FFFFFF] shadow p-10 rounded-[5px]">
                 <h1 className="font-bold text-[25px] pb-4">Thông tin sản phẩm</h1>
                 <span dangerouslySetInnerHTML={{ __html: product[0]?.description }} />
              </div>
        </div>
      ) : (
        <div>Hiện tại chưa có sản phẩm</div>
      )}
    </div>
  );
};

export default ProductDetail;
