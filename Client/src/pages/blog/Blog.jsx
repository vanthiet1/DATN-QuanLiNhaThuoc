import { Link } from 'react-router-dom';
import AppIcons from '../../components/ui/icon/index';
import useFetch from '../../hooks/useFetch';
import blogServices from '../../services/blogService';
import formatsHelper from '../../utils/helpers/formats';
import { SpinnerLoading } from '../../components/ui/loaders';

const Blog = () => {
  const { isLoading, responsData: BlogDatas } = useFetch(blogServices.getAllBlogs);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <SpinnerLoading />
      </div>
    );
  }

  return (
    <div className='max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8'>
      <div className='flex flex-wrap gap-2 pb-6 items-center'>
        <Link to='/' className='flex items-center text-gray-600 hover:text-gray-800'>
          <AppIcons.HomeIcon addClassNames='mr-2' />
          Trang chủ
        </Link>
        <AppIcons.ArrowRight />
        <h1 className='text-gray-600'>Góc sống khoẻ</h1>
        <AppIcons.ArrowRight />
        <h1 className='text-gray-600'>Bài viết</h1>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='space-y-6 flex-1'>
          {BlogDatas &&
            BlogDatas.map((blog) => (
              <Link to={`${blog._id}`}>
                <div
                  key={blog.id}
                  className='flex flex-col lg:h-[200px] md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
                >
                  <div className='w-full md:w-80  flex-shrink-0'>
                    <img src={blog.image} alt={blog.title} className='w-full h-full object-cover' />
                  </div>

                  <div className='p-4 flex flex-col justify-between flex-1'>
                    <h2 className='text-lg md:text-xl font-bold text-gray-800 hover:text-blue-600'>{blog.title}</h2>
                    <div className='text-sm md:text-base text-gray-500 mt-2'>
                      <span>{formatsHelper.formatDate(blog.updatedAt)} - </span>
                      <span className='text-green-600'>{blog.user_id.fullname}</span>
                    </div>
                    <p className='text-gray-600 mt-3 line-clamp-3 text-sm md:text-base'>{blog.description}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className='w-full md:w-[30%] space-y-6'>
          <div className='w-full border border-gray-200 rounded-lg overflow-hidden'>
            <img
              src='https://www.medigoapp.com/assets/images-html/sub-banner.jpg'
              alt='Banner'
              className='w-full h-auto object-cover'
            />
            <div className='flex flex-col md:flex-row justify-between items-center p-4'>
              <div className='text-center md:text-left mb-4 md:mb-0'>
                <span className='block text-gray-600'>Bạn cần tư vấn</span>
                <span className='block text-blue-600 font-bold text-xl'>Với chúng tôi</span>
              </div>
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>ĐẶT TƯ VẤN</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
