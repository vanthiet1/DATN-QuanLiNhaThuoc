import { Swiper, SwiperSlide } from 'swiper/react';
import bannerServices from "../../../services/bannerService";
import useFetch from '../../../hooks/useFetch';
import SpinnerLoading from "../../../components/ui/loaders/SpinnerLoading";
import { sliderConfigBanner } from '../../../configs/sliderConfig';
import 'swiper/css';
import 'swiper/css/pagination';
const SectionHeroBanner = () => {
    const { isLoading, responsData: initialBannerData } = useFetch(bannerServices.getAllBanner);
    if (isLoading) return <div className="flex justify-center pt-[50px]">
        <SpinnerLoading />
    </div>;
    return (
        <div className="flex max-md:flex-col gap-4">
        <Swiper
            {...sliderConfigBanner}
            className="mySwiper rounded-[5px] flex-[7] max-w-[1000px]"
        >
            {initialBannerData &&
                initialBannerData.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className="object-cover w-full cursor-pointer rounded-[5px] h-[300px] max-md:h-[200px]"
                            src={banner?.url_img}
                            alt={banner?.title || "Banner"}
                        />
                    </SwiperSlide>
                ))}
        </Swiper>
        <div className="flex-[3] border-2 border-slate-200 rounded-[5px] overflow-hidden">
            <img
                className="w-full h-[210px] object-cover"
                src="https://res.cloudinary.com/dddz1buyw/image/upload/v1728103590/banners/Banner_Web_PC_1610x492_78f11f2d35_ga5xpw.webp"
                alt="Tư vấn"
            />
            <div className="flex justify-between items-center p-4">
                <div>
                    <span className="block text-sm text-gray-600">Bạn cần tư vấn</span>
                    <span className="block text-[#2563eb] font-bold text-[20px] max-md:text-[18px]">
                        Với chúng tôi
                    </span>
                </div>
                <button className="bg-[#2563eb] text-white py-2 px-4 rounded-full max-md:py-2 max-md:px-3 max-md:text-[14px]">
                    ĐẶT TƯ VẤN
                </button>
            </div>
        </div>
    </div>
    
    
    );
};

export default SectionHeroBanner;
