import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppIcons from '../../components/ui/icon/index';

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  return (
    <div className="flex justify-center">
      <div className=" w-[1300px] ">
        <div className='flex gap-2 pb-4 items-center mb-2'>
          <div>
            <Link to={'/'}>
              <div className='flex'>
                <AppIcons.HomeIcon addClassNames='mr-2' /> Trang chủ
              </div>
            </Link>
          </div>
          <AppIcons.ArrowRight />
          <h1 className='text-[#6d6d6d] cursor-pointer'>Giới thiệu</h1>
        </div>
        <div className='bg-gradient-to-b from-blue-50 to-blue-100 p-8 font-sans text-gray-800 rounded-lg'>
          <h1 className='text-5xl font-bold text-center text-blue-900 mb-12'>Về Chúng Tôi</h1>

          <section className='mb-12 flex flex-col lg:flex-row items-center shadow-md rounded-lg bg-white overflow-hidden'>
            <div className='lg:w-1/2 w-full pl-5'>
              <img
                src='https://rx20.vn/wp-content/uploads/2021/08/8-1400x700.jpg'
                alt='Sứ Mệnh'
                className='w-full h-full lg:h-72 object-cover mb-4 lg:mb-0'
              />
            </div>
            <div className='lg:w-1/2 p-8'>
              <h2 className='text-3xl font-semibold text-blue-700 mb-4 flex items-center'>
                <AppIcons.HeartIcon addClassNames='mr-2' /> Sứ Mệnh Của Chúng Tôi
              </h2>
              <p>
                Sứ mệnh của chúng tôi là cung cấp các giải pháp chăm sóc sức khỏe chất lượng cao, dễ tiếp cận và giá cả
                phải chăng cho cộng đồng. Chúng tôi cam kết nâng cao sức khỏe và phúc lợi của khách hàng thông qua các
                dịch vụ dược phẩm và y tế đa dạng. Không chỉ là một nhà thuốc, chúng tôi còn là người bạn đồng hành trong
                hành trình chăm sóc sức khỏe, luôn sẵn sàng tư vấn và hỗ trợ tận tình cho mọi khách hàng.
              </p>
              {showMore && (
                <p className='mt-4'>
                  Để hiện thực hóa sứ mệnh này, nhà thuốc của chúng tôi không ngừng phát triển, nâng cấp các dịch vụ và
                  cập nhật những phương pháp điều trị tiên tiến nhất. Chúng tôi luôn đặt khách hàng làm trung tâm của mọi
                  hoạt động và cam kết cung cấp dịch vụ chăm sóc sức khỏe tốt nhất.
                </p>
              )}
              <button onClick={toggleShowMore} className='mt-4 text-blue-600 hover:underline'>
                {showMore ? 'Xem Ít Hơn' : 'Xem Thêm'}
              </button>
            </div>
          </section>

          <section className='mb-12 flex flex-col items-center shadow-md rounded-lg bg-white overflow-hidden lg:flex-row-reverse'>
            <div className='lg:w-1/2 w-full pr-5'>
              <img
                src='https://www.vinaprint.vn/wp-content/uploads/2023/01/poster-quang-cao-thuoc-3.jpg'
                alt='Dịch Vụ'
                className='w-full h-full lg:h-72 object-cover '
              />
            </div>
            <div className='lg:w-1/2 p-8'>
              <h2 className='text-3xl font-semibold text-blue-700 mb-4 flex items-center'>
                <AppIcons.CategoryIcon addClassNames='mr-2' /> Dịch Vụ Của Chúng Tôi
              </h2>
              <ul className='list-disc list-inside space-y-2'>
                <li>Thuốc kê đơn và không kê đơn</li>
                <li>Tư vấn sức khỏe miễn phí với chuyên gia</li>
                <li>Tiêm chủng và cung cấp các loại vắc-xin</li>
                <li>Cho thuê thiết bị y tế chất lượng cao</li>
                <li>Giao thuốc tận nơi nhanh chóng, tiện lợi</li>
              </ul>
              <p className='mt-4'>
                Chúng tôi tự hào là nơi cung cấp đầy đủ các loại thuốc và thiết bị y tế cần thiết. Với dịch vụ giao thuốc
                tận nơi, bạn có thể yên tâm rằng dù ở đâu, chúng tôi cũng luôn ở bên bạn để chăm sóc sức khỏe.
              </p>
            </div>
          </section>

          <section className='mb-12 flex flex-col lg:flex-row items-center shadow-md rounded-lg bg-white overflow-hidden'>
            <div className='lg:w-1/2 w-full pl-5'>
              <img
                src='https://giathuoctot.com.vn/upload/images/logo-banner-slider/BANNER-2-scaled.jpg'
                alt='Lịch Sử'
                className='w-full h-full lg:h-72 object-cover mb-4 lg:mb-0'
              />
            </div>
            <div className='lg:w-1/2 p-8'>
              <h2 className='text-3xl font-semibold text-blue-700 mb-4 flex items-center'>
                <AppIcons.HistoryIcon addClassNames='mr-2' /> Lịch Sử Của Chúng Tôi
              </h2>
              <p>
                Được thành lập vào năm 2020, nhà thuốc của chúng tôi đã trải qua nhiều năm phục vụ cộng đồng, giúp đỡ hàng
                nghìn khách hàng. Từ một nhà thuốc nhỏ, chúng tôi không ngừng mở rộng và phát triển với mục tiêu trở thành
                chuỗi nhà thuốc uy tín, đáng tin cậy.
              </p>
              <p className='mt-4'>
                Trong suốt thời gian qua, chúng tôi không ngừng cải tiến dịch vụ, nâng cao chất lượng và cập nhật các công
                nghệ y tế mới nhất để đảm bảo phục vụ khách hàng một cách tốt nhất. Đội ngũ của chúng tôi luôn coi trọng
                sự hài lòng của khách hàng và đặt mục tiêu xây dựng mối quan hệ tin cậy và bền vững.
              </p>
            </div>
          </section>

          <section className='mb-12 text-center shadow-md rounded-lg bg-white overflow-hidden'>
            <div className='p-8'>
              <h2 className='text-3xl font-semibold text-blue-700 mb-4 flex justify-center items-center'>
                <AppIcons.UserGroup addClassNames='mr-2' /> Đội Ngũ Chuyên Gia
              </h2>
              <p className='mb-6'>
                Chúng tôi tự hào sở hữu một đội ngũ chuyên gia y tế giàu kinh nghiệm, tận tâm và nhiệt huyết. Các dược sĩ,
                bác sĩ và nhân viên chăm sóc khách hàng của chúng tôi đều được đào tạo bài bản, luôn sẵn sàng tư vấn và hỗ
                trợ bạn mọi lúc, mọi nơi.
              </p>
              <p>
                Chúng tôi tin rằng nhân sự là tài sản quý giá nhất của công ty. Mỗi thành viên của đội ngũ đều có niềm đam
                mê với lĩnh vực y tế và luôn nỗ lực không ngừng để mang lại sự hài lòng tuyệt đối cho khách hàng.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
