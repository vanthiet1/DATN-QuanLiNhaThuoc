import { Swiper, SwiperSlide } from 'swiper/react';
import bannerServices from "../../../services/bannerService";
import useFetch from '../../../hooks/useFetch';
import SpinnerLoading from "../../../components/ui/loaders/SpinnerLoading";
import sliderConfig from "../../../configs/sliderConfig";
import 'swiper/css';
import 'swiper/css/pagination';
const SectionHeroBanner = () => {
    const { isLoading, responsData: initialBannerData } = useFetch(bannerServices.getAllBanner);
    if (isLoading) return <div className="flex justify-center pt-[50px]">
        <SpinnerLoading />
    </div>;
    return (
        <div className="flex  w-[1400px] h-auto m-auto items-center gap-2 ">
            <Swiper
                {...sliderConfig}
                className="mySwiper rounded-[5px]"
            >
                {initialBannerData && initialBannerData.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <img className="object-cover w-full cursor-pointer rounded-[5px]" src={banner?.url_img} alt={banner?.title || "Banner"} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="w-full border-2 border-slate-200 rounded-[5px]">
                <img src="https://www.medigoapp.com/assets/images-html/sub-banner.jpg" alt="" />
                <div className="flex justify-between items-center p-4">
                    <div>
                        <span className="block">Bạn cần tư vấn</span>
                        <span className="block text-[#2563eb] font-bold text-[25px]">Với chúng tôi</span>
                    </div>
                    <button className="bg-[#2563eb]  text-[#fff] p-2 rounded-[50px] w-[150px] py-3">ĐẶT TƯ VẤN</button>
                </div>
            </div>
        </div>
    );
};

export default SectionHeroBanner;
