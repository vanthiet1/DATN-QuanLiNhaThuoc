import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const sliderConfig = {
  modules: [Pagination, Autoplay, Navigation], 
  pagination: { clickable: true },
  spaceBetween: 50,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true, 
};

export default sliderConfig;
