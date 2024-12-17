import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const sliderConfigBanner = {
  modules: [ Autoplay, Navigation], 
  pagination: { clickable: true },
  spaceBetween: 50,
  slidesPerView: 1,
  pagination: {
    clickable: true,
},

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true, 
  
};
const sliderConfigProduct = {
  modules: [Pagination, Autoplay, Navigation], 
  spaceBetween: 16,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true, 
  breakpoints: {
    0: { 
      slidesPerView: 1, 
      spaceBetween: 8,
    },
    350: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    550:{
      slidesPerView: 2, 
      spaceBetween: 16,
    },
    768: { 
      slidesPerView: 5, 
      spaceBetween: 16,
    },
  },
};
export {
  sliderConfigBanner,
  sliderConfigProduct
} 
