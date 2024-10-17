import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const sliderConfigBanner = {
  modules: [ Autoplay, Navigation], 
  pagination: { clickable: true },
  spaceBetween: 50,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true, 
  
};
const sliderConfigProduct = {
  modules: [Pagination, Autoplay, Navigation], 
  spaceBetween: 50,
  slidesPerView: 4,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true, 
};
export {
  sliderConfigBanner,
  sliderConfigProduct
} 
