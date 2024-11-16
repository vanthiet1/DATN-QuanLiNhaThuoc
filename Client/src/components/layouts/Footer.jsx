import { Link } from 'react-router-dom';
import { PATH_ROUTERS_CLIENT } from '../../utils/constant/routers';
import logoFooter from '../../assets/images/logo/logo1.png';
import logo from '../../assets/images/logo/logo.png'
import logoFB from '../../assets/images/logo/logoFb.png'
import logoYoutobe from '../../assets/images/logo/logoYoutobe.png'
import logoTiktok from '../../assets/images/logo/logoTiktok.png'
import logoPhay from '../../assets/images/logo/logo CH Phay.png'
import logoAppStore from '../../assets/images/logo/logo App store.png'
import logoCongthuong from '../../assets/images/logo/logo Congthuong.png'



const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] text-[#27272a] p-10">
      <div className="container mx-auto">
        <div className="text-left mb-8">
          <img
            src={logoFooter}
            alt="Medigo Logo"
            className="w-[250px] h-auto hover:scale-90 transition-transform duration-300 ease-in-out"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 px-10 gap-6 cursor-pointer">

          <div>
            <h1 className="font-bold mb-3">Hỗ Trợ Khách Hàng</h1>
            <ul className="space-y-2">
              <li>Hotline: 1800 2247 (Miễn phí 24/7)</li>
              <li>Email: cskh@medigoapp.com</li>
              <li>Chính sách thanh toán</li>
              <li>Chính sách xử lý khiếu nại</li>
              <li>Chính sách vận chuyển và giao nhận</li>
              <li>Chính sách đổi trả và hoàn tiền</li>
              <li>Chính sách bảo mật thông tin</li>
              <li>Quy trình biên tập nội dung</li>
              <li>Miễn trừ trách nhiệm nội dung</li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div>
            <h1 className="font-bold mb-3">Về Bình An Dược</h1>
            <ul className="space-y-2">
            <Link to={`${PATH_ROUTERS_CLIENT.CONTACT}`}>
              <li  className='pb-2'>Giới thiệu</li>
            </Link>
            <Link className='' to={`${PATH_ROUTERS_CLIENT.ABOUT}`} >
              <li>Liên hệ</li>
            </Link>
              <li>Phòng xét nghiệm</li>
              <li>Tính bmi online</li>
              <li>Công cụ tính ngày dự sinh</li>
              <li>Công cụ tính ngày rụng trứng</li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h1 className="font-bold mb-3">Hợp Tác và Liên Kết</h1>
            <ul className="space-y-2">
              <li>Chính sách đối tác</li>
              <li>Bán hàng cùng Bình An Dược</li>
              <li>Danh sách nhà thuốc</li>
              <li>Danh sách dược sĩ</li>
              <li>Danh sách bác sĩ</li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h1 className="font-bold mb-3">Danh Mục Sản Phẩm</h1>
            <ul className="space-y-2">
      
              <li>Chăm sóc sắc đẹp</li>
              <li>Chăm sóc cá nhân</li>
              <li>Thiết bị y tế</li>
              <li>Thực phẩm chức năng</li>
              <li>Sức khoẻ sinh sản</li>
              <li>Thuốc</li>
              <li>Hoạt chất và dược liệu</li>
              <li>Tin tức</li>
            </ul>
          </div>

          {/* Cột 5 */}
          <div>
            <div className="text-center">
              <h1 className="font-bold mb-3">Kết Nối Với Chúng Tôi</h1>
              <div className="flex justify-center space-x-4">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoFB}
                    alt="Facebook"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoYoutobe}
                    alt="YouTube"
                    className="w-8 h-8"
                  />
                </a>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoTiktok}
                    alt="TikTok"
                    className="w-8 h-8"
                  />
                </a>
              </div>
            </div>
            <h1 className="font-bold mb-3 mt-9">Tải Ứng Dụng Trên Điện Thoại</h1>
            <div className="flex space-x-2">
              <img src={logoAppStore} alt="App Store" className="w-[120px] h-auto cursor-pointer" />
              <img src={logoPhay} alt="Google Play" className="w-[120px] h-auto cursor-pointer" />
            </div>

            <h1 className="font-bold mb-3 mt-9">Chứng Nhận Bởi</h1>
            <div className="flex space-x-2">
              <img src={logoCongthuong} alt="App Store" className="w-[120px] h-auto cursor-pointer" />              
            </div>
          </div>
        </div>

        {/* Certification */}
        <div className="mt-8 flex justify-center">
          <img src={logo} alt="Certification" className="w-[150px] h-auto" />
        </div>

        {/* Footer  */}
        <div className="mt-8 text-center text-xs text-[#6b7280]">
          <p>© 2014 - 2025 Công Ty Trách Nhiệm Hữu Hạn Bình An Dược</p>
          <p>Địa chỉ: Y1 Hồng Lĩnh, Phường 15, Quận 10, TPDN - Hotline: 1800 2247</p>
          <p>Từ khoá tìm kiếm: Nhà thuốc 24/24, Mua thuốc online, Nhà thuốc online, Hiệu thuốc gần đây</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
